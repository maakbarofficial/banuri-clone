import { NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.cookies.get("auth")?.value;
  const url = req.nextUrl.clone();

  if (
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/dashboard")) &&
    auth !== "true"
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};