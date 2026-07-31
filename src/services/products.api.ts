import { apiBaseUrl } from "@/config";

export const getNewArrivalProducts = async () => {
  const res = await fetch(`${apiBaseUrl}/product/new-products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};