import { apiBaseUrl } from "@/config";

export const getAbout = async () => {
  const res = await fetch(`${apiBaseUrl}/about/active`);

  if (!res.ok) {
    throw new Error("Failed to fetch about");
  }

  return res.json();
};