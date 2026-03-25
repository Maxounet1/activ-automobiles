export default function VoituresOccasionLoading() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="pt-32 pb-10 text-center">
        <div className="h-10 w-72 mx-auto rounded-lg bg-brand-border animate-pulse mb-3" />
        <div className="h-5 w-96 mx-auto rounded-lg bg-brand-border animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-brand-border">
              <div className="aspect-[16/10] bg-brand-surface animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-brand-border animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-brand-border animate-pulse" />
                <div className="h-6 w-1/3 rounded bg-brand-border animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
