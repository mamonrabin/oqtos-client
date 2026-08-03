/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CheckoutForm from "./CheckoutForm";
import CheckoutProduct from "./CheckoutProduct";
import { useCartStore } from "@/store/cartStore";
import OrderSummaryToggle from "./OrderSummaryToggle";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = cart?.reduce(
    (total, item) => total + item?.product.price * item.quantity,
    0,
  );
  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <OrderSummaryToggle cart={cart as any} totalPrice={totalPrice} />
      <div className="flex-3">
        <CheckoutForm />
      </div>
      <div className="flex-2 self-start md:sticky top-2 hidden lg:block">
        <CheckoutProduct cart={cart as any} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Checkout;
