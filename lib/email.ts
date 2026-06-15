import { logger } from '@/lib/logger'

type LeadNotificationData = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  serviceInterested: string
  message: string
  budget?: string | null
  source?: string | null
  id?: number
}

type QuoteData = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  services: string[]
  projectDescription: string
  timeline: string
  budget?: string | null
  leadId?: number
}

function ensureResendConfigured() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  return apiKey
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? 'The Digital ARMSS <noreply@thedigitalarmss.com>'
}

function getAdminAddress() {
  return process.env.ADMIN_EMAIL ?? getFromAddress()
}

function getAdminUrl() {
  return process.env.ADMIN_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000/admin'
}

async function sendEmail(message: { to: string | string[]; from?: string; subject: string; html: string; text: string }) {
  const apiKey = ensureResendConfigured()
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: message.from ?? getFromAddress(),
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Resend request failed: ${response.status} ${errorText}`)
    }

    logger.info('email.sent', { to: message.to, subject: message.subject })
  } catch (error) {
    logger.error('email.failed', { to: message.to, subject: message.subject, error: error instanceof Error ? error.message : error })
    throw error
  }
}

function shell(title: string, body: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#f7f7f5;padding:32px;color:#1f2937">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px;border:1px solid #ece7df">
        <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#D4A574;font-weight:700">The Digital ARMSS</div>
        <h1 style="margin:16px 0 20px;font-size:28px;line-height:1.1;color:#001F3F">${title}</h1>
        ${body}
      </div>
    </div>
  `
}

export async function sendLeadConfirmation(email: string, name: string, service: string) {
  return sendEmail({
    to: email,
    from: getFromAddress(),
    subject: 'Thanks for reaching out to The Digital ARMSS!',
    html: shell(
      `Thanks, ${name}`,
      `<p style="font-size:16px;line-height:1.7;color:#374151">We’ve received your enquiry about <strong>${service}</strong>.</p>
       <p style="font-size:16px;line-height:1.7;color:#374151">We’ll be in touch within 24 hours with the next best step.</p>
       <p style="margin-top:28px;color:#6b7280;font-size:14px">The Digital ARMSS · Pune, India</p>`
    ),
    text: `Thanks for reaching out, ${name}. We received your enquiry about ${service} and will reply within 24 hours.`
  })
}

export async function sendAdminNotification(leadData: LeadNotificationData) {
  return sendEmail({
    to: getAdminAddress(),
    from: getFromAddress(),
    subject: `🚀 New Lead: ${leadData.name} - ${leadData.serviceInterested}`,
    html: shell(
      'New lead alert',
      `
        <ul style="padding-left:18px;font-size:15px;line-height:1.8;color:#374151">
          <li><strong>Name:</strong> ${leadData.name}</li>
          <li><strong>Email:</strong> ${leadData.email}</li>
          <li><strong>Phone:</strong> ${leadData.phone ?? 'N/A'}</li>
          <li><strong>Company:</strong> ${leadData.company ?? 'N/A'}</li>
          <li><strong>Service:</strong> ${leadData.serviceInterested}</li>
          <li><strong>Budget:</strong> ${leadData.budget ?? 'N/A'}</li>
          <li><strong>Source:</strong> ${leadData.source ?? 'unknown'}</li>
        </ul>
        <p style="font-size:16px;line-height:1.7;color:#374151;background:#f9fafb;padding:16px;border-radius:14px">${leadData.message}</p>
        <p style="margin-top:24px"><a href="${getAdminUrl()}" style="background:#D4A574;color:#001F3F;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">Open Admin Dashboard</a></p>
      `
    ),
    text: `New lead: ${leadData.name} (${leadData.email}) for ${leadData.serviceInterested}. Message: ${leadData.message}`
  })
}

export async function sendQuoteConfirmation(email: string, services: string[]) {
  return sendEmail({
    to: email,
    from: getFromAddress(),
    subject: 'Your Quote Request Received - The Digital ARMSS',
    html: shell(
      'Quote request received',
      `<p style="font-size:16px;line-height:1.7;color:#374151">Thanks for requesting a quote. We’ve captured your selected services: <strong>${services.join(', ')}</strong>.</p>
       <p style="font-size:16px;line-height:1.7;color:#374151">We’ll prepare a custom quote from our team within 48 hours.</p>`
    ),
    text: `Thanks for requesting a quote. We will send your custom quote within 48 hours.`
  })
}

export async function sendQuoteToAdmin(quoteData: QuoteData) {
  return sendEmail({
    to: getAdminAddress(),
    from: getFromAddress(),
    subject: `📋 Quote Request: ${quoteData.company ?? quoteData.name} - ${quoteData.budget ?? 'No budget provided'}`,
    html: shell(
      'New quote request',
      `
        <ul style="padding-left:18px;font-size:15px;line-height:1.8;color:#374151">
          <li><strong>Name:</strong> ${quoteData.name}</li>
          <li><strong>Email:</strong> ${quoteData.email}</li>
          <li><strong>Phone:</strong> ${quoteData.phone ?? 'N/A'}</li>
          <li><strong>Company:</strong> ${quoteData.company ?? 'N/A'}</li>
          <li><strong>Services:</strong> ${quoteData.services.join(', ')}</li>
          <li><strong>Timeline:</strong> ${quoteData.timeline}</li>
          <li><strong>Budget:</strong> ${quoteData.budget ?? 'N/A'}</li>
        </ul>
        <p style="font-size:16px;line-height:1.7;color:#374151;background:#f9fafb;padding:16px;border-radius:14px">${quoteData.projectDescription}</p>
        <p style="margin-top:24px"><a href="${getAdminUrl()}" style="background:#D4A574;color:#001F3F;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">Open Admin Dashboard</a></p>
      `
    ),
    text: `Quote request from ${quoteData.name}: ${quoteData.services.join(', ')} - ${quoteData.projectDescription}`
  })
}

export async function sendQuoteFollowUp(email: string, name: string) {
  return sendEmail({
    to: email,
    from: getFromAddress(),
    subject: 'Quick follow-up from The Digital ARMSS',
    html: shell(
      `Following up, ${name}`,
      `<p style="font-size:16px;line-height:1.7;color:#374151">Just checking in on your quote request. If you have any additional details, reply directly and we’ll refine the estimate.</p>`
    ),
    text: `Following up on your quote request, ${name}. Reply with any extra details and we will refine the estimate.`
  })
}