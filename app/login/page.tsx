import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

function getSafeCallbackUrl(value: string | string[] | undefined) {
  const callbackUrl = Array.isArray(value) ? value[0] : value
  if (!callbackUrl || !callbackUrl.startsWith('/')) {
    return '/admin'
  }

  return callbackUrl
}

export default async function LoginPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const callbackUrl = getSafeCallbackUrl(searchParams.callbackUrl)

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(213,165,111,0.16),_transparent_38%),linear-gradient(180deg,#fffdf9_0%,#f8f3eb_52%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">The Digital ARMSS</p>
          <h2 className="font-display text-5xl font-bold tracking-[-0.04em] text-brand-navy sm:text-6xl">Private admin access built for production use.</h2>
          <p className="max-w-xl text-base leading-8 text-brand-ink/70">Only authenticated admin users can reach the dashboard, inspect leads, or modify records. Sessions are signed and protected with NextAuth credentials auth.</p>
          <div className="rounded-3xl border border-brand-navy/10 bg-white/80 p-5 shadow-[0_16px_60px_rgba(0,31,63,0.08)] backdrop-blur">
            <p className="text-sm font-semibold text-brand-navy">Access policy</p>
            <p className="mt-2 text-sm leading-7 text-brand-ink/65">Admin users sign in at this page, then move into the protected dashboard. Unauthorized requests are redirected or rejected at the middleware layer.</p>
          </div>
        </div>

        <AdminLoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  )
}