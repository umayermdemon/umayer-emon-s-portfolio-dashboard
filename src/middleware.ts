import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

const authRoutes = ["/login"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3001/login?redirectPath=${pathname}`,
          request.url
        )
        // new URL(
        //   `https://umayer-emon-s-portfolio-dashboard-nextjs.vercel.app/login?redirectPath=${pathname}`,
        //   request.url
        // )
      );
    }
  }
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
};
export const config = {
  matcher: [
    "/login",
    "/",
    "/projects/:path*",
    "/blogs/:path*",
    "/skills/:path*",
  ],
};
