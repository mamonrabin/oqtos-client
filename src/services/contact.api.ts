import { apiBaseUrl } from "@/config";
import { TContact } from "@/types";

export const createContact = async (data: TContact) => {
  const res = await fetch(`${apiBaseUrl}/contact/create-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create contact");
  }

  return res.json();
};