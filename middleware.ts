import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Routes that require authentication (maps to backend private routes)
const privateRoutes = [
  '/users/me/profile',
  '/profile', // Maps to backend: GET /users/me/profile
];

// Auth routes that authenticated users shouldn't access
const publicAuthRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const isPublicAuthRoute = publicAuthRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if route is private
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If no access token
  if (!accessToken) {
    // Allow access to public auth routes (login/register)
    if (isPublicAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to login for private routes
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Allow access to all other routes (public content)
    return NextResponse.next();
  }

  // If access token exists (user is authenticated)
  // Redirect authenticated users away from auth pages
  if (isPublicAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow access to private routes
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Profile routes (maps to backend /users/me/profile)
    '/users/me/profile',
    '/profile/:path*',
    // Auth routes
    '/auth/login',
    '/auth/register',
  ],
};
