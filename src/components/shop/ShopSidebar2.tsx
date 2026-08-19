"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./ShopSidebar2.css";
import { TBrand, TCategory, TSubCategory } from "@/types";

interface ShopSidebar2Props {
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

const sizes = ["S", "M", "L", "XL", "2XL"];

const MAX_PRICE = 10000;

const ShopSidebar2: React.FC<ShopSidebar2Props> = ({
  categoryList,
  SubCategoryList,
  brandList,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("1");

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 0
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || MAX_PRICE
  );

  // -----------------------------------------
  // URL values
  // -----------------------------------------

  const categoryId = searchParams.get("category");
  const subCategoryId = searchParams.get("subCategory");
  const brandId = searchParams.get("brand");

  const selectedColors = useMemo(
    () =>
      searchParams.get("color")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  const selectedSizes = useMemo(
    () =>
      searchParams.get("size")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  // -----------------------------------------
  // Active subcategories
  // -----------------------------------------

  const activeSubCategories = useMemo(() => {
    if (!categoryId) return [];

    return SubCategoryList.filter(
      (subCategory) =>
        subCategory.category?.slug === categoryId
    );
  }, [SubCategoryList, categoryId]);

  // -----------------------------------------
  // Update URL
  // -----------------------------------------

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

    // Always reset pagination
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // -----------------------------------------
  // Category
  // -----------------------------------------

  const handleCategoryClick = (slug: string) => {
    updateParams({
      category: categoryId === slug ? null : slug,
      subCategory: null,
    });
  };

  // -----------------------------------------
  // Sub Category
  // -----------------------------------------

  const handleSubCategoryClick = (slug: string) => {
    updateParams({
      subCategory:
        subCategoryId === slug ? null : slug,
    });
  };

  // -----------------------------------------
  // Brand
  // -----------------------------------------

  const handleBrandClick = (slug: string) => {
    updateParams({
      brand: brandId === slug ? null : slug,
    });
  };

  // -----------------------------------------
  // Color
  // -----------------------------------------

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

  // -----------------------------------------
  // Size
  // -----------------------------------------

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

  // -----------------------------------------
  // Price
  // -----------------------------------------

  const handleMinPriceChange = (value: number) => {
    const newMin = Math.min(value, maxPrice - 1);
    setMinPrice(newMin);
  };

  const handleMaxPriceChange = (value: number) => {
    const newMax = Math.max(value, minPrice + 1);
    setMaxPrice(newMax);
  };

  const applyPriceFilter = () => {
    updateParams({
      minPrice:
        minPrice > 0 ? String(minPrice) : null,

      maxPrice:
        maxPrice < MAX_PRICE
          ? String(maxPrice)
          : null,
    });
  };

  // -----------------------------------------
  // Clear all
  // -----------------------------------------

  const handleClearAll = () => {
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);

    router.push(pathname, {
      scroll: false,
    });
  };

  // -----------------------------------------
  // Active filters
  // -----------------------------------------

  const hasActiveFilters =
    searchParams.has("category") ||
    searchParams.has("subCategory") ||
    searchParams.has("brand") ||
    searchParams.has("color") ||
    searchParams.has("size") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  // -----------------------------------------
  // Close on ESC
  // -----------------------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (open) {
      document.addEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  // -----------------------------------------
  // Accordion
  // -----------------------------------------

  const toggleAccordion = (id: string) => {
    setExpanded((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <>
      {/* =========================================
          FILTER BUTTON
      ========================================= */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-1 font-medium text-primary"
      >
        <PiSlidersHorizontalBold size={17} />

        <span className="text-sm capitalize">
          Filter
        </span>

        {hasActiveFilters && (
          <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-white">
            {[
              categoryId,
              subCategoryId,
              brandId,
              ...selectedColors,
              ...selectedSizes,
              searchParams.get("minPrice"),
              searchParams.get("maxPrice"),
            ].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* =========================================
          DRAWER
      ========================================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}

            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Sidebar */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[430px] flex-col bg-white shadow-2xl"
            >
              {/* =====================================
                  HEADER
              ===================================== */}

              <div className="flex items-center justify-between border-b px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold uppercase tracking-[0.2em]">
                    Filters
                  </h2>

                  {hasActiveFilters && (
                    <p className="mt-1 text-xs text-gray-500">
                      {
                        [
                          categoryId,
                          subCategoryId,
                          brandId,
                          ...selectedColors,
                          ...selectedSizes,
                          searchParams.get("minPrice"),
                          searchParams.get("maxPrice"),
                        ].filter(Boolean).length
                      }{" "}
                      filters selected
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
                >
                  <X size={19} />
                </button>
              </div>

              {/* =====================================
                  CLEAR ALL
              ===================================== */}

              <div className="flex items-center justify-between border-b px-6 py-4">
                <span className="text-sm text-gray-500">
                  Refine your products
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* =====================================
                  SCROLL CONTENT
              ===================================== */}

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {/* =================================
                    PRICE
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("1")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Price

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "1"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "1" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-5">
                          {/* Slider */}

                          <div className="relative my-5 h-4">
                            {/* Background */}

                            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />

                            {/* Selected */}

                            <div
                              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
                              style={{
                                left: `${
                                  (minPrice /
                                    MAX_PRICE) *
                                  100
                                }%`,

                                right: `${
                                  100 -
                                  (maxPrice /
                                    MAX_PRICE) *
                                    100
                                }%`,
                              }}
                            />

                            {/* Min */}

                            <input
                              type="range"
                              min={0}
                              max={MAX_PRICE}
                              value={minPrice}
                              onChange={(e) =>
                                handleMinPriceChange(
                                  Number(
                                    e.target.value
                                  )
                                )
                              }
                              className="price-slider absolute top-0 h-4 w-full appearance-none bg-transparent"
                            />

                            {/* Max */}

                            <input
                              type="range"
                              min={0}
                              max={MAX_PRICE}
                              value={maxPrice}
                              onChange={(e) =>
                                handleMaxPriceChange(
                                  Number(
                                    e.target.value
                                  )
                                )
                              }
                              className="price-slider absolute top-0 h-4 w-full appearance-none bg-transparent"
                            />
                          </div>

                          {/* Inputs */}

                          <div className="flex items-center gap-2">
                            <div className="flex flex-1 items-center rounded-md border border-gray-200 px-3 py-2">
                              <span className="mr-1 text-sm text-gray-500">
                                ৳
                              </span>

                              <input
                                type="number"
                                min={0}
                                max={MAX_PRICE}
                                value={minPrice}
                                onChange={(e) =>
                                  handleMinPriceChange(
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="w-full bg-transparent text-sm outline-none"
                              />
                            </div>

                            <span className="text-sm text-gray-400">
                              to
                            </span>

                            <div className="flex flex-1 items-center rounded-md border border-gray-200 px-3 py-2">
                              <span className="mr-1 text-sm text-gray-500">
                                ৳
                              </span>

                              <input
                                type="number"
                                min={0}
                                max={MAX_PRICE}
                                value={maxPrice}
                                onChange={(e) =>
                                  handleMaxPriceChange(
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="w-full bg-transparent text-sm outline-none"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={applyPriceFilter}
                            className="mt-3 w-full rounded-md bg-primary py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:opacity-90"
                          >
                            Apply Price
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================
                    CATEGORY
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("2")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Category

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "2"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "2" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 px-4 pb-4">
                          {categoryList.map(
                            (category) => {
                              const isChecked =
                                categoryId ===
                                category.slug;

                              return (
                                <label
                                  key={category.slug}
                                  className="flex cursor-pointer items-center gap-3 text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      isChecked
                                    }
                                    onChange={() =>
                                      handleCategoryClick(
                                        category.slug
                                      )
                                    }
                                    className="h-4 w-4 cursor-pointer accent-black"
                                  />

                                  <span
                                    className={
                                      isChecked
                                        ? "font-medium text-black"
                                        : "text-gray-600"
                                    }
                                  >
                                    {
                                      category.categoryName
                                    }
                                  </span>
                                </label>
                              );
                            }
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================
                    SUB CATEGORY
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("3")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Sub Category

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "3"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "3" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 px-4 pb-4">
                          {activeSubCategories.length >
                          0 ? (
                            activeSubCategories.map(
                              (subCategory) => {
                                const isChecked =
                                  subCategoryId ===
                                  subCategory.slug;

                                return (
                                  <label
                                    key={
                                      subCategory.slug
                                    }
                                    className="flex cursor-pointer items-center gap-3 text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        isChecked
                                      }
                                      onChange={() =>
                                        handleSubCategoryClick(
                                          subCategory.slug
                                        )
                                      }
                                      className="h-4 w-4 cursor-pointer accent-black"
                                    />

                                    <span
                                      className={
                                        isChecked
                                          ? "font-medium text-black"
                                          : "text-gray-600"
                                      }
                                    >
                                      {
                                        subCategory.subcategoryName
                                      }
                                    </span>
                                  </label>
                                );
                              }
                            )
                          ) : (
                            <p className="pb-2 text-sm text-gray-400">
                              Select a category first
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================
                    BRAND
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("4")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Brand

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "4"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "4" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 px-4 pb-4">
                          {brandList.map((brand) => {
                            const isChecked =
                              brandId === brand.slug;

                            return (
                              <label
                                key={brand.slug}
                                className="flex cursor-pointer items-center gap-3 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    handleBrandClick(
                                      brand.slug
                                    )
                                  }
                                  className="h-4 w-4 cursor-pointer accent-black"
                                />

                                <span
                                  className={
                                    isChecked
                                      ? "font-medium text-black"
                                      : "text-gray-600"
                                  }
                                >
                                  {brand.title}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================
                    COLOR
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("5")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Colors

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "5"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "5" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                          {colors.map((color) => {
                            const isChecked =
                              selectedColors.includes(
                                color.value
                              );

                            return (
                              <label
                                key={color.value}
                                className="flex cursor-pointer items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    handleColorClick(
                                      color.value
                                    )
                                  }
                                  className="h-4 w-4 cursor-pointer accent-black"
                                />

                                <span
                                  className={
                                    isChecked
                                      ? "font-medium text-black"
                                      : "text-gray-600"
                                  }
                                >
                                  {color.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================
                    SIZE
                ================================= */}

                <div className="border-b">
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion("6")
                    }
                    className="flex w-full items-center justify-between px-2 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    Size

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        expanded === "6"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === "6" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 px-4 pb-5">
                          {sizes.map((size) => {
                            const isChecked =
                              selectedSizes.includes(
                                size
                              );

                            return (
                              <label
                                key={size}
                                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                                  isChecked
                                    ? "border-black bg-black text-white"
                                    : "border-gray-200 text-gray-600"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    handleSizeClick(
                                      size
                                    )
                                  }
                                  className="sr-only"
                                />

                                {size}
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* =====================================
                  BOTTOM VIEW RESULTS
              ===================================== */}

              <div className="border-t bg-white p-5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`w-full py-3 text-sm font-medium uppercase tracking-[0.18em] transition ${
                    hasActiveFilters
                      ? "bg-black text-white hover:opacity-90"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  View Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          RANGE SLIDER STYLE
      ========================================= */}

      {/* <style jsx>{`
        .price-slider {
          pointer-events: none;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background:#087096;
          cursor: pointer;
          pointer-events: auto;
        }

        .price-slider::-moz-range-thumb {
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background: #087096;
          cursor: pointer;
          border: 2px solid #fff;
          pointer-events: auto;
        }

        .price-slider::-webkit-slider-runnable-track {
          background: transparent;
        }

        .price-slider::-moz-range-track {
          background: transparent;
        }
      `}</style> */}
    </>
  );
};

export default ShopSidebar2;