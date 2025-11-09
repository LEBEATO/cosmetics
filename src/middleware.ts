import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  const protectedRoutes = ['/community', '/my-cosmetics', '/history']
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (isProtectedRoute && !isLoggedIn) {
    const url = req.url.replace(pathname, '/login')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/community/:path*', '/my-cosmetics/:path*', '/history/:path*'],
}