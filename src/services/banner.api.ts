import { apiBaseUrl } from "@/config";

export const getAllBanner = async () => {
  const res = await fetch(`${apiBaseUrl}/banner/active`);

  if (!res.ok) {
    throw new Error("Failed to fetch logo");
  }

  return res.json();
};