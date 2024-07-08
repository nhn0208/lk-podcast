import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/','/discover','/podcast/(.*)','/profile/(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) return NextResponse.redirect(new URL('/sign-in', req.url))
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};