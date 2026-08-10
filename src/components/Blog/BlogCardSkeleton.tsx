const BlogCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image */}
      <div className="aspect-[16/10] rounded-2xl bg-gray-200" />

      {/* Content */}
      <div className="pt-5">
        <div className="h-3 w-24 rounded bg-gray-200" />

        <div className="mt-4 h-6 w-4/5 rounded bg-gray-200" />
        <div className="mt-2 h-6 w-3/5 rounded bg-gray-200" />

        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-4/5 rounded bg-gray-200" />
        </div>

        <div className="mt-5 h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
};
export default BlogCardSkeleton;
