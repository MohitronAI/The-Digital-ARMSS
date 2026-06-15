import { NextRequest, NextResponse } from 'next/server'
import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import type { Session } from 'next-auth'
import { hasPermission } from '@/lib/permission-checker'
import { isSuperAdmin } from '@/lib/super-admin-check'

function middleware(request: NextRequestWithAuth) {
  const { pathname, search } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isAdminApiRoute = pathname.startsWith('/api/admin')
  const isLeadApiRoute = pathname.startsWith('/api/leads')
  const token = request.nextauth?.token

  const session = token
    ? ({
        user: {
          id: token.userId ?? '',
          email: typeof token.email === 'string' ? token.email : '',
          name: typeof token.name === 'string' ? token.name : '',
          role: token.role === 'TEAM_MEMBER' ? 'TEAM_MEMBER' : 'SUPER_ADMIN',
          type: token.type === 'TEAM_MEMBER' ? 'TEAM_MEMBER' : 'ADMIN',
          permissions: Array.isArray(token.permissions)
            ? token.permissions.filter((permission): permission is string => typeof permission === 'string')
            : []
        }
      } as Session)
    : null

  if (!session?.user) {
    if (isAdminRoute) {
      const loginUrl = new URL('/login', request.nextUrl.origin)
      loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`)
      return NextResponse.redirect(loginUrl)
    }

    if (isLeadApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.next()
  }

  if (pathname.startsWith('/admin/team') && !isSuperAdmin(session)) {
    return NextResponse.redirect(new URL('/admin/forbidden', request.nextUrl.origin))
  }

  if (pathname.startsWith('/admin/leads') && !hasPermission(session, 'LEADS_VIEW')) {
    return NextResponse.redirect(new URL('/admin/forbidden', request.nextUrl.origin))
  }

  if (isAdminApiRoute && !isSuperAdmin(session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (isLeadApiRoute && !hasPermission(session, 'LEADS_VIEW')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.next()
}

export default withAuth(middleware)

export const config = {
  matcher: ['/admin/:path*', '/api/leads/:path*', '/api/admin/:path*']
}