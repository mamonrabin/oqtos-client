/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CheckoutForm from "./CheckoutForm";
import CheckoutProduct from "./CheckoutProduct";
import { useCartStore } from "@/store/cartStore";
import OrderSummaryToggle from "./OrderSummaryToggle";
import { useState } from "react";

const Checkout = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const cart = useCartStore((state) => state.cart);
  const subTottalPrice = cart?.reduce(
    (total, item) => total + item?.product.price * item.quantity,
    0,
  );

  const shippingCost =
    selectedCity.toLowerCase() === "dhaka" ? 60 : selectedCity ? 120 : 0;

  const discount = 0;
  const totalPrice = subTottalPrice + shippingCost - discount;

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <OrderSummaryToggle
        cart={cart as any}
        totalPrice={totalPrice}
        subTottalPrice={subTottalPrice}
        shippingCost={shippingCost}
        discount={discount}
      />
      <div className="flex-3">
        <CheckoutForm
          cart={cart as any}
          onCityChange={setSelectedCity}
          subTottalPrice={subTottalPrice}
          shippingCost={shippingCost}
          discount={discount}
          totalPrice={totalPrice}
        />
      </div>
      <div className="flex-2 self-start md:sticky top-2 hidden lg:block">
        <CheckoutProduct
          cart={cart as any}
          totalPrice={totalPrice}
          subTottalPrice={subTottalPrice}
          shippingCost={shippingCost}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default Checkout;
