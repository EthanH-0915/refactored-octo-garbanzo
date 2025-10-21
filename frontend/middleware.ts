// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

console.log("[middleware] module loaded"); // <- shows file was imported by the Next server

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // assumes JWT is in cookies
  const url = req.nextUrl.clone();
  console.log("[middleware] checking auth for:", url.pathname, "token:", !!token);

  // Protect these routes
  const protectedRoutes = ["/dashboard", "/files"];

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    console.log("Checking auth for protected route:", url.pathname);
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply to certain routes
export const config = {
  matcher: ["/dashboard/:path*", "/files/:path*", "/login", "/signup"],
};

