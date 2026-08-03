"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartProduct {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  color?: string;
  size?: string;
}

const getProductId = (product: CartProduct) => product._id;

const getCartItemKey = (
  productId: string,
  color?: string,
  size?: string
) => `${productId}-${color ?? ""}-${size ?? ""}`;

interface CartState {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
  removeFromCart: (
    productId: string,
    color?: string,
    size?: string
  ) => void;

  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const dummyStorage = {
  getItem: (_: string) => null,
  setItem: (_: string, __: string) => {},
  removeItem: (_: string) => {},
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      setCart: (items) => set({ cart: items }),

      addToCart: (item) => {
        const targetKey = getCartItemKey(
          item.product._id,
          item.color,
          item.size
        );

        const cart = get().cart;

        const index = cart.findIndex(
          (cartItem) =>
            getCartItemKey(
              cartItem.product._id,
              cartItem.color,
              cartItem.size
            ) === targetKey
        );

        if (index !== -1) {
          const updated = [...cart];

          updated[index] = {
            ...updated[index],
            quantity: updated[index].quantity + item.quantity,
          };

          set({ cart: updated });
          return;
        }

        set({
          cart: [...cart, item],
        });
      },

      updateQuantity: (productId, quantity, color, size) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, color, size);
          return;
        }

        const targetKey = getCartItemKey(productId, color, size);

        set((state) => ({
          cart: state.cart.map((item) =>
            getCartItemKey(
              item.product._id,
              item.color,
              item.size
            ) === targetKey
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        }));
      },

      removeFromCart: (productId, color, size) => {
        if (!color && !size) {
          set((state) => ({
            cart: state.cart.filter(
              (item) => getProductId(item.product) !== productId
            ),
          }));

          return;
        }

        const targetKey = getCartItemKey(productId, color, size);

        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              getCartItemKey(
                item.product._id,
                item.color,
                item.size
              ) !== targetKey
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",

      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : dummyStorage
      ),

      // skipHydration: true,

      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

/* ---------------- SELECTORS ---------------- */

export const useCartItems = () =>
  useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

export const useCartTotal = () =>
  useCartStore((state) =>
    state.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

export const useProductCount = (productId: string) =>
  useCartStore((state) =>
    state.cart
      .filter((item) => item.product._id === productId)
      .reduce((sum, item) => sum + item.quantity, 0)
  );