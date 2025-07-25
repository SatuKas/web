import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cookie';
import { DASHBOARD_BOOKS_PATH_URL, LOGIN_PATH_URL, PUBLIC_AUTH_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Cookies from 'universal-cookie';

export async function middleware(request: NextRequest) {
  const cookies = new Cookies(request.headers.get('cookie'));
  const authToken = cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY);
  const isTokenExist = authToken || refreshToken;
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);

  // Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !isPublicAuthRoute && !isTokenExist) {
    return NextResponse.redirect(new URL(LOGIN_PATH_URL, request.nextUrl));
  }

  // Redirect to /dashboard if the user is authenticated
  if (isPublicAuthRoute && isTokenExist && !isPublicRoute) {
    return NextResponse.redirect(new URL(DASHBOARD_BOOKS_PATH_URL, request.nextUrl));
  }

  // Proceed with the request if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and api
    '/((?!_next/static|_next/image|favicon.ico|api|assets).*)',
  ],
};
