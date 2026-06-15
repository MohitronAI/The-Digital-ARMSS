export default function Loading() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-8 w-40 rounded-full bg-brand-navy/10" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl bg-white p-8 shadow-card">
            <div className="h-4 w-32 rounded-full bg-brand-navy/10" />
            <div className="h-16 w-4/5 rounded-2xl bg-brand-navy/10" />
            <div className="h-6 w-full rounded-2xl bg-brand-navy/10" />
            <div className="h-6 w-3/4 rounded-2xl bg-brand-navy/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-40 rounded-3xl bg-white shadow-card" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 rounded-3xl bg-white shadow-card" />
          ))}
        </div>
      </div>
    </div>
  )
}