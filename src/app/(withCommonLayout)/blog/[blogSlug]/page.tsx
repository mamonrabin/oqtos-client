import BlogDetails from "@/components/Blog/BlogDetails";
import { getSingleBlogBySlug } from "@/services/blog.api";
import React from "react";

const page = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
  const { blogSlug } = await params;

  const { data } = await getSingleBlogBySlug(blogSlug);

  return (
    <div className="min-h-screen">
      <BlogDetails blog={data} />
    </div>
  );
};

export default page;
