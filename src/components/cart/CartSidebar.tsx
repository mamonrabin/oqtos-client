"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { apiBaseUrl } from "@/config";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CartSidebar = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = cart?.reduce(
    (total, item) => total + item?.product.price * item.quantity,
    0,
  );

  const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-blue-600 relative">
        <ShoppingCart size={20} />
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </SheetTrigger>
      <SheetContent className="!w-full !max-w-full sm:!max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-2xl font-bold">Shopping Cart</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            {cart?.length === 0
              ? "Your cart is empty"
              : `You have ${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">
                Start shopping to add items here
              </p>
            </div>
          ) : (
            cart?.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 py-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={apiBaseUrl + item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm w-50 font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1,
                            item.color,
                            item.size,
                          )
                        }
                        className="p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
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
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item?.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item?.product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart?.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href="/cart" className="flex-1">
                  <button 
                  onClick={() => setOpen(false)}
                  className="w-full py-3 px-4 cursor-pointer border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    View Cart
                  </button>
                </Link>
                <Link href="/checkout" className="flex-1">
                  <button 
                  onClick={() => setOpen(false)}
                  className="w-full py-3 px-4 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm">
                    Checkout →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
