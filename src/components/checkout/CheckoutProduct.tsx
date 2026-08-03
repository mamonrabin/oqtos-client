import { apiBaseUrl } from "@/config";
import { TCartItem } from "@/types";
import { RotateCcw, ShieldCheck, Van } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CheckoutProductProps {
  cart: TCartItem[] | undefined;
  totalPrice: number | undefined;
}

const CheckoutProduct: React.FC<CheckoutProductProps> = ({
  cart,
  totalPrice,
}) => {
  console.log(cart, totalPrice, "cart and totalPrice");

  return (
    <div className="bg-white rounded shadow-xs border border-[#262626]/15 overflow-hidden">
      <div className="bg-[#F9FAFB] font-medium text-sm px-4 py-3 border-b flex items-center justify-between">
        <p className="">Order Summary</p>
        <Link href="/cart">
        <p className="underline hover:text-primary cursor-pointer duration-300">
          Modify
        </p>
        </Link>
      </div>

      <div className="p-4">
        {cart?.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 border-b py-4 last:border-transparent last:mb-0"
          >
            <Image
              src={apiBaseUrl + item.product.image}
              alt={item.product.name}
              width={100}
              height={100}
              unoptimized
              className="object-cover rounded w-16 h-16"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between text-sm mb-1">
                <p className="font-medium text-gray-800 line-clamp-1">
                  {item.product?.name?.slice(0, 30)}...
                </p>
                <div className="inline-flex flex-col items-end">
                  <span className="line-through text-xs text-gray-400">
                    ৳{item.product.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Size: {item.size}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Color: {item.color}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Qty: {item.quantity}</span>
                </div>
                <div>
                  <span className="font-semibold text-sm text-primary">
                    ৳{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t flex flex-col text-sm text-gray-600 gap-2 p-4">
        <p className="flex items-center justify-between">
          <span className="">Subtotal:</span> ৳{totalPrice?.toFixed(2)}
        </p>
        <p className="flex items-center justify-between">
          <span className="">Shipping (Dhaka)</span> ৳ 60
        </p>
        <p className="flex items-center justify-between">
          <span className="">Coupon Discount</span> ৳ 00
        </p>

        <p className="flex items-center justify-between border-t pt-4 font-semibold text-gray-800">
          <span className="">Total:</span> ৳ {totalPrice ? (totalPrice + 60).toFixed(2) : '0.00'}
        </p>

        <p className="flex items-center justify-center py-3 bg-primary/10 gap-2 xl:text-sm  text-xs text-primary mt-2">
           <Van size={16} /> Delivery <span className="font-medium">within 2-3 Days</span> after confirmation
        </p>
      </div>

      <div className="border-t flex items-center justify-center md:text-xs text-[10px] text-gray-600 gap-3 md:p-4 p-2">
        <p className="flex items-center gap-1"><ShieldCheck size={16} className="text-primary" /> Secure Payment</p>
        <p className="flex items-center gap-1"><RotateCcw size={16} className="text-primary" /> Easy Returns</p>
        <p className="flex items-center gap-1"><Van size={16} className="text-primary" /> Fast Delivery</p>
      </div>
    </div>
  );
};

export default CheckoutProduct;
