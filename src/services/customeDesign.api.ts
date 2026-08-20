import { apiBaseUrl } from "@/config";

export const getCustomeDesign = async () => {
  const res = await fetch(`${apiBaseUrl}/custome`);

  if (!res.ok) {
    throw new Error("Failed to fetch custome design");
  }

  return res.json();
};