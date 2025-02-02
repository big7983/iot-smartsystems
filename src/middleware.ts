import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const { pathname } = req.nextUrl;

  console.log("Requested Path:", pathname); // Debugging


  if (pathname.startsWith("/CE_logo_black_no.png") || pathname.startsWith("/google_logo.png") || pathname.startsWith("/Microsoft_icon.png")) {
    return NextResponse.next(); 
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};