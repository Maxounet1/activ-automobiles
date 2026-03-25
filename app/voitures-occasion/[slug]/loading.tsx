export default function VehicleDetailLoading() {
  return (
    <div className="min-h-screen bg-brand-canvas">
      <div className="bg-brand-dark pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-64 rounded-lg bg-brand-border animate-pulse" />
              <div className="h-5 w-40 rounded bg-brand-border animate-pulse" />
            </div>
            <div className="rounded-2xl bg-brand-surface animate-pulse" style={{ aspectRatio: '16/9' }} />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-brand-surface animate-pulse" style={{ aspectRatio: '4/3' }} />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[360px] space-y-4">
            <div className="rounded-2xl bg-white border border-brand-border p-6 space-y-4">
              <div className="h-8 w-32 rounded bg-brand-border animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-brand-border animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-brand-border animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
