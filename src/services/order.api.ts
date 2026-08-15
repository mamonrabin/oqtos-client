/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiBaseUrl } from "@/config";

export const createOrder = async (order:any) => {
  try {
    const res = await fetch(`${apiBaseUrl}/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error(`Create order failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};


export const getSingleOrder = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/order/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
};


export const getAllOrder = async () => {
  const res = await fetch(`${apiBaseUrl}/order`);

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
};


export const getSingleOrderByID = async (id: string) => {
  const res = await fetch(`${apiBaseUrl}/order/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
};