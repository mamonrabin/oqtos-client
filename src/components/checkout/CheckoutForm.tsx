/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { districtList } from "@/utils/allDistict";
import {
  MapPin,
  User,
  CreditCard,
  Truck,
  Shield,
  Gift,
  Lock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentMethods from "./PaymentMethods";
import { useForm, Controller } from "react-hook-form";
import { TCartItem } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../auth/AuthContext";
import { createOrder } from "@/services/order.api";

type CheckoutFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  altPhone: string;
  deliveryNote: string;
  couponCode: string;
  paymentMethod: string;
  termsAccepted: boolean;
};

interface CheckoutFormProps {
  cart: TCartItem[] | undefined;
  subTottalPrice: number | undefined;
  shippingCost: number | undefined;
  discount: number | undefined;
  totalPrice: number | undefined;
  onCityChange: (city: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cart,
  subTottalPrice,
  shippingCost,
  discount,
  totalPrice,
  onCityChange,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      paymentMethod: "COD",
      termsAccepted: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentUser = useCurrentUser();

  console.log("currwnt user", currentUser);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!cart || cart.length === 0) {
      toast.warning("Cart is empty. Please add items before checkout.");
      return;
    }

    if (!currentUser?.user?._id) {
      toast.warning("Please sign in to place your order.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const order = {
        userRef: currentUser.user._id,

        subTotalPrice: subTottalPrice ?? 0,
        shippingCost: shippingCost ?? 0,
        discount: discount ?? 0,
        totalPrice: totalPrice ?? 0,

        shippingAddress: {
          name: data.name,
          phone: data.phone,
          city: data.city,
          address: data.address,
        },

        products: cart.map((item) => ({
          productRef: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          color: item.color,
          size: item.size,
        })),

        paymentMethod: data.paymentMethod,
        couponCode: data.couponCode,
        deliveryNote: data.deliveryNote,
        altPhone: data.altPhone,
      };

      const res = await createOrder(order);

      if (data.paymentMethod === "CARD") {
        const paymentUrl = res?.data?.paymentUrl;

        if (paymentUrl) {
          window.open(paymentUrl, "_blank", "noopener,noreferrer");
          return;
        }

        toast.error("Payment URL not found.");
        return;
      }

      console.log("----------order--------", order);

      toast.success(res?.message || "Your order has been placed successfully!");

      // Optional
      // reset();
      // clearCart();
      // router.replace("/order-success");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to place order.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow-xs border border-[#262626]/15 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="md:p-8 py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="md:text-2xl text-xl font-bold text-gray-900">
              Checkout
            </h1>
            <p className="md:text-sm text-xs text-gray-500 mt-1">
              Complete your order details below
            </p>
          </div>
          <div className="md:flex hidden items-center gap-2 bg-gray-100 md:px-4 px-2 py-2 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User size={18} className="text-primary" />
            </div>
            <h2 className="md:text-lg text-base font-semibold text-gray-900">
              Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Full name is required",
                })}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:ring-1 focus:ring-primary focus:border-transparent"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Please enter a valid Bangladeshi phone number",
                  },
                })}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-all ${
                  errors.phone
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:ring-1 focus:ring-primary focus:border-transparent"
                }`}
                placeholder="01XXX-XXXXXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:ring-1 focus:ring-primary focus:border-transparent"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin size={18} className="text-purple-600" />
            </div>
            <h2 className="md:text-lg text-base font-semibold text-gray-900">
              Shipping Address
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Detailed Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("address", {
                  required: "Detailed address is required",
                })}
                className={`w-full px-4 py-3 border rounded text-sm outline-none transition-all ${
                  errors.address
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:ring-1 focus:ring-primary focus:border-transparent"
                }`}
                placeholder="House No, Road No, Area"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                City / District <span className="text-red-500">*</span>
              </label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "Please select a district" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (!value) return;

                      field.onChange(value);
                      onCityChange(value);
                    }}
                  >
                    <SelectTrigger
                      className={`w-full px-4 py-3 !h-[45px] border rounded text-sm outline-none transition-all ${
                        errors.city
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:ring-1 focus:ring-primary focus:border-transparent"
                      }`}
                    >
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent className="!rounded border-gray-200 w-full">
                      {districtList.map((district) => (
                        <SelectItem
                          className="!rounded-[1px]"
                          key={district}
                          value={district}
                        >
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Alt. Phone
              </label>
              <input
                type="text"
                {...register("altPhone")}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                placeholder="01XXX-XXXXXX (optional)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Delivery Note
              </label>
              <textarea
                {...register("deliveryNote")}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Special instructions (Optional)..."
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={16} className="text-amber-600" />
            <span className="text-sm font-medium text-gray-700">
              Have a coupon code?
            </span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              {...register("couponCode")}
              className="flex-1 px-4 py-3 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter coupon code"
            />
            <button
              type="button"
              className="px-6 py-3 bg-primary text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard size={18} className="text-green-600" />
            </div>
            <h2 className="md:text-lg text-base font-semibold text-gray-900">
              Payment Method
            </h2>
          </div>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Please select a payment method" }}
            render={({ field }) => (
              <PaymentMethods
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4 rounded border border-gray-100">
            <input
              type="checkbox"
              id="condition"
              {...register("termsAccepted", {
                required: "You must accept the terms and conditions",
              })}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="condition"
              className="text-sm text-gray-600 leading-relaxed"
            >
              I agree to the{" "}
              <span className="font-medium text-gray-800 hover:text-primary underline cursor-pointer transition-colors">
                Terms & Conditions
              </span>
              ,{" "}
              <span className="font-medium text-gray-800 hover:text-primary underline cursor-pointer transition-colors">
                Refund Policy
              </span>{" "}
              and{" "}
              <span className="font-medium text-gray-800 hover:text-primary underline cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-xs mt-1">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-primary text-white w-full py-3 rounded text-base font-medium hover:shadow hover:shadow-blue-500/25 transition-all duration-200 cursor-pointer"
        >
          <Lock size={16} />
          <span>Confirm Order</span>
          <span>৳ {totalPrice}</span>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
