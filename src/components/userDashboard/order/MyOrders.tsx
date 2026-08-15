"use client";
import React from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  ShoppingBag,
  CreditCard,
  MapPin,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { TOrder } from "@/types";
import { useCurrentUser } from "@/components/auth/AuthContext";

interface OrderProps {
  orders: TOrder[];
}

const MyOrders: React.FC<OrderProps> = ({ orders }) => {
  const { user } = useCurrentUser();

  const userOrders = orders?.filter(
    (order) => order.userRef?.email === user?.email,
  );
  return (
    <div className="Container px-4 py-8 xl:px-40">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

        <p className="mt-1 text-sm text-gray-500">
          View and track all your orders
        </p>
      </div>

      {/* MyOrders List */}
      <div className="flex flex-col gap-5">
        {userOrders?.length > 0 ? (
          userOrders?.map((order) => {
            const totalQuantity =
              order.products?.reduce(
                (total, item) => total + item.quantity,
                0,
              ) || 0;

            return (
              <div
                key={order._id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                      #{order.orderId}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                      <CalendarDays size={15} />

                      {order.createdAt
                        ? format(
                            new Date(order.createdAt),
                            "dd MMM yyyy 'at' hh:mm a",
                          )
                        : "-"}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "PROCESSING"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "SHIPPED"
                              ? "bg-indigo-100 text-indigo-700"
                              : order.status === "DELIVERED"
                                ? "bg-green-100 text-green-700"
                                : order.status === "CANCELLED"
                                  ? "bg-red-100 text-red-700"
                                  : order.status === "ON_HOLD"
                                    ? "bg-orange-100 text-orange-700"
                                    : order.status === "IN_REVIEW"
                                      ? "bg-cyan-100 text-cyan-700"
                                      : order.status === "RETURNED"
                                        ? "bg-rose-100 text-rose-700"
                                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status?.toLowerCase().replace("_", " ")}
                  </span>
                </div>

                {/* Order Details */}
                <div className="py-4">
                  {/* Items */}
                  <div className="flex items-center gap-3 py-2.5 text-sm text-gray-600">
                    <ShoppingBag size={17} className="shrink-0 text-gray-400" />

                    <span>
                      {totalQuantity} item
                      {totalQuantity !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Payment */}
                  <div className="flex items-center gap-3 py-2.5 text-sm text-gray-600">
                    <CreditCard size={17} className="shrink-0 text-gray-400" />

                    <span>{order.paymentMethod || "Cash On Delivery"}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 py-2.5 text-sm text-gray-600">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <span className="break-words">
                      {order.shippingAddress?.address || "-"}
                      {order.shippingAddress?.city
                        ? `, ${order.shippingAddress.city}`
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Total */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-500">Total:</span>

                    <span className="text-lg font-bold text-gray-900 sm:text-xl">
                      BDT {order.totalPrice?.toFixed(2)}
                    </span>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/orders/${order._id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="rounded-xl bg-white px-5 py-16 text-center shadow-sm">
            <ShoppingBag size={52} className="mx-auto mb-4 text-gray-300" />

            <h3 className="text-xl font-semibold text-gray-700">
              No MyOrders Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              You haven t placed any orders yet.
            </p>

            <Link
              href="/product"
              className="mt-6 inline-flex rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
