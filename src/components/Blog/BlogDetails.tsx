"use client";

import { TBlog } from "@/types";
import { apiBaseUrl } from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
} from "lucide-react";

interface BlogProps {
  blog: TBlog;
}

const BlogDetails: React.FC<BlogProps> = ({ blog }) => {
  if (!blog) return null;

  // -----------------------------
  // Format Date
  // -----------------------------
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // -----------------------------
  // Calculate Reading Time
  // -----------------------------
  const getReadingTime = (content: string) => {
    const plainText = content
      ?.replace(/<[^>]*>/g, "")
      .trim();

    if (!plainText) return 1;

    const words = plainText.split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));
  };

  const readingTime = getReadingTime(blog.content);

  return (
    <main className="bg-white">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="border-b border-gray-100">
        <div className="Container py-8 sm:py-10 md:py-12">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#087096]"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span>Back to Blogs</span>
          </Link>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {blog.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-[#087096]/10 px-3 py-1.5 text-xs font-medium text-[#087096]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mt-5 max-w-4xl md:text-3xl text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl  lg:text-[52px]">
            {blog.title}
          </h1>

          {/* Card Description */}
          {blog.cardDescription && (
            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-500 sm:text-lg">
              {blog.cardDescription}
            </p>
          )}

          {/* Meta Information */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar
                size={16}
                className="text-[#087096]"
              />

              <span>{formatDate(blog.createdAt)}</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

            <div className="flex items-center gap-2">
              <Clock
                size={16}
                className="text-[#087096]"
              />

              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED IMAGE
      ====================================================== */}
      <section className="Container pt-8 sm:pt-10 md:pt-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded bg-gray-100">
            <Image
              src={
                blog.image
                  ? `${apiBaseUrl}${blog.image}`
                  : "/placeholder-image.webp"
              }
              alt={blog.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE CONTENT
      ====================================================== */}
      <section className="Container py-10 sm:py-12 md:py-16">
        <div className="mx-auto text-sm text-gray-500">
          <article
            className="
             
            "
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />

          {/* =================================================
              ADDITIONAL BLOG IMAGES
          ================================================== */}
          {blog.images?.length > 0 && (
            <div className="mt-10 sm:mt-12">
              <div className="grid  gap-5 grid-cols-3">
                {blog.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded bg-gray-100"
                  >
                    <Image
                      src={`${apiBaseUrl}${image}`}
                      alt={`${blog.title} - image ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              BOTTOM ACTION
          ================================================== */}
          <div className="mt-12 flex flex-col gap-6 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <button
              type="button"
              onClick={async () => {
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: blog.title,
                      text: blog.cardDescription,
                      url: window.location.href,
                    });
                  } else {
                    await navigator.clipboard.writeText(
                      window.location.href
                    );
                  }
                } catch (error) {
                  console.log("Share cancelled", error);
                }
              }}
              className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#087096]"
            >
              <Share2
                size={17}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Share article</span>

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          BACK TO BLOGS
      ====================================================== */}
      <section className="border-t border-gray-100">
        <div className="Container py-8">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#087096]"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span>Back to all blogs</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;