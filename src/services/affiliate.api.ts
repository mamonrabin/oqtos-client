import { apiBaseUrl } from "@/config";

export const getAffiliate = async () => {
  const res = await fetch(`${apiBaseUrl}/affiliate/active`);

  if (!res.ok) {
    throw new Error("Failed to fetch affiliate");
  }

  return res.json();
};