import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).set({
    name: "token",
    value: "",
    path: "/",
    maxAge: -1,
  });

  return NextResponse.json({ success: true });
}
