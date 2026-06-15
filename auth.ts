import NextAuth, { getServerSession, type NextAuthOptions, type Session, type User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'
import { ALL_PERMISSION_NAMES } from '@/lib/permission-definitions'
import { getTeamMemberPermissions } from '@/lib/permission-checker'

const SUPER_ADMIN_ROLE = 'SUPER_ADMIN' as const
const TEAM_MEMBER_ROLE = 'TEAM_MEMBER' as const
const ADMIN_TYPE = 'ADMIN' as const
const TEAM_TYPE = 'TEAM_MEMBER' as const

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) {
          return null
        }

        const admin = await db.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } })
        if (admin) {
          const isPasswordValid = await compare(parsed.data.password, admin.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: admin.email,
            email: admin.email,
            name: admin.name,
            role: SUPER_ADMIN_ROLE,
            type: ADMIN_TYPE,
            permissions: [...ALL_PERMISSION_NAMES]
          }
        }

        const teamMember = await db.teamMember.findUnique({ where: { email: parsed.data.email.toLowerCase() } })
        if (!teamMember || teamMember.status !== 'ACTIVE') {
          return null
        }

        const isPasswordValid = await compare(parsed.data.password, teamMember.password)
        if (!isPasswordValid) {
          return null
        }

        const permissions = await getTeamMemberPermissions(teamMember.id)

        return {
          id: String(teamMember.id),
          email: teamMember.email,
          name: teamMember.name,
          role: TEAM_MEMBER_ROLE,
          type: TEAM_TYPE,
          permissions
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | undefined }) {
      if (user) {
        token.userId = user.id
        token.role = user.role
        token.type = user.type
        token.name = user.name
        token.email = user.email
        token.permissions = user.permissions
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        const userId = typeof token.userId === 'string' ? token.userId : typeof token.sub === 'string' ? token.sub : ''
        const email = typeof token.email === 'string' ? token.email : session.user.email ?? ''
        const name = typeof token.name === 'string' ? token.name : session.user.name ?? ''
        const role = token.role === 'TEAM_MEMBER' ? 'TEAM_MEMBER' : 'SUPER_ADMIN'
        const type = token.type === 'TEAM_MEMBER' ? 'TEAM_MEMBER' : 'ADMIN'
        const permissions = Array.isArray(token.permissions) ? token.permissions.filter((permission): permission is string => typeof permission === 'string') : []

        session.user.id = userId
        session.user.email = email
        session.user.name = name
        session.user.role = role
        session.user.type = type
        session.user.permissions = permissions
      }

      return session
    }
  }
} satisfies NextAuthOptions

export const authHandler = NextAuth(authConfig)

export async function auth() {
  return await getServerSession(authConfig)
}

export function hasAdminAccess(role?: string | null) {
  return role === SUPER_ADMIN_ROLE || role === TEAM_MEMBER_ROLE
}