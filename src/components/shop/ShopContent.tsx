"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ShopSidebar from "@/components/shop/ShopSidebar";
import { getAllProducts, ProductFilter } from "@/services/products.api";

import { TBrand, TCategory, TProduct, TSubCategory } from "@/types";

import FilteringProducts from "./FilteringProducts";

interface ShopMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface ShopContentProps {
  categoryList: TCategory[];
  SubCategoryList: TSubCategory[];
  brandList: TBrand[];
  initialProducts: TProduct[];
  initialMeta: ShopMeta;
  isLoading: boolean;
}

const ShopContent: React.FC<ShopContentProps> = ({
  categoryList,
  SubCategoryList,
  brandList,
  initialProducts,
  initialMeta,
  isLoading,
}) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<TProduct[]>(initialProducts);

  const [meta, setMeta] = useState<ShopMeta>(initialMeta);

  const [loading, setLoading] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  /**
   * Get filters from URL
   */
  const getFilters = useCallback((): ProductFilter => {
    return {
      category: searchParams.get("category") || undefined,

      subCategory: searchParams.get("subCategory") || undefined,

      brand: searchParams.get("brand") || undefined,

      color: searchParams.get("color") || undefined,

      size: searchParams.get("size") || undefined,

      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,

      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,

      sort: searchParams.get("sort") || undefined,
    };
  }, [searchParams]);

  /**
   * Fetch first page when filters change
   */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const result = await getAllProducts({
          ...getFilters(),
          page: 1,
          limit: 4,
        });

        setProducts(result.data.data);

        setMeta(result.data.meta);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [getFilters]);

  /**
   * Load next page
   */
  const loadMoreProducts = useCallback(async () => {
    if (loadingMore) return;

    if (meta.page >= meta.totalPage) return;

    try {
      setLoadingMore(true);

      const nextPage = meta.page + 1;

      const result = await getAllProducts({
        ...getFilters(),
        page: nextPage,
        limit: 4,
      });

      const newProducts = result.data.data;

      setProducts((prev) => [...prev, ...newProducts]);

      setMeta(result.data.meta);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [meta.page, meta.totalPage, loadingMore, getFilters]);

  return (
    <div className="Container mt-6 flex gap-4 md:mt-12 xl:gap-8">
      {/* Sidebar */}
      <div className="hidden w-1/4 lg:block">
        <ShopSidebar
          categoryList={categoryList}
          SubCategoryList={SubCategoryList}
          brandList={brandList}
        />
      </div>

      {/* Products */}
      <div className="w-full lg:w-3/4">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <FilteringProducts
            shopProducts={products}
            isLoading={isLoading}
            loadingMore={loadingMore}
            hasMore={meta.page < meta.totalPage}
            onLoadMore={loadMoreProducts}
            categoryList={categoryList}
            SubCategoryList={SubCategoryList}
          />
        )}
      </div>
    </div>
  );
};

export default ShopContent;
