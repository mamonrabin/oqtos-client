import { apiBaseUrl } from "@/config";
import { TBrand } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface BrandProps {
  brandItem: TBrand;
}

const BrandCard2: React.FC<BrandProps> = ({ brandItem }) => {
  return (
    <Link
      href={`/product?brand=${brandItem.slug}`}
      className="group block text-center"
    >
      {/* Logo */}
      <div
        className="
          relative mx-auto
          aspect-square
          w-full
          overflow-hidden
          rounded-full
          bg-[#f7f8f9]
          p-6
          transition-all duration-500
          group-hover:bg-primary/5
          group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
          md:p-8
        "
      >
        {/* Soft background shape */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-0 w-0
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-primary/10
            transition-all duration-500
            group-hover:h-full
            group-hover:w-full
          "
        />

        {/* Logo */}
        <div className="relative h-full w-full">
          <Image
            src={`${apiBaseUrl}${brandItem.image}`}
            alt={brandItem.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 20vw, 140px"
            className="
              object-contain
              transition-all duration-500 ease-out
              group-hover:scale-110
            "
          />
        </div>
      </div>

      {/* Brand Info */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <h3
          className="
            max-w-[130px]
            truncate
            text-sm font-semibold
            text-gray-800
            transition-colors duration-300
            group-hover:text-primary
          "
        >
          {brandItem.title}
        </h3>

        <ArrowRight
          size={14}
          className="
            shrink-0
            text-gray-400
            opacity-0
            -translate-x-2
            transition-all duration-300
            group-hover:translate-x-0
            group-hover:text-primary
            group-hover:opacity-100
          "
        />
      </div>

      {/* Small indicator */}
      <div
        className="
          mx-auto mt-1.5
          h-0.5 w-0
          rounded-full
          bg-primary
          transition-all duration-300
          group-hover:w-6
        "
      />
    </Link>
  );
};

export default BrandCard2;