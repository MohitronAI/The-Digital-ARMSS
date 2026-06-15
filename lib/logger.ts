type LogLevel = 'info' | 'warn' | 'error'

function safePayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return payload
  }

  const cloned = JSON.parse(JSON.stringify(payload)) as Record<string, unknown>
  for (const key of ['password', 'token', 'apiKey', 'sendgridKey', 'SENDGRID_API_KEY', 'NEXTAUTH_SECRET']) {
    if (key in cloned) {
      cloned[key] = '[redacted]'
    }
  }

  return cloned
}

function writeLog(level: LogLevel, message: string, payload?: unknown) {
  const entry = {
    level,
    message,
    payload: safePayload(payload),
    timestamp: new Date().toISOString()
  }

  const serialized = JSON.stringify(entry)
  if (level === 'error') {
    console.error(serialized)
    return
  }

  if (level === 'warn') {
    console.warn(serialized)
    return
  }

  console.log(serialized)
}

export const logger = {
  info(message: string, payload?: unknown) {
    writeLog('info', message, payload)
  },
  warn(message: string, payload?: unknown) {
    writeLog('warn', message, payload)
  },
  error(message: string, payload?: unknown) {
    writeLog('error', message, payload)
  }
}