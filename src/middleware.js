import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/admin", "/game","/leader"];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("token:", token);
  console.log("pathname:",pathname);
  // Check if pathname starts with any protected path
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Optional: If logged in and accessing /auth, redirect to homepage
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isProtected) {
    return NextResponse.next(); // Let non-protected routes through
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  
  // Optional: Restrict by role (only allow admins for /admin routes)
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }


  // Everything OK, proceed to requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/game/:path*","/leader/:path*","/auth/:path*"], 
};
