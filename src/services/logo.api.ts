import { apiBaseUrl } from "@/config";

export const getLogoAndFooter = async () => {
  const res = await fetch(`${apiBaseUrl}/logo`);

  if (!res.ok) {
    throw new Error("Failed to fetch logo");
  }

  return res.json();
};