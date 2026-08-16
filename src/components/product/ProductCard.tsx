/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { TProduct } from "@/types";
import { toast } from "sonner";
import { apiBaseUrl } from "@/config";
import ViewProduct from "./ViewProduct";
import { useCartStore } from "@/store/cartStore";

interface productProps {
  product: TProduct;
  isLoading: boolean;
}

const ProductCard: React.FC<productProps> = ({ product, isLoading }) => {
  const { addToCart } = useCartStore();
  const {
    title,
    price,
    mrpPrice,
    thumbnailImage,
    backviewImage,
    label,
    slug,
    averageRating,
    totalReviews,
    availableQuantity,
  } = product;

  const [isHovered, setIsHovered] = useState(false);
  //   const [isCartLoading, setIsCartLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = async () => {
    addToCart({
      product: {
        _id: product._id,
        name: product.title,
        slug: product.slug,
        image: product.thumbnailImage, // change if your image field has a different name
        price: product.price,
      },
      quantity,
    });

    toast.success("Added to cart");
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-zinc-900 rounded shadow hover:shadow-md transition-shadow duration-500 overflow-hidden border border-gray-100 dark:border-zinc-800 hover:border-primary/30">
        {/* Image Container */}

        <div className="relative block overflow-hidden aspect-square bg-gray-50 dark:bg-zinc-800">
          <Link href={`/product/${slug}`} className="">
            <Image
              src={apiBaseUrl + thumbnailImage}
              alt={title}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
            />

            {/* Hover Image */}

            {backviewImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={apiBaseUrl + backviewImage}
                  alt={title}
                  width={500}
                  height={500}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </Link>
          {/* Label Badge */}
          {label && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-lg"
            >
              {label}
            </motion.span>
          )}

          {/* Quick Action Buttons */}
          {/* <div className="absolute right-3 top-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                }
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <ViewProduct product={product} />
            </motion.button>
          </div> */}

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 15, y: -15 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 15,
              y: isHovered ? 0 : -15,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-4 right-3 flex flex-col gap-2"
            style={{
              pointerEvents: isHovered ? "auto" : "none",
            }}
          >
            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleLike}
              className="
      flex h-9 w-9
      items-center justify-center
      rounded-full
      bg-white/95
      text-gray-700
      shadow-md
      backdrop-blur-sm
      transition-colors
      hover:bg-white
    "
              aria-label="Add to wishlist"
            >
              <Heart
                size={17}
                className={
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                }
              />
            </motion.button>

            {/* Quick View */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="
      flex h-9 w-9
      items-center justify-center
      rounded-full
      bg-white/95
      shadow-md
      backdrop-blur-sm
    "
            >
              <ViewProduct product={product} />
            </motion.div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* averageRating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < (averageRating || 4)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200 dark:fill-zinc-700 dark:text-zinc-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({totalReviews || 0})
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${slug}`}>
            <h3 className="min-h-[40px] sm:text-sm text-xs font-medium text-gray-800 dark:text-white hover:text-primary transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex md:flex-row flex-col md:items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="md:text-base text-sm font-bold text-primary">
                ৳ {price ?? "0"}
              </span>
              {mrpPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ৳ {mrpPrice?.toLocaleString() ?? "0"}
                </span>
              )}
            </div>
            {mrpPrice && price && (
              <span className="text-[10px] inline-flex font-semibold text-green-600 md:bg-green-50  px-2 py-0.5 rounded-full">
                {Math.round(((mrpPrice - price) / mrpPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Add to Cart Button (Alternative) */}
          {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full cursor-pointer bg-primary text-white py-2.5 rounded font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </motion.button> */}

          <motion.button
            whileHover={availableQuantity > 0 ? { scale: 1.02 } : undefined}
            whileTap={availableQuantity > 0 ? { scale: 0.98 } : undefined}
            onClick={handleAddToCart}
            disabled={availableQuantity === 0 || isLoading}
            className={`w-full py-2.5 rounded font-medium text-sm flex items-center justify-center gap-2 transition-shadow ${
              availableQuantity === 0
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-primary text-white cursor-pointer hover:shadow-lg"
            }`}
          >
            {availableQuantity === 0 ? (
              "Out of Stock"
            ) : isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-primary pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
