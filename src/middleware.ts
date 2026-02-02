import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // We can't fully decrypt iron-session in middleware easily without heavier setup in Edge,
    // so we'll do a basic check or handle it in the layout.
    // However, for better UX, we'll try to check the cookie existence first.

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        const sessionCookie = request.cookies.get(sessionOptions.cookieName)

        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: '/admin/:path*',
}
