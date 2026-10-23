import { apiBaseUrl } from "@/config";

export const getLogoAndFooter = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/logo`, {
      next: {
        revalidate: 300,
        tags: ["logo-footer"],
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch logo: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Logo API Error:", error);

    return { data: [] };
  }
};