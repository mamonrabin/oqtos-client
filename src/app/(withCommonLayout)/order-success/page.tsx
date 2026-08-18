

import { CheckCircle2, ShoppingBag, PackageCheck } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-gray-200 rounded shadow-xs p-6 sm:p-10 text-center">
          {/* Success Icon */}
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />

            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary">
              <CheckCircle2
                className="w-11 h-11 text-white"
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Order Successful!
          </h1>

          <p className="mt-3 text-sm sm:text-base leading-6 text-gray-500 max-w-sm mx-auto">
            Thank you for your order. Your order has been successfully placed
            and is now being processed.
          </p>

          {/* Order Status */}
          <div className="mt-7 flex items-center justify-center gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <PackageCheck className="w-5 h-5 text-primary" />
            </div>

            <div className="text-left">
              <p className="text-xs text-gray-500">
                Order Status
              </p>

              <p className="text-sm font-semibold text-primary">
                Order Confirmed
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              We’ll notify you when your order is shipped.
            </p>
          </div>

          {/* Button */}
          <Link href="/" className="block mt-8">
            <button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
          </Link>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-400">
            Thank you for shopping with{" "}
            <span className="font-semibold text-gray-600">Oqtos</span>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;