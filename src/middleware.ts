import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isOwnerRoute = request.nextUrl.pathname.startsWith('/owners');

    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAdminRoute && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isOwnerRoute && role !== 'owner') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
