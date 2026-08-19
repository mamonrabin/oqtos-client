"use client";

import React from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TBrand, TCategory, TSubCategory } from "@/types";
import { PiSlidersHorizontalBold } from "react-icons/pi";

interface FilterSidebarProps {
  categoryList: TCategory[];
  SubCategoryList: TSubCategory[];
  brandList: TBrand[];
}

const ResponsiveFilterSidebar: React.FC<FilterSidebarProps> = ({
  categoryList,
  SubCategoryList,
  brandList,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategorySlug = searchParams.get("category");
  const selectedSubCategorySlug = searchParams.get("subCategory");
  const selectedBrandSlug = searchParams.get("brand");

  // Selected category
  const selectedCategory = categoryList?.find(
    (category) => category.slug === selectedCategorySlug,
  );

  // Subcategories for selected category
  const categorySubCategories = selectedCategory
    ? SubCategoryList?.filter(
        (subCategory) => subCategory.category?._id === selectedCategory._id,
      )
    : [];

  // -----------------------------
  // Clear filters
  // -----------------------------

  const handleClear = () => {
    router.push(pathname, {
      scroll: false,
    });
  };

  // -----------------------------
  // Brand
  // -----------------------------

  const handleBrand = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrandSlug === slug) {
      params.delete("brand");
    } else {
      params.set("brand", slug);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Sheet>
      {/* =========================
          FILTER BUTTON
      ========================== */}

      <SheetTrigger>
        <button
          type="button"
          className="flex items-center gap-1.5 text-primary transition-colors duration-300 hover:text-primary lg:hidden"
        >
          <PiSlidersHorizontalBold size={17} />

          <span className="text-sm capitalize">Filter</span>
        </button>
      </SheetTrigger>

      {/* =========================
          SIDEBAR
      ========================== */}

      <SheetContent
        side="left"
        className="w-[320px] overflow-y-auto bg-white p-0 sm:w-[380px]"
      >
        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Filters</h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Find products you&apos;re looking for
            </p>
          </div>

          <SheetClose>
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={19} />
            </button>
          </SheetClose>
        </div>

        {/* =========================
            FILTER CONTENT
        ========================== */}

        <div className="px-5 py-5">
          {/* Clear filters */}

          {(selectedCategorySlug ||
            selectedSubCategorySlug ||
            selectedBrandSlug) && (
            <div className="mb-5 flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2.5">
              <span className="text-xs font-medium text-gray-600">
                Filters applied
              </span>

              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* =========================
              CATEGORY
          ========================== */}

          <div className="border-b border-gray-100 pb-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Categories
            </h3>

            <ul className="space-y-1">
              {categoryList?.slice(0, 15).map((category) => {
                const subcategories = SubCategoryList?.filter(
                  (sub) => sub.category?._id === category._id,
                );

                const hasSubcategories = subcategories.length > 0;

                const isCategoryActive = selectedCategorySlug === category.slug;

                return (
                  <li key={category._id}>
                    {hasSubcategories ? (
                      <details open={isCategoryActive} className="group">
                        <summary
                          className={`flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 transition ${
                            isCategoryActive
                              ? "bg-primary/5 text-primary"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-sm font-medium capitalize">
                            {category.categoryName}
                          </span>

                          <ChevronDown
                            size={16}
                            className="text-gray-400 transition-transform duration-200 group-open:rotate-180"
                          />
                        </summary>

                        {/* Subcategories */}

                        <ul className="ml-3 mt-1 space-y-0.5 border-l border-gray-200 pl-3">
                          {subcategories.map((subCategory) => {
                            const isActive =
                              selectedSubCategorySlug === subCategory.slug;

                            return (
                              <li key={subCategory._id}>
                                <SheetClose>
                                  <Link
                                    href={`/product?category=${category.slug}&subCategory=${subCategory.slug}`}
                                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm capitalize transition ${
                                      isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <ChevronRight size={13} />

                                      {subCategory.subcategoryName}
                                    </span>

                                    <span
                                      className={`text-xs ${
                                        isActive
                                          ? "text-white/80"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      ({subCategory.productCount ?? 0})
                                    </span>
                                  </Link>
                                </SheetClose>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    ) : (
                      <SheetClose>
                        <Link
                          href={`/product?category=${category.slug}`}
                          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition ${
                            isCategoryActive
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                          }`}
                        >
                          <span>{category.categoryName}</span>

                          <ChevronRight size={15} />
                        </Link>
                      </SheetClose>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* =========================
              BRAND
          ========================== */}

          <div className="border-b border-gray-100 py-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Brands</h3>

            <div className="space-y-1">
              {brandList?.map((brand) => {
                const isActive = selectedBrandSlug === brand.slug;

                return (
                  <button
                    key={brand._id}
                    type="button"
                    onClick={() => handleBrand(brand.slug)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      isActive
                        ? "bg-primary/5 font-medium text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    <span>{brand.title}</span>

                    <span
                      className={`h-4 w-4 rounded-full border ${
                        isActive
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {isActive && (
                        <span className="mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================
              PRICE
          ========================== */}

          <div className="py-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Price</h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min price"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <input
                type="number"
                placeholder="Max price"
                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM ACTION
        ========================== */}

        {/* <div className="sticky bottom-0 border-t bg-white p-4">
          <SheetClose>
            <button
              type="button"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              View Products
            </button>
          </SheetClose>
        </div> */}
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveFilterSidebar;
