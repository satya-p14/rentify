// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define paths that require auth
// const protectedRoutes = ['/dashboard'];

// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;

//     const isProtected = protectedRoutes.some((route) =>
//         pathname.startsWith(route)
//     );

//     const isLoggedIn = request.cookies.get('token');

//     if (isProtected && !isLoggedIn) {
//         const loginUrl = new URL('/login', request.url);
//         return NextResponse.redirect(loginUrl);
//     }

//     return NextResponse.next();
// }


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const isAuthPage = request.nextUrl.pathname === '/login';

    // Redirect logged-in users away from login
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect unauthenticated users trying to access dashboard
    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/:path*'],
};
