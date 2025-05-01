import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/helpers";
import { NextURL } from "next/dist/server/web/next-url";
import { log } from "./lib/logger";

export async function middleware(request: NextRequest) {
  //await log(request);
  const url = request.url;

  const url2 = request.nextUrl.clone();
  const isAuth = await isAuthenticated(request);
  console.log("-------------------------");
  console.log("Request Url:", url);
  console.log("isAuth:", isAuth);
  console.log("-------------------------");

  const redirectResponse = (url: string | NextURL) => {
    const response = NextResponse.redirect(url);
    return response;
  };

  if (url.includes("/signin") && isAuth) {
    console.log("User is already logged in!");
    url2.pathname = "/dash";
    return redirectResponse(url2);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
