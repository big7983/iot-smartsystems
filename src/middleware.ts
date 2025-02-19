import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const login = req.cookies.get("Login")?.value || "";
  const { pathname } = req.nextUrl;

  console.log("Requested Path:", pathname); // Debugging
  console.log("token : ", login); // Debugging

  if (pathname.startsWith("/CE_logo_black_no.png") || pathname.startsWith("/google_logo.png") || pathname.startsWith("/Microsoft_icon.png")) {
    return NextResponse.next(); 
  }

  // if (!login && pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (login && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};