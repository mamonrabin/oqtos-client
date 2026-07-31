import { apiBaseUrl } from "@/config";

export const getAllSubCategory = async () => {
  const res = await fetch(`${apiBaseUrl}/sub-category/all`);

  if (!res.ok) {
    throw new Error("Failed to fetch logo");
  }

  return res.json();
};