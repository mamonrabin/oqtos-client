"use client";

import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types";
import { apiBaseUrl } from "@/config";

interface ProductCardProps {
  product: TProduct;
  isLoading: boolean;
}

const ProductCard2: React.FC<ProductCardProps> = ({
  product,
  isLoading,
}) => {
  const {
    title,
    price,
    mrpPrice,
    thumbnailImage,
    backviewImage,
    slug,
    label
  } = product;

  const hasSecondImage = Boolean(backviewImage);

  return (
    <div
      className="
        group cursor-pointer overflow-hidden rounded-xl
        border border-gray-100 bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-lg hover:shadow-primary/5
      "
    >
      {/* Product Image */}
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          {/* Main Image */}
          <Image
            src={`${apiBaseUrl}${thumbnailImage}`}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
            unoptimized
            className={`
              object-cover
              transition-all duration-500 ease-in-out
              ${
                hasSecondImage
                  ? "translate-x-0 opacity-100 group-hover:-translate-x-1/2 group-hover:opacity-0"
                  : "group-hover:scale-105"
              }
            `}
          />

          {/* Second Image */}
          {hasSecondImage && (
            <Image
              src={`${apiBaseUrl}${backviewImage}`}
              alt={`${title} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
              unoptimized
              className="
                absolute inset-0
                translate-x-1/2 opacity-0
                object-cover
                transition-all duration-500 ease-in-out
                group-hover:translate-x-0
                group-hover:opacity-100
              "
            />
          )}

          {/* Sale Badge */}
          {label && (
            <span
              className="
                absolute left-3 top-3 z-20
                rounded-full bg-primary md:block hidden
                px-2.5 py-1
                text-[10px] font-semibold uppercase
                tracking-wide text-white
                shadow-sm
              "
            >
              {label}
            </span>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="px-3 py-4 md:px-4">
        <Link href={`/product/${slug}`}>
          <h2
            className="
              line-clamp-2 min-h-[40px]
              text-center text-sm font-medium
              capitalize leading-5 text-gray-800
              transition-colors duration-300
              group-hover:text-primary
            "
          >
            {title}
          </h2>
        </Link>

        {/* Price */}
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <span className="text-base font-bold text-gray-900">
            TK.{price}
          </span>

          {mrpPrice && mrpPrice > price && (
            <span className="text-xs font-medium text-gray-400 line-through">
              TK.{mrpPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;