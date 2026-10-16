// import { apiBaseUrl } from "@/config";

// export const getAllCategory = async () => {
//   const res = await fetch(`${apiBaseUrl}/category/all`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch logo");
//   }

//   return res.json();
// };



import { apiBaseUrl } from "@/config";

export const getAllCategory = async () => {
  const res = await fetch(`${apiBaseUrl}/category/all`, {
    next: {
      revalidate: 300,
      tags: ["categories"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};
