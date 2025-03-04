import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, isAuthenticated } from './lib/utils'
 

export async function middleware(request: NextRequest) {
    console.log("isAuth? ->", await isAuthenticated(request))


    

    return NextResponse.next()
}
 

export const config = {
  matcher: [
    
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}