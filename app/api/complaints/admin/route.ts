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
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const complaints = await Complaints.find({});
    return NextResponse.json({
      message: "Complaints fetched successfully",
      success: false,
      complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints: ", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const { complaintId, status } = await req.json();

    if (!complaintId || !status) {
      return NextResponse.json(
        { message: "Complaint ID and status are required", success: false },
        { status: 400 }
      );
    }

    const complaint = await Complaints.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!complaint) {
      return NextResponse.json(
        { message: "Complaint not found", success: false },
        { status: 404 }
      );
    }

    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found", success: false },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhishekndxw@gmail.com", // ✅ Send to the user, not admin but we dont have power to send emails to everyone for now we can send to admin
      subject: `🔔 Complaint Update: ${complaint.title}`,
      react: ComplaintNotificationEmail({
        mode: "updated",
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        priority: complaint.priority,
        status: complaint.status,
        userEmail: userEmail,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
    }

    return NextResponse.json({
      message: "Complaint updated and email sent",
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
