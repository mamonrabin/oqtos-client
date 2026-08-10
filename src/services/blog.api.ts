import { apiBaseUrl } from "@/config";

export const getAllBlog = async () => {
  const res = await fetch(`${apiBaseUrl}/blog/published`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};

export const getSingleBlogBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/blog/blogSlug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};