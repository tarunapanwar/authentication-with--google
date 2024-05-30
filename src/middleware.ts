import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
    const path = request?.nextUrl?.pathname;
    const isPublicPath = path === '/login';
    const token = request.cookies.get('token')?.value || request.cookies.get('next-auth.session-token')?.value || '';

    if(isPublicPath && token)
        return NextResponse.redirect(new URL('/', request.nextUrl));

    if(!isPublicPath && !token)
        return NextResponse.redirect(new URL('/login', request.nextUrl));
}

export const config = {
    matcher: [
        '/',
        '/login',
    ]
}