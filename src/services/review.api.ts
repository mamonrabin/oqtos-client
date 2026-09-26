
import { apiBaseUrl } from "@/config";



export const createReview = async (data: FormData) => {
  const res = await fetch(`${apiBaseUrl}/review/create-review`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  return res.json();
};




export const getAllReviews = async () => {
  const res = await fetch(`${apiBaseUrl}/review`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};