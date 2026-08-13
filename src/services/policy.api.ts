import { apiBaseUrl } from "@/config";

export const getPolicyByType = async (type: string) => {
  const res = await fetch(`${apiBaseUrl}/policy/type?type=${type}`);

  if (!res.ok) {
    throw new Error("Failed to fetch policy");
  }

  return res.json();
};
