/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TCategory, TProduct } from "@/types";
import { Search, ArrowRight, Loader2, X } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/services/products.api";

interface SearchProps {
  categoryList: TCategory[];
}

const SearchBar2: React.FC<SearchProps> = ({ categoryList }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ========================================
  // SEARCH PRODUCTS WHILE TYPING
  // ========================================
  useEffect(() => {
    const value = searchTerm.trim();

    if (!value) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);

        const result = await getAllProducts({
          searchTerm: value,
          page: 1,
          limit: 5,
        });

        setProducts(result?.data?.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ========================================
  // RESET SEARCH
  // ========================================
  const resetSearch = () => {
    setSearchTerm("");
    setProducts([]);
    setIsLoading(false);
  };

  // ========================================
  // CLOSE SHEET + RESET
  // ========================================
  const closeSheet = () => {
    setOpen(false);
    resetSearch();
  };

  // ========================================
  // SEARCH FORM SUBMIT
  // ========================================
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = searchTerm.trim();

    if (!value) return;

    closeSheet();

    router.push(`/product?searchTerm=${encodeURIComponent(value)}`);
  };

  // ========================================
  // CATEGORY SEARCH
  // ========================================
  const handleCategorySearch = (categoryName: string) => {
    closeSheet();

    router.push(
      `/product?searchTerm=${encodeURIComponent(categoryName)}`,
    );
  };

  // ========================================
  // PRODUCT CLICK
  // ========================================
  const handleProductClick = (product: TProduct) => {
    closeSheet();

    router.push(`/product/${product.slug}`);
  };

  return (
  <Sheet
    open={open}
    onOpenChange={(value) => {
      setOpen(value);

      if (!value) {
        resetSearch();
      }
    }}
  >
    {/* Search Icon */}
    <SheetTrigger>
      <button
        type="button"
        aria-label="Search"
        className="
          flex h-9 w-9 items-center justify-center
          rounded-full text-gray-700
          transition hover:bg-gray-100 hover:text-primary
        "
      >
        <Search size={19} strokeWidth={1.8} />
      </button>
    </SheetTrigger>

    {/* Search Drawer */}
    <SheetContent
      side="right"
      className="
        w-full bg-white
        px-5 py-7
        sm:max-w-lg
        sm:px-8
      "
    >
      <SheetHeader className="p-0">
        {/* Heading */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Search
          </p>

          <SheetTitle className="mt-1 text-xl font-semibold text-gray-900">
            What are you looking for?
          </SheetTitle>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mt-6">
          <div
            className="
              flex h-12 items-center
              border-b border-gray-200
              focus-within:border-primary
            "
          >
            <Search
              size={19}
              className="mr-3 shrink-0 text-gray-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="
                h-full w-full bg-transparent
                text-sm text-gray-900
                outline-none
                placeholder:text-gray-400
              "
            />

            {isLoading ? (
              <Loader2
                size={18}
                className="animate-spin text-gray-400"
              />
            ) : (
              <button
                type="submit"
                disabled={!searchTerm.trim()}
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-full
                  text-gray-500
                  hover:bg-primary hover:text-white
                  disabled:opacity-30
                "
              >
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </form>
      </SheetHeader>

      {/* Results */}
      {searchTerm.trim() && (
        <div className="mt-5">
          {isLoading ? (
            <p className="text-sm text-gray-400">
              Searching...
            </p>
          ) : products.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <button
                  key={product._id}
                  type="button"
                  onClick={() => handleProductClick(product)}
                  className="
                    flex w-full items-center
                    py-3 text-left
                    transition hover:text-primary
                  "
                >
                  <Search
                    size={15}
                    className="mr-3 shrink-0 text-gray-400"
                  />

                  <span className="flex-1 truncate text-sm">
                    {product.title}
                  </span>

                  <ArrowRight
                    size={14}
                    className="text-gray-300"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No products found.
            </p>
          )}
        </div>
      )}

      {/* Popular Searches */}
      {!searchTerm.trim() && categoryList?.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
            Popular Searches
          </p>

          <div className="flex flex-wrap gap-2">
            {categoryList.slice(0, 5).map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() =>
                  handleCategorySearch(item.categoryName)
                }
                className="
                  rounded-full
                  border border-gray-200
                  px-4 py-2
                  text-xs text-gray-600
                  transition
                  hover:border-primary
                  hover:text-primary
                "
              >
                {item.categoryName}
              </button>
            ))}
          </div>
        </div>
      )}
    </SheetContent>
  </Sheet>
);
};

export default SearchBar2;