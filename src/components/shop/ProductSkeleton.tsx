import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-lg border border-gray-100 bg-white"
          >
            <div className="aspect-[3/4] w-full bg-gray-200" />

            <div className="space-y-3 p-3">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
};

export default ProductSkeleton;