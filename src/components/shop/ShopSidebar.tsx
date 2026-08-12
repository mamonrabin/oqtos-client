"use client";

import React, { useState } from "react";
import {
  Minus,
  Plus,
  ChevronRight,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TBrand, TCategory, TSubCategory } from "@/types";

interface ShopSidebarProps {
  categoryList: TCategory[];
  SubCategoryList: TSubCategory[];
  brandList: TBrand[];
}

const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Yellow", value: "yellow" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const ShopSidebar: React.FC<ShopSidebarProps> = ({
  categoryList,
  SubCategoryList,
  brandList,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAll, setShowAll] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);
  const [collapsed6, setCollapsed6] = useState(true);

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  // --------------------------------
  // Current URL values
  // --------------------------------

  const categoryId = searchParams.get("category");
  const subCategoryId = searchParams.get("subCategory");
  const brandId = searchParams.get("brand");

  const selectedColors =
    searchParams.get("color")?.split(",").filter(Boolean) || [];

  const selectedSizes =
    searchParams.get("size")?.split(",").filter(Boolean) || [];

  // --------------------------------
  // Update URL
  // --------------------------------

  const updateParams = (
    updates: Record<string, string | null>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Always go back to page 1 after filtering
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // --------------------------------
  // Category
  // --------------------------------

  const handleCategoryClick = (slug: string) => {
    updateParams({
      category: categoryId === slug ? null : slug,
      subCategory: null,
    });
  };

  // --------------------------------
  // Sub Category
  // --------------------------------

  const handleSubCategoryClick = (id: string) => {
    updateParams({
      subCategory:
        subCategoryId === id ? null : id,
    });
  };

  // --------------------------------
  // Brand
  // --------------------------------

  const handleBrandClick = (id: string) => {
    updateParams({
      brand: brandId === id ? null : id,
    });
  };

  // --------------------------------
  // Color
  // --------------------------------

  const handleColorClick = (color: string) => {
    let updatedColors = [...selectedColors];

    if (updatedColors.includes(color)) {
      updatedColors = updatedColors.filter(
        (item) => item !== color
      );
    } else {
      updatedColors.push(color);
    }

    updateParams({
      color:
        updatedColors.length > 0
          ? updatedColors.join(",")
          : null,
    });
  };

  // --------------------------------
  // Size
  // --------------------------------

  const handleSizeClick = (size: string) => {
    let updatedSizes = [...selectedSizes];

    if (updatedSizes.includes(size)) {
      updatedSizes = updatedSizes.filter(
        (item) => item !== size
      );
    } else {
      updatedSizes.push(size);
    }

    updateParams({
      size:
        updatedSizes.length > 0
          ? updatedSizes.join(",")
          : null,
    });
  };

  // --------------------------------
  // Price
  // --------------------------------

  const handlePriceFilter = () => {
    updateParams({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    });
  };

  // --------------------------------
  // Clear All
  // --------------------------------

  const handleClearAll = () => {
    setMinPrice("");
    setMaxPrice("");

    router.push(pathname, {
      scroll: false,
    });
  };

  const hasFilters =
    searchParams.has("category") ||
    searchParams.has("subCategory") ||
    searchParams.has("brand") ||
    searchParams.has("color") ||
    searchParams.has("size") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  // --------------------------------
  // Visible lists
  // --------------------------------

  const visibleCategories = showAll
    ? categoryList
    : categoryList.slice(0, 5);

  const visibleBrands = showAllBrands
    ? brandList
    : brandList.slice(0, 5);

  // --------------------------------
  // Subcategories
  // --------------------------------

  const activeSubCategories = SubCategoryList.filter(
    (subCategory) =>
      subCategory.category?.slug === categoryId
  );

  return (
    <aside className="w-full space-y-4">

      {/* ================= CLEAR ALL ================= */}

      {hasFilters && (
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <span className="text-sm font-medium text-gray-700">
            Filters applied
          </span>

          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <X size={15} />
            Clear All
          </button>
        </div>
      )}

      {/* ================= CATEGORY ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Categories
          </h2>

          {collapsed ? (
            <Plus size={18} className="text-gray-500" />
          ) : (
            <Minus size={18} className="text-gray-500" />
          )}
        </button>

        {!collapsed && (
          <div className="mt-4 space-y-1">
            {visibleCategories.map((category) => {
              const isActive =
                categoryId === category.slug;

              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() =>
                    handleCategoryClick(category.slug)
                  }
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-all ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  <span className="capitalize">
                    {category.categoryName}
                  </span>

                  <ChevronRight
                    size={16}
                    className={
                      isActive
                        ? "text-primary"
                        : "text-gray-300"
                    }
                  />
                </button>
              );
            })}

            {categoryList.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="mt-2 px-3 text-sm font-medium text-primary hover:underline"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= SUB CATEGORY ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed2(!collapsed2)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Sub Categories
          </h2>

          {collapsed2 ? (
            <Plus size={18} />
          ) : (
            <Minus size={18} />
          )}
        </button>

        {!collapsed2 && (
          <div className="mt-4 space-y-1">
            {activeSubCategories.length > 0 ? (
              activeSubCategories.map((subCategory) => {
                const isActive =
                  subCategoryId === subCategory.slug;

                return (
                  <button
                    key={subCategory.slug}
                    type="button"
                    onClick={() =>
                      handleSubCategoryClick(
                        subCategory.slug
                      )
                    }
                    className={`flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm transition ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {subCategory.subcategoryName}
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-2 text-sm text-gray-400">
                Select a category first
              </p>
            )}
          </div>
        )}
      </div>

      {/* ================= BRAND ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed3(!collapsed3)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Brands
          </h2>

          {collapsed3 ? (
            <Plus size={18} />
          ) : (
            <Minus size={18} />
          )}
        </button>

        {!collapsed3 && (
          <div className="mt-4 space-y-1">
            {visibleBrands.map((brand) => {
              const isActive =
                brandId === brand.slug;

              return (
                <button
                  key={brand.slug}
                  type="button"
                  onClick={() =>
                    handleBrandClick(brand.slug)
                  }
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  <span className="capitalize">
                    {brand.title}
                  </span>

                  <ChevronRight size={16} />
                </button>
              );
            })}

            {brandList.length > 5 && (
              <button
                type="button"
                onClick={() =>
                  setShowAllBrands(!showAllBrands)
                }
                className="mt-2 px-3 text-sm font-medium text-primary hover:underline"
              >
                {showAllBrands
                  ? "Show Less"
                  : "Show More"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= COLOR ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed4(!collapsed4)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Color
          </h2>

          {collapsed4 ? (
            <Plus size={18} />
          ) : (
            <Minus size={18} />
          )}
        </button>

        {!collapsed4 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {colors.map((color) => {
              const isActive =
                selectedColors.includes(
                  color.value
                );

              return (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    handleColorClick(color.value)
                  }
                  className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary/40"
                  }`}
                >
                  {color.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= SIZE ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed5(!collapsed5)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Size
          </h2>

          {collapsed5 ? (
            <Plus size={18} />
          ) : (
            <Minus size={18} />
          )}
        </button>

        {!collapsed5 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isActive =
                selectedSizes.includes(size);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    handleSizeClick(size)
                  }
                  className={`min-w-12 rounded-md border px-3 py-2 text-sm transition ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= PRICE ================= */}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setCollapsed6(!collapsed6)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-base font-semibold text-gray-900">
            Price
          </h2>

          {collapsed6 ? (
            <Plus size={18} />
          ) : (
            <Minus size={18} />
          )}
        </button>

        {!collapsed6 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={handlePriceFilter}
              className="mt-3 w-full rounded-md bg-primary py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Apply Price
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ShopSidebar;