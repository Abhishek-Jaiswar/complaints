import { NextResponse } from "next/server";
import { verifyTokenFromCookies } from "@/helpers/verifyToken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const user = verifyTokenFromCookies(cookieStore);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: user.userId,
      email: user.email,
      role: user.role,
    },
  });
}
