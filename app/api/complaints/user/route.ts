import ComplaintNotificationEmail from "@/app/components/email-template";
import connectDb from "@/lib/database";
import { verifyTokenFromCookies } from "@/helpers/verifyToken";
import { Complaints } from "@/models/complaints";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const cookieStore = await cookies();
    const decoded = verifyTokenFromCookies(cookieStore);
    if (!decoded) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const {
      title,
      description,
      category,
      priority,
      status
    } = await req.json();
    console.log("Incoming complaint:", title, description, category, priority, status);


    if (!title || !description || !category || !priority || !status) {
      return NextResponse.json(
        {
          message: "Please fill all the required details!",
          success: false,
        },
        { status: 400 }
      );
    }

    const complaint = await Complaints.create({
      title,
      description,
      category,
      priority,
      status,
      userId: decoded.userId,
      userEmail: decoded.email,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get user email from decoded token
    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json(
        {
          message: "Invalid email",
          success: false,
        },
        { status: 400 }
      );
    }

    // Fetch admin emails from database
    // const admins = await User.find({ role: "admin" }).select("email");
    // if (!admins.length) {
    //   return NextResponse.json(
    //     {
    //       message: "Admin not found",
    //       success: false,
    //     },
    //     { status: 404 }
    //   );
    // }

    // // Extract admin emails
    // const adminEmails = admins.map((admin) => admin.email);
    // i will add admin emails directly from database but i dont how domain right now so im goona use my verified email.

    // Send email to admins
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhishekndxw@gmail.com", // as we dont verify our domain to send emails we are using own verified email
      subject: `🚨 New ${priority} Priority Complaint: ${title}`,
      react: ComplaintNotificationEmail({
        title,
        description,
        category,
        priority,
        status,
        userEmail,
        mode: "updated",
      }),
    });

    if (error) {
      console.error("Email sending error:", error);
    }

    return NextResponse.json({
      message: "Complaint submitted successfully",
      success: true,
      data: {
        complaintId: complaint._id,
        emailSent: !error,
        emailId: data?.id || null,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}

// ADDITIONAL: for user emails
// export async function sendUserNotification(
//   userEmail: string,
//   complaintData: any
// ) {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const { data, error } = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: [userEmail],
//     subject: `Complaint Received: ${complaintData.title}`,
//     react: usertemplate
//   });

//   return { data, error };
// }
