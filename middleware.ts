// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/helpers/verifyToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const decoded = verifyJwt(token);

  if (!decoded?.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
