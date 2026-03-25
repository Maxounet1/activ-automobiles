export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-[500px] bg-gray-200" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="h-4 w-24 bg-gray-200 rounded-full" />
        <div className="h-10 w-full bg-gray-200 rounded-lg" />
        <div className="h-10 w-4/5 bg-gray-200 rounded-lg" />
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="space-y-1">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="space-y-4 pt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`h-4 ${i % 5 === 4 ? 'w-3/4' : 'w-full'} bg-gray-100 rounded`} />
          ))}
        </div>
        <div className="h-64 bg-gray-100 rounded-2xl" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'} bg-gray-100 rounded`} />
          ))}
        </div>
      </div>
    </div>
  );
}
