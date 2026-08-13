import BlogCard from "@/components/Blog/BlogCard";
import { getAllBlog } from "@/services/blog.api";
import { TBlog } from "@/types";
import { BookOpen } from "lucide-react";
import React from "react";

const page = async () => {
  const { data: blogList, isLoading } = await getAllBlog();

  // If blogs don't exist
  if (!blogList || blogList.length === 0) {
    return (
      <main className="min-h-[60vh] bg-gray-50/70">
        <div className="Container flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-xl font-semibold text-gray-900">
              No blogs found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no blog articles available.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/70">
      {/* ========================================
          HEADER
      ======================================== */}
      <section className="border-b bg-white">
        <div className="Container py-10 sm:py-14">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>

            {/* Title */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Our Blog
              </p>

              <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Latest Articles
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px]">
            Discover the latest news, helpful tips, product guides, trends, and
            insights from our team.
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />

              <span>
                {blogList.length}{" "}
                {blogList.length === 1 ? "Article" : "Articles"}
              </span>
            </div>

            <span className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>Latest Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          BLOG CONTENT
      ======================================== */}
      <section className="Container">
        <div className="py-10 sm:py-14">
          {/* Section Header */}
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Explore
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                All Articles
              </h2>
            </div>

            <p className="hidden text-sm text-gray-500 sm:block">
              {blogList.length} articles available
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogList.map((blog: TBlog) => (
              <BlogCard key={blog._id} blog={blog} isLoading={isLoading} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
