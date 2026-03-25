export default function AgenceVilleLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-[480px] bg-gray-300" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
              <div className="h-4 w-4/6 bg-gray-100 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl border border-gray-200" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-2xl border border-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
