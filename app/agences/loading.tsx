export default function AgencesLoading() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      <div className="bg-gray-50 border-b border-gray-200 h-11" />
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-14 w-full bg-gray-200 rounded-xl" />
              <div className="h-14 w-3/4 bg-gray-200 rounded-xl" />
              <div className="h-5 w-full bg-gray-100 rounded" />
              <div className="h-5 w-5/6 bg-gray-100 rounded" />
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl border border-gray-200" />
                ))}
              </div>
              <div className="flex gap-3">
                <div className="h-12 w-48 bg-gray-200 rounded-xl" />
                <div className="h-12 w-36 bg-gray-100 rounded-xl border border-gray-200" />
              </div>
            </div>
            <div className="hidden lg:block h-80 bg-gray-200 rounded-3xl" />
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white py-8 px-6 text-center">
                <div className="h-10 w-16 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded mx-auto mb-1" />
                <div className="h-3 w-20 bg-gray-100 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-80 bg-gray-100 rounded-2xl" />
        </div>
      </section>

      <section className="py-24" style={{ background: '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
            <div className="h-10 w-80 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
