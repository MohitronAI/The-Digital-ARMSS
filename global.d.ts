import type { DefaultSession } from 'next-auth'

export type AdminSessionRole = 'SUPER_ADMIN' | 'TEAM_MEMBER'
export type AdminSessionType = 'ADMIN' | 'TEAM_MEMBER'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			email: string
			name: string
			role: AdminSessionRole
			type: AdminSessionType
			permissions: string[]
		} & DefaultSession['user']
	}

	interface User {
		role: AdminSessionRole
		type: AdminSessionType
		permissions: string[]
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userId?: string
		role?: AdminSessionRole
		type?: AdminSessionType
		permissions?: string[]
	}
}

declare module '*.css'