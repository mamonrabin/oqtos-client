"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { TProduct } from "@/types";
import { useCurrentUser } from "../auth/AuthContext";
import { createWishlist } from "@/services/wishlist.api";
import { useWishlist } from "../wish-list/WishlistContext";

interface ProductProps {
  product: TProduct;
}

const AddToWishlist: React.FC<ProductProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const user = currentUser?.user;

  const { wishlist, addWishlist } = useWishlist();

  const isLiked = wishlist.some(
    (item) => item._id === product._id,
  );

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      return;
    }

    try {
      setLoading(true);

      // Guest user
      if (!user?._id) {
        addWishlist(product);

        toast.success("Added to wishlist", {
          duration: 2000,
          position: "bottom-right",
        });

        return;
      }

      // Logged-in user
      await createWishlist({
        userRef: user._id,
        productRef: product._id,
      });

      // Update shared context immediately
      addWishlist(product);

      toast.success("Added to wishlist", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add wishlist",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleLike}
      disabled={loading}
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
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      aria-label="Add to wishlist"
    >
      <Heart
        size={17}
        className={
          isLiked
            ? "fill-red-500 text-red-500"
            : "text-gray-700"
        }
      />
    </motion.button>
  );
};

export default AddToWishlist;