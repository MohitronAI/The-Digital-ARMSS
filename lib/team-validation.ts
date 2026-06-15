import { z } from 'zod'
import { ALL_PERMISSION_NAMES } from '@/lib/permission-definitions'

export const createTeamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  password: z.string().min(8),
  permissions: z.record(z.boolean())
})

export const updateTeamMemberSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  status: z.enum(['ACTIVE', 'DISABLED']).optional(),
  permissions: z.record(z.boolean()).optional()
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8).optional()
})

export const disableTeamMemberSchema = z.object({
  confirm: z.boolean().refine((value) => value === true)
})

export function validatePermissions(permissions: Record<string, boolean>) {
  return Object.keys(permissions).every((permission) => ALL_PERMISSION_NAMES.includes(permission as never))
}