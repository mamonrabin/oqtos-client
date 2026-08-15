"use client";

import { useCurrentUser } from "@/components/auth/AuthContext";
import { TOrder } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

interface OrderProps {
  orders: TOrder[];
}

const RecenteOrder: React.FC<OrderProps> = ({ orders }) => {
  const { user } = useCurrentUser();

  const userOrders = orders?.filter(
    (order) => order.userRef?.email === user?.email
  );

//   const totalQuantity = orders.products?.reduce(
//   (total, item) => total + item.quantity,
//   0
// );

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">
            Recent Orders
          </h3>
          <p className="text-xs text-gray-400">
            Latest {Math.min(userOrders?.length || 0, 5)} orders
          </p>
        </div>

        <Link href="/my-orders">
        <button className="w-fit text-xs font-medium text-blue-600 transition-colors hover:text-blue-800">
          View All
        </button>
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Order ID
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Customer
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Items
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Total
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Status
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:px-4">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {userOrders?.slice(0, 5).map((order, i) => (
              <tr
                key={order._id || i}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* Order ID */}
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-primary sm:px-4">
                  #{order.orderId}
                </td>

                {/* Customer */}
                <td className="max-w-[150px] truncate px-3 py-3 text-sm text-gray-700 sm:px-4">
                  {order.shippingAddress?.name || "-"}
                </td>

                {/* Items */}
                <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-900 sm:px-4">
                  {order.products?.reduce((total, item) => total + item.quantity, 0) || 0} item(s)
                </td>

                {/* Total */}
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:px-4">
                  BDT {order.totalPrice?.toFixed(2) || "0.00"}
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500 sm:px-4">
                  {order.createdAt
                    ? format(new Date(order.createdAt), "dd MMM yyyy")
                    : "-"}
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {(!userOrders || userOrders.length === 0) && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecenteOrder;