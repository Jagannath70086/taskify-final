import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/dashboard', '/profile', '/activities'];
const publicAuthPages = ['/', '/login', '/register', '/forgot-password'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isAuth = !!token;

  if (!isAuth && protectedRoutes.some(route => pathname.startsWith(route))) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (isAuth && publicAuthPages.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',              
    '/login',
    '/register',
    '/forgot-password',
    '/dashboard',
    '/profile',
    '/activities',
  ],
};
