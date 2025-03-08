import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './utils/helpers'
 

export async function middleware(request: NextRequest) {
    const url = request.url;

    console.log("isAuth? ->", await isAuthenticated(request));


    return NextResponse.next()
}
 

export const config = {
	matcher: [

	'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
}