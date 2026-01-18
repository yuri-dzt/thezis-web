import { NextRequest, NextResponse } from 'next/server'

import { getTokenInCookies } from './lib/get-token-in-cookies'

const PUBLIC_ROUTES = ['/login']
const PRIVATE_ROUTES = ['/users', '/account']
const PROHIBITED_ROUTES = ['/']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getTokenInCookies()

  if (PROHIBITED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      new URL(token ? '/users' : '/login', req.url),
    )
  }

  if (!token) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  }

  if (token) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/users', req.url))
    }

    if (PRIVATE_ROUTES.includes(pathname)) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/users', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}