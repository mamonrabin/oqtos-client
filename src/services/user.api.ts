import { apiBaseUrl } from "@/config";

export const updateUser = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    name?: string;
    email?: string;
    phone?: string;
  };
}) => {
  const response = await fetch(`${apiBaseUrl}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  return response.json();
};

export const updateAffiliateUser = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    affiliateCoupon?: string;
    affiliateStatus?: string;
    affiliateLink?: string[];
  };
}) => {
  const response = await fetch(`${apiBaseUrl}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  return response.json();
};