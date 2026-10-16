
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  GitCompareArrows,
} from "lucide-react";
import { apiBaseUrl } from "@/config";
import ViewProduct from "./ViewProduct";
import { TProduct } from "@/types";
import AddToWishlist from "./AddToWishlist";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

type ProductCardProps = {
  product: TProduct;
  isLoading?: boolean;
};

export default function ProductCard3({
  product,
  isLoading = false,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <article className="overflow-hidden rounded-[24px] border border-gray-200 bg-white p-1">
        <div className="aspect-[4/4.5] animate-pulse rounded-[20px] bg-gray-100" />
        <div className="space-y-3 rounded-[20px] bg-gray-100 p-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      </article>
    );
  }

  const {
    title,
    slug,
    thumbnailImage,
    price,
    mrpPrice,
    soldQuantity,
    label,
    stock_status,
  } = product;

  const isOutOfStock = stock_status === "out_of_stock";

  const formatPrice = (value: number) =>
    `৳ ${value.toLocaleString("en-BD", {
      maximumFractionDigits: 2,
    })}`;

  const discount =
    mrpPrice > price
      ? Math.round(((mrpPrice - price) / mrpPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart({
      product: {
        _id: product._id,
        name: product.title,
        slug: product.slug,
        image: product.thumbnailImage,
        price: product.price,
      },
      quantity: 1,
    });

    toast.success("Product added to cart successfully!");
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#eeeeef] bg-white p-1 transition-shadow duration-300 hover:shadow-md">
      {/* Product Image */}
      <Link
        href={`/product/${slug}`}
        className="relative block aspect-[4/4.5] shrink-0 overflow-hidden rounded-t-[20px] bg-white"
      >
        <Image
          src={apiBaseUrl + thumbnailImage}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        {/* Product Label */}
        {label && (
          <span className="absolute right-2 top-2 z-10 inline-flex max-w-[85%] items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">
            <TrendingUp size={12} />
            <span className="truncate">{label}</span>
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
            -{discount}%
          </span>
        )}

        {/* Out of Stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
            <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Content */}
      <div className="relative z-10 -mt-1 flex flex-1 flex-col rounded-tl-[22px] rounded-bl-[22px] rounded-br-[22px] bg-[#EFF1F3] px-3 pb-3 pt-4">
        {/* Smooth Connected Curved Panel */}
        <div className="absolute -top-[45px] right-0 flex h-[45px] w-[100px] items-center justify-center gap-2.5 rounded-tl-[28px] bg-[#EFF1F3] px-2 pt-1.5">
          {/* Smooth Left Curve */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[24px] bottom-0 h-6 w-6 rounded-br-[24px] shadow-[6px_6px_0_6px_#EFF1F3]"
          />

          {/* Wishlist - No Nested Button */}
          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <AddToWishlist
              product={product}
              style="w-8! h-8! shadow-none! rounded-full hover:text-primary!"
            />
          </div>

          {/* Compare */}
          <button
            type="button"
            aria-label="Compare product"
            className="relative z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#262626] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-primary"
          >
            <GitCompareArrows size={16} strokeWidth={1.8} />
          </button>
        </div>

        {/* Product Title */}
        <h3 className="mb-1 min-h-[21px] line-clamp-1 text-[13px] font-semibold leading-5 text-[#34445d]">
          <Link
            href={`/product/${slug}`}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </h3>

        {/* Price + Sold Quantity */}
        <div className="mb-3 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="whitespace-nowrap text-[16px] font-extrabold tracking-tight text-[#111827] sm:text-[17px]">
            {formatPrice(price)}
          </span>

          {mrpPrice > price && (
            <span className="whitespace-nowrap text-[11px] text-[#94a3b8] line-through">
              {formatPrice(mrpPrice)}
            </span>
          )}

          {soldQuantity !== undefined && (
            <span className="ml-auto whitespace-nowrap text-[10px] text-[#94a3b8] sm:text-[11px]">
              {soldQuantity} sold
            </span>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto flex items-center gap-1.5">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex h-[46px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[15px] border border-gray-300 bg-white px-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
              isOutOfStock
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-primary hover:border-primary hover:bg-primary hover:text-white"
            }`}
          >
            <ShoppingBag size={16} strokeWidth={1.8} />
            <span className="truncate">
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>

          {/* Quick View */}
          <div className="group/quick relative flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[15px] border border-gray-300 bg-white text-[#262626] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary">
            <ViewProduct
              product={product}
              className="rounded-[15px] shadow-none!"
              iconStyle="group-hover/quick:text-primary!"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
