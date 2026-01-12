// import { NextRequest, NextResponse } from 'next/server'
// import { getTokenInCookies } from './lib/get-token-in-cookies'

// const PUBLIC_ROUTES = ['/login']
// const PRIVATE_ROUTES = ['/users', '/account']
// const PROHIBITED_ROUTES = ['/']

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   const token = await getTokenInCookies()

//   // 🚫 Rotas proibidas (sempre)
//   if (PROHIBITED_ROUTES.includes(pathname)) {
//     return NextResponse.redirect(
//       new URL(token ? '/users' : '/login', req.url),
//     )
//   }

//   // 🔓 Usuário NÃO autenticado
//   if (!token) {
//     if (!PUBLIC_ROUTES.includes(pathname)) {
//       return NextResponse.redirect(new URL('/login', req.url))
//     }

//     return NextResponse.next()
//   }

//   // 🔐 Usuário autenticado
//   if (token) {
//     if (!PRIVATE_ROUTES.includes(pathname)) {
//       return NextResponse.redirect(new URL('/users', req.url))
//     }

//     return NextResponse.next()
//   }

//   return NextResponse.next()
// }


// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }

import { NextRequest, NextResponse } from 'next/server'
import { getTokenInCookies } from './lib/get-token-in-cookies'

const PUBLIC_ROUTES = ['/login']
const PRIVATE_ROUTES = ['/users', '/account']
const PROHIBITED_ROUTES = ['/']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getTokenInCookies()

  // 🚫 Rotas proibidas (sempre)
  if (PROHIBITED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      new URL(token ? '/users' : '/login', req.url),
    )
  }

  // 🔓 Usuário NÃO autenticado
  if (!token) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  }

  // 🔐 Usuário autenticado - valida o token
  if (token) {
    // Se está tentando acessar rota pública, redireciona para privada
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/users', req.url))
    }

    // Valida o token fazendo uma chamada para a API
    const isTokenValid = await validateToken(token)

    if (!isTokenValid) {
      // Token inválido ou expirado - limpa cookies e redireciona para login
      const response = NextResponse.redirect(new URL('/login', req.url))

      // Remove os cookies
      response.cookies.delete('access_token')
      response.cookies.delete('refresh_token')

      return response
    }

    // Token válido - permite acesso
    if (PRIVATE_ROUTES.includes(pathname)) {
      return NextResponse.next()
    }

    // Se não está em nenhuma rota privada definida, redireciona para /users
    return NextResponse.redirect(new URL('/users', req.url))
  }

  return NextResponse.next()
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:4000'

    const response = await fetch(`${baseUrl}/users/refresh`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (response.status === 401) {
      return false
    }

    if (response.ok) {
      return true
    }

    return true
  } catch (error) {
    console.error('Erro ao validar token:', error)
    return true
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}