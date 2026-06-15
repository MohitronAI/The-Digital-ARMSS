export default function LoginLoading() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(213,165,111,0.16),_transparent_38%),linear-gradient(180deg,#fffdf9_0%,#f8f3eb_52%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 animate-pulse">
          <div className="h-4 w-40 rounded-full bg-brand-navy/10" />
          <div className="h-16 w-full rounded-2xl bg-brand-navy/10" />
          <div className="h-6 w-5/6 rounded-2xl bg-brand-navy/10" />
          <div className="rounded-3xl border border-brand-navy/10 bg-white/80 p-5 shadow-[0_16px_60px_rgba(0,31,63,0.08)] backdrop-blur">
            <div className="h-4 w-28 rounded-full bg-brand-navy/10" />
            <div className="mt-3 h-10 w-full rounded-2xl bg-brand-navy/10" />
          </div>
        </div>

        <div className="h-[34rem] rounded-[28px] border border-brand-navy/10 bg-white/80 shadow-[0_20px_80px_rgba(0,31,63,0.12)] animate-pulse" />
      </div>
    </div>
  )
}