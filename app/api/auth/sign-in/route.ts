import connectDb from "@/lib/database";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { email, password, context } = await req.json();

    if (!email || !password || !context) {
      return NextResponse.json(
        { message: "Please fill all the required details!", success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    if (context === "user" && user.role === "admin") {
      return NextResponse.json(
        { message: "Admins must sign in through the admin portal" },
        { status: 403 }
      );
    }

    if (context === "admin" && user.role !== "admin") {
      return NextResponse.json(
        { message: "This is an admin login only" },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
