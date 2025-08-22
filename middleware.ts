import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // CASE 1: belum login → larikan ke /login
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // CASE 2: sudah login tapi buka /login → larikan ke /dashboard
  if (pathname === "/login" && token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      });

      if (res.ok) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (e) {
      // kalau token invalid → tetap biarkan ke /login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
