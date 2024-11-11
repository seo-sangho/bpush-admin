// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export function middleware(request: NextRequest) {
  // console.log(`-> middleware`);
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // if (request.method === 'OPTIONS') {
  //   return new Response(null, { status: 200, headers: {} });
  // }

  return response;
}

export default auth((req) => {
  // console.log(`-> middleware -> auth`);

  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }
});

// export const config = { matcher: ['/dashboard/:path*'] };
export const config = { matcher: ['/:path*'] };
