/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useCurrentUser } from "@/components/auth/AuthContext";
import {
  createWishlist,
  getWishlistByUser,
} from "@/services/wishlist.api";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

const LOCAL_WISHLIST_KEY = "guestWishlist";

type WishlistContextType = {
  wishlist: any[];
  loading: boolean;
  setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
  refreshWishlist: () => Promise<void>;
  addWishlist: (product: any) => void;
  removeWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
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

  // Track previous user
  const previousUserId = useRef<string | null>(null);

  // Get wishlist from localStorage
  const getGuestWishlist = () => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved = localStorage.getItem(LOCAL_WISHLIST_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to read guest wishlist:", error);
      return [];
    }
  };

  // Save wishlist to localStorage
  const saveGuestWishlist = (products: any[]) => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      LOCAL_WISHLIST_KEY,
      JSON.stringify(products),
    );
  };

  // Login / Logout / Initial load
  useEffect(() => {
    const handleWishlist = async () => {
      // =========================
      // LOGOUT
      // =========================
      if (!user?._id) {
        // Save current wishlist before clearing
        if (previousUserId.current) {
          saveGuestWishlist(wishlist);
        }

        // Load guest wishlist
        const guestWishlist = getGuestWishlist();

        setWishlist(guestWishlist);
        setLoading(false);

        previousUserId.current = null;

        return;
      }

      // =========================
      // LOGIN
      // =========================
      try {
        setLoading(true);

        const guestWishlist = getGuestWishlist();

        // Sync guest wishlist to backend
        if (guestWishlist.length > 0) {
          for (const product of guestWishlist) {
            try {
              await createWishlist({
                userRef: user._id,
                productRef: product._id,
              });
            } catch (error) {
              console.error(
                `Failed to sync wishlist product ${product._id}`,
                error,
              );
            }
          }

          localStorage.removeItem(LOCAL_WISHLIST_KEY);
        }

        // Get backend wishlist
        const response = await getWishlistByUser(user._id);

        setWishlist(response?.data?.productRef || []);

        previousUserId.current = user._id;
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    handleWishlist();
  }, [user?._id]);

  // Add wishlist
  const addWishlist = (product: any) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some(
        (item) => item._id === product._id,
      );

      if (alreadyExists) {
        return prev;
      }

      const updated = [...prev, product];

      // Guest → localStorage
      if (!user?._id) {
        saveGuestWishlist(updated);
      }

      return updated;
    });
  };

  // Remove wishlist
  const removeWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter(
        (item) => item._id !== productId,
      );

      // Guest → localStorage
      if (!user?._id) {
        saveGuestWishlist(updated);
      }

      return updated;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        setWishlist,
        refreshWishlist: async () => {
          if (!user?._id) {
            setWishlist(getGuestWishlist());
            return;
          }

          const response = await getWishlistByUser(user._id);

          setWishlist(response?.data?.productRef || []);
        },
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
      "useWishlist must be used inside WishlistProvider",
    );
  }

  return context;
};

