"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ShopSidebar from "@/components/shop/ShopSidebar";
import { getAllProducts, ProductFilter } from "@/services/products.api";

import { TBrand, TCategory, TProduct, TSubCategory } from "@/types";

import FilteringProducts from "./FilteringProducts";
import { TCustome } from "@/types/customeType";
import ProductSkeleton from "./ProductSkeleton";

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
  design:TCustome
  isLoading: boolean;
}

const ShopContent: React.FC<ShopContentProps> = ({
  categoryList,
  SubCategoryList,
  brandList,
  initialProducts,
  initialMeta,
  design,
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
      searchTerm: searchParams.get("searchTerm") || undefined,
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
    <div className="Container mt-2 flex items-start gap-4 md:mt-12 xl:gap-8">
  {/* Sidebar */}
  <aside className="hidden w-1/4 pb-20 shrink-0 self-stretch lg:block">
    <div className="sticky top-20 pb-4 scrollbar-hide  max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
      <ShopSidebar
        categoryList={categoryList}
        SubCategoryList={SubCategoryList}
        brandList={brandList}
      />
    </div>
  </aside>

  {/* Products */}
  <div className="w-full min-w-0 lg:w-3/4">
    {loading ? (
      <ProductSkeleton />
    ) : (
      <FilteringProducts
        shopProducts={products}
        isLoading={isLoading}
        loadingMore={loadingMore}
        hasMore={meta.page < meta.totalPage}
        onLoadMore={loadMoreProducts}
        categoryList={categoryList}
        SubCategoryList={SubCategoryList}
        brandList={brandList}
        design={design}
      />
    )}
  </div>
</div>
  );
};

export default ShopContent;
