
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
  categoryList = [],
  subcategoryList = [],
}) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const visibleCategories = showAll
    ? categoryList
    : categoryList.slice(0, 10);

  const getSubcategories = (categoryId: string) => {
    return subcategoryList.filter(
      (subCategory) => subCategory.category?._id === categoryId
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory((prev) =>
      prev === categoryId ? null : categoryId
    );
  };

  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-xl bg-primary text-white shadow-sm">
      {/* Header */}
      <div className="flex h-[58px] shrink-0 items-center gap-2.5 border-b border-white/10 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
          <ShoppingBag size={16} strokeWidth={1.8} />
        </div>

        <h3 className="text-sm font-semibold tracking-wide">
          Categories
        </h3>
      </div>

      {/* Scrollable Categories */}
      <div
        className="
          min-h-0 flex-1 overflow-y-auto
          px-3 py-2
          [scrollbar-width:thin]
          [scrollbar-color:rgba(255,255,255,0.15)_transparent]
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/15
        "
      >
        <div className="space-y-1">
          {visibleCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            const subcategories = getSubcategories(category._id);
            const hasSubcategories = subcategories.length > 0;
            const isExpanded = expandedCategory === category._id;

            const categoryUrl = `/product?category=${encodeURIComponent(
              category.slug
            )}`;

            return (
              <div key={category._id}>
                {/* Category Item */}
                <div
                  className={`
                    group flex w-full items-center gap-3
                    rounded-lg px-3 py-2
                    transition-all duration-200
                    ${
                      isExpanded
                        ? "bg-white/15"
                        : "hover:bg-white/10"
                    }
                  `}
                >
                  {/* Category Icon */}
                  {hasSubcategories ? (
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category._id)}
                      aria-label={`Toggle ${category.categoryName} subcategories`}
                      aria-expanded={isExpanded}
                      className="
                        flex h-8 w-8 shrink-0
                        cursor-pointer items-center justify-center
                        rounded-md bg-white/10
                        transition-colors duration-200
                        group-hover:bg-white/15
                      "
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </button>
                  ) : (
                    <Link
                      href={categoryUrl}
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-md bg-white/10
                        transition-colors duration-200
                        group-hover:bg-white/15
                      "
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </Link>
                  )}

                  {/* Category Name */}
                  {hasSubcategories ? (
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category._id)}
                      aria-expanded={isExpanded}
                      className="
                        min-w-0 flex-1 cursor-pointer truncate
                        text-left text-sm font-medium capitalize
                        text-white/90
                        transition-colors duration-200
                        group-hover:text-white
                      "
                    >
                      {category.categoryName}
                    </button>
                  ) : (
                    <Link
                      href={categoryUrl}
                      className="
                        min-w-0 flex-1 truncate
                        text-sm font-medium capitalize
                        text-white/90
                        transition-colors duration-200
                        group-hover:text-white
                      "
                    >
                      {category.categoryName}
                    </Link>
                  )}

                  {/* Right Arrow */}
                  {hasSubcategories ? (
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category._id)}
                      aria-label={`Toggle ${category.categoryName}`}
                      aria-expanded={isExpanded}
                      className="
                        flex h-7 w-7 shrink-0 cursor-pointer
                        items-center justify-center rounded-md
                        text-white/50
                        transition-colors duration-200
                        hover:bg-white/10 hover:text-white
                      "
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : "-rotate-90"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={categoryUrl}
                      aria-label={`View ${category.categoryName}`}
                      className="
                        flex h-7 w-7 shrink-0
                        items-center justify-center rounded-md
                        text-white/50
                        transition-all duration-200
                        hover:bg-white/10 hover:text-white
                      "
                    >
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>

                {/* Subcategory Dropdown */}
                {hasSubcategories && (
                  <div
                    className={`
                      grid transition-[grid-template-rows,opacity]
                      duration-300 ease-in-out
                      ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mb-1 ml-[44px] mt-1 space-y-0.5 border-l border-white/15 pl-3">
                        {/* All Products Link */}
                        <Link
                          href={categoryUrl}
                          tabIndex={isExpanded ? 0 : -1}
                          className="
                            flex items-center gap-2
                            rounded-md px-2 py-2
                            text-xs font-medium text-white/80
                            transition-colors duration-200
                            hover:bg-white/10 hover:text-white
                          "
                        >
                          <span className="h-1 w-1 rounded-full bg-white/50" />
                          All {category.categoryName}
                        </Link>

                        {subcategories.map((subCategory) => (
                          <Link
                            key={subCategory._id}
                            href={`${categoryUrl}&subCategory=${encodeURIComponent(
                              subCategory.slug
                            )}`}
                            tabIndex={isExpanded ? 0 : -1}
                            className="
                              group/sub flex items-center gap-2
                              rounded-md px-2 py-2
                              text-xs text-white/65
                              transition-all duration-200
                              hover:bg-white/10 hover:text-white
                            "
                          >
                            <span
                              className="
                                h-1 w-1 shrink-0 rounded-full
                                bg-white/40 transition-colors
                                group-hover/sub:bg-white
                              "
                            />

                            <span className="min-w-0 flex-1 truncate capitalize">
                              {subCategory.subcategoryName}
                            </span>

                            <ArrowRight
                              size={11}
                              className="
                                shrink-0 opacity-0
                                transition-all duration-200
                                group-hover/sub:translate-x-0.5
                                group-hover/sub:opacity-70
                              "
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {categoryList.length === 0 && (
            <p className="py-8 text-center text-xs text-white/60">
              No categories available
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      {categoryList.length > 10 && (
        <button
          type="button"
          onClick={() => {
            setShowAll((prev) => !prev);
            setExpandedCategory(null);
          }}
          className="
            flex h-[58px] w-full shrink-0
            cursor-pointer items-center justify-between
            border-t border-white/15
            px-5 text-sm font-semibold
            transition-colors duration-200
            hover:bg-white/10
          "
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
