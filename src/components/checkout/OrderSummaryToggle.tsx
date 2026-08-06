"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TCartItem } from "@/types";
import CheckoutProduct from "./CheckoutProduct";

interface OrderSummaryToggleProps {
  cart: TCartItem[] | undefined;
  totalPrice: number | undefined;
  subTottalPrice: number | undefined;
  shippingCost: number | undefined;
  discount: number | undefined;
}

const OrderSummaryToggle: React.FC<OrderSummaryToggleProps> = ({
  cart,
  totalPrice,
  subTottalPrice,
  shippingCost,
  discount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full block lg:hidden">
      <div
        className="flex-1 bg-white border py-3 flex items-center justify-between px-4 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Order Summary</p>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <CheckoutProduct
          cart={cart}
          totalPrice={totalPrice}
          subTottalPrice={subTottalPrice}
          shippingCost={shippingCost}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default OrderSummaryToggle;
