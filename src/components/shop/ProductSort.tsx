"use client";

import React from "react";
import { Funnel, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TBrand, TCategory, TSubCategory } from "@/types";
import ResponsiveFilterSidebar from "./ResponsiveFilterSidebar";

interface ProductSortProps {
  categoryList: TCategory[];
  SubCategoryList: TSubCategory[];
  brandList:TBrand[]
}

const ProductSort: React.FC<ProductSortProps> = ({
  categoryList,
  SubCategoryList,
  brandList
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";

  const categorySlug = searchParams.get("category");

  const subCategorySlug = searchParams.get("subCategory");

  // --------------------------------
  // Selected category
  // --------------------------------

  const selectedCategory = categoryList.find(
    (category) => category.slug === categorySlug,
  );

  // --------------------------------
  // Selected subcategory
  // --------------------------------

  const selectedSubCategory = SubCategoryList.find(
    (subCategory) => subCategory.slug === subCategorySlug,
  );

  // --------------------------------
  // Subcategories of selected category
  // --------------------------------

  const categorySubCategories = selectedCategory
    ? SubCategoryList.filter(
        (subCategory) => subCategory.category?.slug === selectedCategory.slug,
      )
    : [];

  // --------------------------------
  // Select subcategory
  // --------------------------------

  const handleSubCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("subCategory", slug);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // --------------------------------
  // Sort
  // --------------------------------

  const handleSort = (value: string | null) => {
    if (value === null) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // --------------------------------
  // Clear category/subcategory
  // --------------------------------

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("subCategory");
    params.delete("page");

    // Don't delete sort
    // Sort should remain visible and selected

    router.push(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      {
        scroll: false,
      },
    );
  };

  return (
    <div className="mb-3 flex md:flex-row flex-col items-start justify-between gap-4">
      {/* Left side */}
      <div className="min-w-0 flex-1">
        {!selectedCategory && !selectedSubCategory ? (
          <div className="md:text-lg md:flex hidden text-base font-medium text-gray-900">
            All Products
          </div>
        ) : (
          <>
            {/* Category */}
            {selectedCategory && (
              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-lg font-semibold capitalize text-gray-900">
                  {selectedCategory.categoryName}
                </h2>

                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            )}

            {/* Subcategories */}
            {selectedCategory && categorySubCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {categorySubCategories.map((subCategory) => {
                  const isActive = subCategorySlug === subCategory.slug;

                  return (
                    <button
                      key={subCategory._id}
                      type="button"
                      onClick={() => handleSubCategory(subCategory.slug)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        isActive
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {subCategory.subcategoryName}
                      <span className="ml-1 text-[10px]">
                        ({subCategory.productCount ?? 0})
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sort - ALWAYS visible */}
      <div className="flex items-center justify-between md:w-auto w-full">
        <ResponsiveFilterSidebar categoryList={categoryList} SubCategoryList={SubCategoryList} brandList={brandList}/>
        <div className="flex shrink-0 items-center">
          <Select value={currentSort} onValueChange={handleSort}>
            <SelectTrigger className="h-10 w-[180px] rounded border-gray-200 bg-white text-sm font-medium">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="default" className="!rounded-[1px]">
                Default sorting
              </SelectItem>
              <SelectItem value="a-z" className="!rounded-[1px]">
                Products A-Z
              </SelectItem>
              <SelectItem value="z-a" className="!rounded-[1px]">
                Products Z-A
              </SelectItem>
              <SelectItem value="dateNewToOld" className="!rounded-[1px]">
                Latest products
              </SelectItem>
              <SelectItem value="priceLowToHigh" className="!rounded-[1px]">
                Price: Low to High
              </SelectItem>
              <SelectItem value="priceHighToLow" className="!rounded-[1px]">
                Price: High to Low
              </SelectItem>
              <SelectItem value="dateOldToNew" className="!rounded-[1px]">
                Old Products
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
