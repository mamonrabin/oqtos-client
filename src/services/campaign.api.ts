import { apiBaseUrl } from "@/config";

export const getflasSellProducts = async () => {
  const res = await fetch(`${apiBaseUrl}/campaign/flash-sale`);

  if (!res.ok) {
    throw new Error("Failed to fetch flash sale");
  }

  return res.json();
};