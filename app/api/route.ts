import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: {
      healthCheck: "Working fine, Please make sure you are logged in.",
    },
  });
}
