import { TBlog } from "@/types";
import { apiBaseUrl } from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import BlogCardSkeleton from "./BlogCardSkeleton";

interface BlogProps {
  blog: TBlog;
  isLoading: boolean;
}

const BlogCard: React.FC<BlogProps> = ({ blog, isLoading }) => {
  if (isLoading) {
    return <BlogCardSkeleton />;
  }

  if (!blog) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateContent = (
    content: string,
    maxLength = 120
  ) => {
    const plainText = content.replace(/<[^>]*>/g, "");

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return `${plainText.slice(0, maxLength)}...`;
  };

  return (
    <article className="group border p-4 rounded">
      {/* Image */}
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden rounded bg-gray-100"
      >
        <Image
          src={
            blog.image
              ? `${apiBaseUrl}${blog.image}`
              : "/placeholder-image.webp"
          }
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />

        {/* Tag */}
        {blog.tags?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm">
            #{blog.tags[0]}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="pt-5">
        {/* Date */}
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`}>
          <h2 className="line-clamp-2 md:text-lg text-base font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-primary">
            {blog.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
          {blog.cardDescription ||
            truncateContent(blog.content)}
        </p>

        {/* Read More */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors hover:text-[#087096]"
        >
          Read article
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;