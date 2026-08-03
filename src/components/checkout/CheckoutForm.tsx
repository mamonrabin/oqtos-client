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

const CheckoutForm = () => {
  return (
    <div className=" bg-white rounded shadow-xs border border-[#262626]/15 overflow-hidden">
      <form className="md:p-8 py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="md:text-2xl text-xl font-bold text-gray-900">Checkout</h1>
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
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
                placeholder="01XXX-XXXXXX"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
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
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
                placeholder="House No, Road No, Area"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                City / District <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full px-4 py-3 !h-[45px]  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all h-auto">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent className="!rounded border-gray-200 w-full">
                  {districtList.map((district) => (
                    <SelectItem
                      className="!rounded-[1px]"
                      key={district}
                      value={district.toLowerCase()}
                    >
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Alt. Phone
              </label>
              <input
                type="text"
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
                placeholder="01XXX-XXXXXX (optional)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Delivery Note
              </label>
              <textarea
                className="w-full px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all resize-none"
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
              className="flex-1 px-4 py-3  border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:primary focus:border-transparent transition-all"
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
          <PaymentMethods />
        </div>

        {/* Terms & Conditions */}
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4  rounded border border-gray-100">
            <input
              type="checkbox"
              id="condition"
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:primary"
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
        </div>

        <button type="submit" className="flex items-center justify-center gap-2 bg-primary text-white w-full py-3 rounded text-base font-medium hover:shadow hover:shadow-blue-500/25 transition-all duration-200 cursor-pointer">
          <Lock size={16} />
          <span>Confirm Order</span>
          <span>৳ 5845</span>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
