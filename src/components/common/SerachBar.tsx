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
import { Search, ArrowRight, Loader2 } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/services/products.api";

interface SearchProps {
  categoryList: TCategory[];
}

const SearchBar: React.FC<SearchProps> = ({ categoryList }) => {
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

    router.push(
      `/product?searchTerm=${encodeURIComponent(value)}`,
    );
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

        // Reset when user closes the Sheet manually
        if (!value) {
          resetSearch();
        }
      }}
    >
      {/* ========================================
          SEARCH ICON
      ======================================== */}
      <SheetTrigger>
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-primary"
        >
          <Search size={19} strokeWidth={1.8} />
        </button>
      </SheetTrigger>

      {/* ========================================
          SEARCH PANEL
      ======================================== */}
      <SheetContent
        side="top"
        className="border-b border-gray-100 bg-white px-5 py-8 sm:px-8 lg:px-20 xl:px-40"
      >
        <SheetHeader className="mx-auto w-full max-w-5xl p-0">
          {/* ========================================
              HEADING
          ======================================== */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Search
            </p>

            <SheetTitle className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              What are you looking for?
            </SheetTitle>
          </div>

          {/* ========================================
              SEARCH INPUT
          ======================================== */}
          <form onSubmit={handleSearch} className="mt-7">
            <div className="group flex items-center border-b border-gray-200 transition-colors duration-200 focus-within:border-primary">
              <Search
                size={20}
                strokeWidth={1.8}
                className="mr-3 shrink-0 text-gray-400 transition-colors group-focus-within:text-primary"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="h-14 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              {/* Loading */}
              {isLoading ? (
                <Loader2
                  size={18}
                  className="mr-2 shrink-0 animate-spin text-gray-400"
                />
              ) : (
                <button
                  type="submit"
                  aria-label="Submit search"
                  disabled={!searchTerm.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </form>

          {/* ========================================
              SEARCH RESULTS
          ======================================== */}
          {searchTerm.trim() && (
            <div className="mt-4">
              {isLoading ? (
                <div className="py-4 text-sm text-gray-400">
                  Searching products...
                </div>
              ) : products.length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-gray-100 bg-white">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleProductClick(product)}
                      className="flex w-full items-center border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50"
                    >
                      <Search
                        size={16}
                        strokeWidth={1.8}
                        className="mr-3 shrink-0 text-gray-400"
                      />

                      <span className="text-sm text-gray-700">
                        {product.title}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-sm text-gray-400">
                  No products found.
                </p>
              )}
            </div>
          )}

          {/* ========================================
              POPULAR SEARCHES
          ======================================== */}
          {!searchTerm.trim() && categoryList?.length > 0 && (
            <div className="mt-7">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Popular Searches
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {categoryList.slice(0, 5).map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() =>
                      handleCategorySearch(item.categoryName)
                    }
                    className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary md:text-sm"
                  >
                    {item.categoryName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;