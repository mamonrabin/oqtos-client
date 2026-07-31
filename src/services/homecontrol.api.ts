import { apiBaseUrl } from "@/config";

export const getHomeControl = async () => {
  const res = await fetch(`${apiBaseUrl}/home`);

  if (!res.ok) {
    throw new Error("Failed to fetch home control");
  }

  return res.json();
};