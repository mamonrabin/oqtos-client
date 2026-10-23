
import { apiBaseUrl } from "@/config";

export const getActiveAffiliate = async () => {
  const res = await fetch(`${apiBaseUrl}/affiliate/active`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch active affiliate");
  }

  return res.json();
};
