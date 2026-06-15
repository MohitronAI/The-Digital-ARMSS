import { randomBytes } from 'crypto'
import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs'

const PASSWORD_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?'

export function generateSecurePassword(length = 12) {
  const bytes = randomBytes(length)
  return Array.from(bytes, (byte) => PASSWORD_CHARSET[byte % PASSWORD_CHARSET.length]).join('')
}

export function validatePassword(password: string) {
  const errors: string[] = []
  if (password.length < 8) errors.push('Password must be at least 8 characters.')
  if (!/[A-Z]/.test(password)) errors.push('Password must include at least one uppercase letter.')
  if (!/[a-z]/.test(password)) errors.push('Password must include at least one lowercase letter.')
  if (!/[0-9]/.test(password)) errors.push('Password must include at least one number.')
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password must include at least one special character.')
  return { valid: errors.length === 0, errors }
}

export async function hashPassword(password: string) {
  return bcryptHash(password, 10)
}

export async function comparePassword(password: string, hash: string) {
  return bcryptCompare(password, hash)
}