import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/utilities/admin-auth";

export async function middleware(req: NextRequest) {
  const isApi = req.nextUrl.pathname.startsWith("/api/themes");

  // Only writes to the themes API are protected; reads (GET) stay public so
  // the app can render the theme list.
  if (isApi && req.method !== "POST") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifyToken(token)) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/themes/login";
  url.search = `?from=${encodeURIComponent(req.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/themes/new", "/themes/new/:path*", "/api/themes"],
};
