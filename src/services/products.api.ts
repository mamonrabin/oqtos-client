import { apiBaseUrl } from "@/config";

export const getNewArrivalProducts = async () => {
  const res = await fetch(`${apiBaseUrl}/product/new-products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
export const getBestSellingProducts = async () => {
  const res = await fetch(`${apiBaseUrl}/product/best-selling`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
export const getSingleProductBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/product/productSlug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

export const getProductsByLabel = async (label: string) => {
  const res = await fetch(`${apiBaseUrl}/product/labels/${label}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};




export type ProductFilter = {
  page?: number;
  limit?: number;
  brand?: string;
  category?: string;
  subCategory?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  dateFilter?: string;
  sort?: string;
};

export const getAllProducts = async ({
  page = 1,
  limit = 4,
  brand,
  category,
  subCategory,
  color,
  size,
  minPrice,
  maxPrice,
  dateFilter,
  sort,
}: ProductFilter = {}) => {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (brand) params.set("brand", brand);
  if (category) params.set("category", category);
  if (subCategory) params.set("subCategory", subCategory);
  if (color) params.set("color", color);
  if (size) params.set("size", size);

  if (minPrice !== undefined) {
    params.set("minPrice", minPrice.toString());
  }

  if (maxPrice !== undefined) {
    params.set("maxPrice", maxPrice.toString());
  }

  if (dateFilter) params.set("dateFilter", dateFilter);
  if (sort) params.set("sort", sort);

  const res = await fetch(`${apiBaseUrl}/product?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};