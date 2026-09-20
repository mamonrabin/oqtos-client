"use client";

import { apiBaseUrl } from "@/config";
import { deleteSingleWishlist } from "@/services/wishlist.api";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "./WishlistContext";

const WishList = () => {
  const { wishlist, loading, setWishlist } = useWishlist();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemoveWishlist = async (productId: string) => {
    try {
      setDeletingId(productId);

      await deleteSingleWishlist(productId);

      // Update shared wishlist state immediately
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Failed to remove wishlist:", error);
      toast.error("Failed to remove from wishlist");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 h-8 w-40 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[3/4] rounded-xl bg-gray-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#087096]/10">
          <Heart className="h-9 w-9 text-[#087096]" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-gray-900">
          Your wishlist is empty
        </h2>

        <p className="mt-2 max-w-md text-sm text-gray-500">
          Save your favorite products here and come back to them anytime.
        </p>

        <Link
          href="/product"
          className="mt-6 rounded-lg bg-[#087096] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#075d7c]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 fill-[#087096] text-[#087096]" />

            <h1 className="text-2xl font-semibold text-gray-900">
              My Wishlist
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlist.map((product) => (
          <div key={product._id} className="group">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
              {product.thumbnailImage ? (
                <Image
                  src={apiBaseUrl + product.thumbnailImage}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}

              {/* Remove Wishlist */}
              <button
                type="button"
                onClick={() => handleRemoveWishlist(product._id)}
                disabled={deletingId === product._id}
                aria-label="Remove from wishlist"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2
                  className={`h-4 w-4 ${
                    deletingId === product._id
                      ? "animate-pulse text-red-500"
                      : "text-gray-600 transition group-hover:text-red-500"
                  }`}
                />
              </button>

              {/* View Details */}
              <Link
                href={`/product/${product.slug}`}
                className="absolute bottom-3 left-3 right-3"
              >
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white/95 py-2.5 text-sm font-medium text-gray-900 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
                  <ShoppingBag className="h-4 w-4" />
                  View Details
                </div>
              </Link>
            </div>

            {/* Product Info */}
            <div className="pt-3">
              <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${
                        index < Math.round(product.averageRating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-gray-400">
                  ({product.totalReviews || 0})
                </span>
              </div>

              {/* Price */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-semibold text-[#087096]">
                  ৳{product.price}
                </span>

                {product.mrpPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    ৳{product.mrpPrice}
                  </span>
                )}
              </div>

              {/* Stock */}
              {product.stock_status !== "in_stock" && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  Out of stock
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WishList;