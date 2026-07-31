/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion} from "framer-motion";
import Link from "next/link";

import { TProduct } from "@/types";
import { toast } from "sonner";
import { apiBaseUrl } from "@/config";
import ViewProduct from "./ViewProduct";

interface productProps {
    product:TProduct
    isLoading:any
}

const ProductCard:React.FC<productProps> = ({ product,isLoading }) => {
  const { title, price, mrpPrice, thumbnailImage, backviewImage, label,_id, averageRating, totalReviews } = product;

  const [isHovered, setIsHovered] = useState(false);
//   const [isCartLoading, setIsCartLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    // if (isCartLoading) return;
    // setIsCartLoading(true);
    setTimeout(() => {
    //   setIsCartLoading(false);
      toast.success("Added to cart successfully!", {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: "8px",
        },
      });
    }, 1000);
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
          {/* Main Image */}
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
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <ViewProduct product={product} />
            </motion.button>
          </div>
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
          <Link href={`/product/${_id}`}>
            <h3 className="text-base font-medium text-gray-800 dark:text-white hover:text-primary transition-colors line-clamp-1 mb-1">
              {title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-primary">
              ৳ {price?.toLocaleString() ?? "0"}
            </span>
            {mrpPrice && (
              <span className="text-sm text-gray-400 line-through">
                ৳ {mrpPrice?.toLocaleString() ?? "0"}
              </span>
            )}
            {mrpPrice && price && (
              <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                {Math.round(((mrpPrice - price) / mrpPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Add to Cart Button (Alternative) */}
          <motion.button
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