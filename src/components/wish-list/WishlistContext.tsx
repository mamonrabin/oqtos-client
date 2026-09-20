/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCurrentUser } from "@/components/auth/AuthContext";
import { getWishlistByUser } from "@/services/wishlist.api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WishlistContextType = {
  wishlist: any[];
  loading: boolean;
  setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
  refreshWishlist: () => Promise<void>;
  addWishlist: (product: any) => void;
  removeWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const currentUser = useCurrentUser();
  const user = currentUser?.user;

  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshWishlist = async () => {
    if (!user?._id) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await getWishlistByUser(user._id);

      setWishlist(response?.data?.productRef || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      refreshWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user?._id]);

  const addWishlist = (product: any) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some(
        (item) => item._id === product._id
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        setWishlist,
        refreshWishlist,
        addWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};