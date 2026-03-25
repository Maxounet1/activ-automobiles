export default function CatalogSkeletonCard() {
  return (
    <div
      className="bg-white overflow-hidden animate-pulse"
      style={{ borderRadius: 16, border: '1px solid #e5e7eb' }}
    >
      <div className="bg-gray-100" style={{ aspectRatio: '16/9' }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-4 bg-gray-100 rounded-full w-12" />
          <div className="h-4 bg-gray-100 rounded-full w-16" />
          <div className="h-4 bg-gray-100 rounded-full w-14" />
        </div>
        <div className="pt-2">
          <div className="h-7 bg-gray-100 rounded-full w-28" />
          <div className="h-3 bg-gray-100 rounded-full w-36 mt-1.5" />
        </div>
        <div className="h-8 bg-gray-100 rounded-xl mt-2" />
        <div className="h-10 bg-gray-100 rounded-xl mt-1" />
      </div>
    </div>
  );
}
