// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/files"];

// Asks the backend to verify the JWT (signature + expiry), rather than
// trusting that a "token" cookie merely being present means it's valid.
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("token")?.value;
  if (!token) return false;

  try {
    // INTERNAL_API_URL lets this server-to-server call reach the backend
    // container directly (e.g. http://backend:3001 under docker-compose),
    // where NEXT_PUBLIC_API_URL's "localhost" would resolve to this
    // container instead.
    const apiUrl = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: { cookie: `token=${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (PROTECTED_ROUTES.some((route) => url.pathname.startsWith(route))) {
    if (!(await isAuthenticated(req))) {
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

