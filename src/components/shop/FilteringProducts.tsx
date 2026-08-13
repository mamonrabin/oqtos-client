/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import React, { useEffect, useRef } from "react";

import { Loader2, ShoppingBag } from "lucide-react";

import {
  TBrand,
  TCategory,
  TProduct,
  TSubCategory,
} from "@/types";

import ProductCard from "../product/ProductCard";
import ProductSort from "./ProductSort";

interface FilterProductProps {
  shopProducts: TProduct[];
  isLoading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;

  categoryList: TCategory[];
  SubCategoryList: TSubCategory[];
  brandList:TBrand[]
}

const FilteringProducts: React.FC<FilterProductProps> = ({
  shopProducts,
  isLoading,
  loadingMore,
  hasMore,
  onLoadMore,
  categoryList,
  SubCategoryList,
  brandList
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          onLoadMore();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    const currentElement = observerRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasMore, loadingMore, onLoadMore]);

  return (
    <>
      {/* Category / Subcategory / Sort */}
      <ProductSort
        categoryList={categoryList}
        SubCategoryList={SubCategoryList}
        brandList={brandList}
      />

      {/* Loading */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !shopProducts?.length ? (
        /* No Products */
        <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag
              className="h-7 w-7 text-primary"
              strokeWidth={1.8}
            />
          </div>

          <h3 className="text-base font-semibold text-gray-800">
            No products found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            We couldn&apos;t find any products matching your
            selected filters. Try changing or clearing your
            filters.
          </p>
        </div>
      ) : (
        <>
          {/* Products */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {shopProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isLoading={false}
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          {hasMore && (
            <div
              ref={observerRef}
              className="flex h-24 items-center justify-center"
            >
              {loadingMore && (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              )}
            </div>
          )}

          {/* End */}
          {!hasMore && shopProducts.length > 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              You&apos;ve reached the end
            </p>
          )}
        </>
      )}
    </>
  );
};

export default FilteringProducts;