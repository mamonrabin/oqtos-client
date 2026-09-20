/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiBaseUrl } from "@/config";


export const createWishlist = async (data: any) => {
  const res = await fetch(`${apiBaseUrl}/wishlist/create-wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create wishlist");
  }

  return res.json();
};

export const getWishlistByUser = async (userId: string) => {
  const res = await fetch(
    `${apiBaseUrl}/wishlist/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get wishlist");
  }

  return res.json();
};

export const deleteSingleWishlist = async (productId: string) => {
  const res = await fetch(`${apiBaseUrl}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to remove wishlist");
  }

  return res.json();
};

