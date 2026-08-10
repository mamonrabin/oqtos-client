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
