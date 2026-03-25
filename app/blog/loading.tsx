export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="bg-gray-100 border-b border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
          <div className="h-12 w-72 bg-gray-200 rounded-xl mx-auto" />
          <div className="h-5 w-96 bg-gray-100 rounded mx-auto" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-5 w-4/5 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
