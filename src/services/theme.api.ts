import { apiBaseUrl } from "@/config";

export const getTheme = async (status: string) => {
  const res = await fetch(`${apiBaseUrl}/theme/${status}`);

  if (!res.ok) {
    throw new Error("Failed to fetch theme");
  }

  return res.json();
};