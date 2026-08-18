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

const BlogCard2: React.FC<BlogProps> = ({ blog, isLoading }) => {
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

  const truncateContent = (content: string, maxLength = 110) => {
    const plainText = content.replace(/<[^>]*>/g, "");

    return plainText.length <= maxLength
      ? plainText
      : `${plainText.slice(0, maxLength)}...`;
  };

  return (
    <article
      className="
        group overflow-hidden rounded-2xl
        border border-gray-100 bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg hover:shadow-gray-200/50
      "
    >
      {/* Image */}
      <Link
        href={`/blog/${blog.slug}`}
        className="
          relative block aspect-[16/10]
          overflow-hidden bg-gray-100
        "
      >
        <Image
          src={
            blog.image
              ? `${apiBaseUrl}${blog.image}`
              : "/placeholder-image.webp"
          }
          alt={blog.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-105
          "
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Tag */}
        {blog.tags?.[0] && (
          <span
            className="
              absolute left-4 top-4
              rounded-full bg-white/95
              px-3 py-1.5
              text-[10px] font-semibold
              uppercase tracking-wider
              text-gray-800
              shadow-sm
            "
          >
            #{blog.tags[0]}
          </span>
        )}

        {/* Floating Date */}
        <div
          className="
            absolute bottom-3 left-3
            flex items-center gap-1.5
            rounded-lg
            bg-white/95
            px-2.5 py-1.5
            text-[10px] font-medium
            text-gray-600
            shadow-sm
            backdrop-blur-sm
          "
        >
          <Calendar size={12} />
          {formatDate(blog.createdAt)}
        </div>

        {/* Arrow */}
        <div
          className="
            absolute bottom-3 right-3
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-white
            text-gray-700
            shadow-md
            transition-all duration-300
            group-hover:bg-primary
            group-hover:text-white
            group-hover:rotate-45
          "
        >
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 md:p-5">
        <Link href={`/blog/${blog.slug}`}>
          <h2
            className="
              line-clamp-2
              text-base font-bold
              leading-snug text-gray-900
              transition-colors duration-300
              group-hover:text-primary
              md:text-lg
            "
          >
            {blog.title}
          </h2>
        </Link>

        <p
          className="
            mt-2.5 line-clamp-2
            text-sm leading-6 text-gray-500
          "
        >
          {blog.cardDescription ||
            truncateContent(blog.content)}
        </p>

        {/* Bottom */}
        <Link
          href={`/blog/${blog.slug}`}
          className="
            mt-4 inline-flex
            items-center gap-1.5
            text-xs font-semibold
            text-gray-700
            transition-colors duration-300
            hover:text-primary
          "
        >
          Read article
          <ArrowUpRight
            size={14}
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard2;