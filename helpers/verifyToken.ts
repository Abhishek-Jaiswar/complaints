import jwt from "jsonwebtoken";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface TokenPayload {
  userId: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyJwt(token: string | undefined): TokenPayload | null {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && decoded !== null) {
      return decoded as TokenPayload;
    }
    return null;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}

export function verifyTokenFromCookies(
  cookieStore: ReadonlyRequestCookies
): TokenPayload | null {
  const token = cookieStore.get("token")?.value;
  return verifyJwt(token);
}
