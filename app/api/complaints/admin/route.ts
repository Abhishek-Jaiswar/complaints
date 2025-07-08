import ComplaintNotificationEmail from "@/app/components/email-template";
import connectDb from "@/lib/database";
import { verifyTokenFromCookies } from "@/helpers/verifyToken";
import { Complaints } from "@/models/complaints";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    await connectDb();

    const cookieStore = await cookies();
    const decoded = verifyTokenFromCookies(cookieStore);

    if (decoded?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const complaints = await Complaints.find({});
    return NextResponse.json({
      message: "Complaints fetched successfully",
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const cookieStore = await cookies();
    const decoded = verifyTokenFromCookies(cookieStore);

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const { complaintId, status, adminReplyTitle, adminReplyDescription } =
      await req.json();

    if (!complaintId) {
      return NextResponse.json(
        { message: "Complaint ID is required", success: false },
        { status: 400 }
      );
    }

    type UpdateFields = Partial<{
      status: string;
      title: string;
      adminReplyTitle: string;
      adminReplyDescription: string;
    }>;

    const updateFields: UpdateFields = {};
    if (status) updateFields.status = status;
    if (adminReplyTitle) updateFields.adminReplyTitle = adminReplyTitle;
    if (adminReplyDescription)
      updateFields.adminReplyDescription = adminReplyDescription;

    const updatedComplaint = await Complaints.findByIdAndUpdate(
      complaintId,
      updateFields,
      { new: true }
    );

    if (!updatedComplaint) {
      return NextResponse.json(
        { message: "Complaint not found", success: false },
        { status: 404 }
      );
    }
    const userEmail = decoded.email;

    // ✅ Send notification email (optional)
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhishekndxw@gmail.com",
      subject: `Complaint Updated: ${updatedComplaint.title}`,
      react: ComplaintNotificationEmail({
        mode: "updated",
        title: updatedComplaint.title,
        description: updatedComplaint.description,
        adminReplyTitle: updatedComplaint.adminReplyTitle ?? "",
        adminReplyDescription: updatedComplaint.adminReplyDescription ?? "",
        category: updatedComplaint.category,
        priority: updatedComplaint.priority,
        status: updatedComplaint.status!,
        userEmail,
      }),
    });

    return NextResponse.json({
      message: "Complaint updated successfully",
      success: true,
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
