"use client";

import { useCartStore } from "@/store/cartStore";
import { apiBaseUrl } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import React from "react";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = cart?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mt-1">
          Looks like you haven t added any items yet
        </p>
        <Link
          href="/shop"
          className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl Container  font-bold text-gray-800 mb-6">
        Shopping Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 Container ">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded shadow-xs border border-gray-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="divide-y divide-gray-100">
            {cart.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 items-center"
              >
                {/* Product Info */}
                <div className="col-span-6 flex gap-4">
                  <Image
                    src={apiBaseUrl + item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    unoptimized
                    className="object-cover rounded w-20 h-20 bg-gray-50"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        Size: {item.size}
                      </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        Color: {item.color}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs mt-2 w-fit transition-colors"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-sm font-medium text-gray-700">
                  ৳{item.product.price}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity - 1,
                          item.color,
                          item.size,
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} className="text-gray-600" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-700 min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1,
                          item.color,
                          item.size,
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right font-semibold text-primary text-sm">
                  ৳{item.product.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 w-full">
          <div className="bg-white rounded shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 className="text font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-gray-800 text-base">
                  <span>Total</span>
                  <span className="text-primary">৳{totalPrice}</span>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <button className="w-full mt-6 bg-primary text-white py-3 rounded font-medium hover:bg-primary/90 transition-colors">
                Proceed to Checkout
              </button>
            </Link>

            <Link href="/shop">
              <button className="w-full mt-2 text-primary hover:underline text-sm transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
