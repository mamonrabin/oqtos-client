"use client";

import { TCategory, TSubCategory } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleDot,
  ShoppingBag,
  Shirt,
  Sparkles,
  Watch,
} from "lucide-react";

interface CategoryProps {
  categoryList: TCategory[];
  subcategoryList: TSubCategory[];
}

const categoryIcons = [
  Shirt,
  Shirt,
  ShoppingBag,
  BriefcaseBusiness,
  Sparkles,
  Watch,
  CircleDot,
];

const BannerCategory: React.FC<CategoryProps> = ({
  categoryList,
  subcategoryList,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    null
  );

  // Show first 10 categories initially
  const visibleCategories = showAll
    ? categoryList
    : categoryList?.slice(0, 10);

  // Find subcategories belonging to a category
  const getSubcategories = (categoryId: string) => {
    return (
      subcategoryList?.filter(
        (subCategory) => subCategory.category?._id === categoryId
      ) || []
    );
  };

  // Expand / collapse category
  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory((prev) =>
      prev === categoryId ? null : categoryId
    );
  };

  return (
    <div className="h-[420px]  overflow-hidden rounded-xl bg-primary text-white shadow-sm">
      {/* Header */}
      <div className="flex h-[58px] items-center gap-2 border-b border-white/10 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
          <ShoppingBag size={16} />
        </div>

        <h3 className="text-sm font-semibold tracking-wide">
          Categories
        </h3>
      </div>

      {/* Category List */}
      <div className="h-[304px] overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="space-y-1">
          {visibleCategories?.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            const subcategories = getSubcategories(category._id);

            const hasSubcategories = subcategories.length > 0;

            const isExpanded = expandedCategory === category._id;

            return (
              <div key={category._id}>
                {/* Category Row */}
                <div
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    isExpanded
                      ? "bg-white/10"
                      : "hover:bg-white/10"
                  }`}
                >
                  {/* Icon */}
                  {hasSubcategories ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryClick(category._id)
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 transition-all duration-200 hover:bg-white/15"
                    >
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <Icon size={16} strokeWidth={1.8} />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={`/product?category=${category.slug}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 transition-all duration-200 hover:bg-white/15"
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </Link>
                  )}

                  {/* Category Name */}
                  {hasSubcategories ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryClick(category._id)
                      }
                      className="flex-1 truncate text-left text-sm font-medium capitalize text-white/90 transition-colors hover:text-white"
                    >
                      {category.categoryName}
                    </button>
                  ) : (
                    <Link
                      href={`/product?category=${category.slug}`}
                      className="flex-1 truncate text-left text-sm font-medium capitalize text-white/90 transition-colors hover:text-white"
                    >
                      {category.categoryName}
                    </Link>
                  )}

                  {/* Category Link */}
                  <Link
                    href={`/product?category=${category.slug}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
                    aria-label={`View ${category.categoryName}`}
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Subcategories */}
                {hasSubcategories && isExpanded && (
                  <div className="ml-[44px] mt-1 mb-1 space-y-0.5 border-l border-white/10 pl-3">
                    {subcategories.map((subCategory) => (
                      <Link
                        key={subCategory._id}
                        href={`/product?category=${category.slug}&subCategory=${subCategory.slug}`}
                        className="group flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        {/* Dot */}
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/40 transition-colors group-hover:bg-white" />

                        {/* Name */}
                        <span className="flex-1 truncate capitalize">
                          {subCategory.subcategoryName}
                        </span>

                        {/* Arrow */}
                        <ArrowRight
                          size={11}
                          className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* View All */}
      {categoryList?.length > 10 && (
        <button
          type="button"
          onClick={() => {
            setShowAll((prev) => !prev);
            setExpandedCategory(null);
          }}
          className="flex h-[58px] w-full items-center justify-between border-t border-white/10 px-5 text-sm font-semibold transition-colors duration-200 hover:bg-white/5"
        >
          <span>
            {showAll ? "Show Less" : "View All Categories"}
          </span>

          <ChevronDown
            size={17}
            className={`transition-transform duration-300 ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default BannerCategory;