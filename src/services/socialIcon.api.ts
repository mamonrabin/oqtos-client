import { apiBaseUrl } from "@/config";

export const getAllSocilLink = async () => {
  const res = await fetch(`${apiBaseUrl}/socialIcon/active`);

  if (!res.ok) {
    throw new Error("Failed to fetch social link");
  }

  return res.json();
};