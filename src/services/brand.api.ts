import { apiBaseUrl } from "@/config";

export const getAllBrand = async () => {
  const res = await fetch(`${apiBaseUrl}/brand/active`);

  if (!res.ok) {
    throw new Error("Failed to fetch brand");
  }

  return res.json();
};