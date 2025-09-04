import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // JWT cookie from backend
  const url = req.nextUrl;

  // Protect all /dashboard routes
  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply only on dashboard paths
export const config = {
  matcher: ["/dashboard/:path*"],
};
