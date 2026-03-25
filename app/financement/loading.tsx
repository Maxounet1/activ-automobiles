export default function FinancementLoading() {
  return (
    <div className="min-h-screen bg-brand-canvas pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 w-80 mx-auto rounded-lg bg-brand-border animate-pulse mb-4" />
          <div className="h-5 w-96 mx-auto rounded-lg bg-brand-border animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white border border-brand-border p-6">
              <div className="h-12 w-12 rounded-xl bg-brand-surface animate-pulse mb-4" />
              <div className="h-6 w-3/4 rounded bg-brand-border animate-pulse mb-3" />
              <div className="h-4 w-full rounded bg-brand-border animate-pulse mb-2" />
              <div className="h-4 w-2/3 rounded bg-brand-border animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
