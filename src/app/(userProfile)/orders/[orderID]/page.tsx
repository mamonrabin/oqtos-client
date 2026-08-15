/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiBaseUrl } from "@/config";
import { getSingleOrderByID } from "@/services/order.api";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Home,
  Info,
  MapPin,
  Package,
  Phone,
  Settings,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const statusSteps = [
  {
    status: "PENDING",
    title: "Order Placed",
    icon: Package,
  },
  {
    status: "CONFIRMED",
    title: "Confirmed",
    icon: Check,
  },
  {
    status: "PROCESSING",
    title: "Processing",
    icon: Settings,
  },
  {
    status: "SHIPPED",
    title: "Shipped",
    icon: Truck,
  },
  {
    status: "DELIVERED",
    title: "Delivered",
    icon: Home,
  },
];

const formatStatus = (status: string) => {
  return status
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
};

const formatCurrency = (amount: number) => {
  return `BDT ${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "CONFIRMED":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "PROCESSING":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";

    case "SHIPPED":
      return "bg-violet-50 text-violet-700 border-violet-200";

    case "DELIVERED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-200";

    case "RETURNED":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "ON_HOLD":
      return "bg-gray-100 text-gray-700 border-gray-200";

    case "IN_REVIEW":
      return "bg-purple-50 text-purple-700 border-purple-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const Page = async ({
  params,
}: {
  params: Promise<{ orderID: string }>;
}) => {
  const { orderID } = await params;

  const { data } = await getSingleOrderByID(orderID);

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="Container">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />

            <h1 className="text-xl font-semibold text-gray-900">
              Order not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn&apos;t find the order you&apos;re looking for.
            </p>

            <Link
              href="/my-orders"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.status === data.status,
  );

  const isCancelled =
    data.status === "CANCELLED" ||
    data.status === "RETURNED" ||
    data.status === "ON_HOLD";

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-10">
      <div className="Container">
        {/* Back */}
        <div className="mb-5">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />

                  <span className="text-sm font-medium text-gray-500">
                    Order Details
                  </span>
                </div>

                <h1 className="break-all text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                  #{data.orderId}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Placed on {formatDate(data.createdAt)}
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                  data.status,
                )}`}
              >
                {formatStatus(data.status)}
              </span>
            </div>
          </div>

          {/* Order Status */}
          <div className="border-b border-gray-100 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track your order progress
              </p>
            </div>

            {isCancelled ? (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Info size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-red-800">
                      Order {formatStatus(data.status)}
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      This order is currently {formatStatus(data.status)}.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop */}
                <div className="hidden md:block">
                  <div className="relative px-5">
                    {/* Background line */}
                    <div className="absolute left-[10%] right-[10%] top-7 h-0.5 bg-gray-200" />

                    {/* Active line */}
                    {currentStatusIndex > 0 && (
                      <div
                        className="absolute left-[10%] top-7 h-0.5 bg-primary"
                        style={{
                          width: `${(currentStatusIndex / 4) * 80}%`,
                        }}
                      />
                    )}

                    <div className="relative grid grid-cols-5">
                      {statusSteps.map((step, index) => {
                        const Icon = step.icon;

                        const active = index <= currentStatusIndex;

                        return (
                          <div
                            key={step.status}
                            className="flex flex-col items-center text-center"
                          >
                            <div
                              className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                                active
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              <Icon size={21} />
                            </div>

                            <p
                              className={`mt-3 text-sm font-semibold ${
                                active
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.title}
                            </p>

                            {index === currentStatusIndex && (
                              <span className="mt-1 text-xs text-primary">
                                Current status
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                  <div className="space-y-5">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const active = index <= currentStatusIndex;
                      const isLast = index === statusSteps.length - 1;

                      return (
                        <div
                          key={step.status}
                          className="relative flex gap-4"
                        >
                          {!isLast && (
                            <div
                              className={`absolute left-[18px] top-9 h-[calc(100%+20px)] w-0.5 ${
                                index < currentStatusIndex
                                  ? "bg-primary"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}

                          <div
                            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              active
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <Icon size={16} />
                          </div>

                          <div className="pt-1">
                            <p
                              className={`text-sm font-semibold ${
                                active
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.title}
                            </p>

                            {index === currentStatusIndex && (
                              <p className="mt-1 text-xs text-primary">
                                Current status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Tracking */}
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Tracking Information
              </h3>

              {data.courier?.trackingCode ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                        <Truck size={19} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Tracking Code
                        </p>

                        <p className="font-semibold text-gray-900">
                          {data.courier.trackingCode}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      {data.courier.provider}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  <Info size={18} />

                  <span>
                    Tracking link will be available once the order is shipped.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="border-b border-gray-100 p-5 sm:p-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Items
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {data.products?.length || 0} item
                {data.products?.length !== 1 ? "s" : ""} in this order
              </p>
            </div>

            <div className="space-y-4">
              {data.products?.map((item:any) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                >
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {item.productRef?.thumbnailImage ? (
                      <Image
                        src={apiBaseUrl + item.productRef.thumbnailImage}
                        alt={item.productRef.title}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <Package size={28} />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.productRef?.title || "Product"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Product ID: {item.productRef?._id}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.size && (
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          Size: {item.size}
                        </span>
                      )}

                      {item.color && (
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                          Color: {item.color}
                        </span>
                      )}

                      <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500">Item Total</p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Information */}
          <div className="grid grid-cols-1 gap-5 p-5 sm:p-8 lg:grid-cols-2">
            {/* Shipping */}
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Shipping Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Delivery address
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {data.shippingAddress?.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {data.shippingAddress?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-900">
                      {data.shippingAddress?.address}
                      {data.shippingAddress?.city &&
                        `, ${data.shippingAddress.city}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    Payment and pricing
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-900">
                    {formatCurrency(data.subTotalPrice)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping Fee</span>

                  <span className="font-medium text-gray-900">
                    {formatCurrency(data.shippingCost)}
                  </span>
                </div>

                {/* Discount */}
                {data.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>

                    <span className="font-medium text-emerald-600">
                      - {formatCurrency(data.discount)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(data.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Payment */}
                <div className="flex items-center gap-3 rounded-lg bg-white p-3">
                  <CreditCard size={17} className="text-gray-500" />

                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      Payment Method
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      {data.paymentMethod === "COD"
                        ? "Cash On Delivery"
                        : data.paymentMethod}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      data.paymentStatus === "PAID"
                        ? "bg-emerald-50 text-emerald-700"
                        : data.paymentStatus === "FAILED"
                          ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {formatStatus(data.paymentStatus)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          {data.userRef && (
            <div className="border-t border-gray-100 px-5 pb-5 sm:px-8 sm:pb-8">
              <div className="rounded-xl border border-gray-200 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {data.userRef.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {data.userRef.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Order ID:{" "}
                <span className="font-medium text-gray-700">
                  {data.orderId}
                </span>
              </p>

              {/* <p>
                Last updated:{" "}
                <span className="font-medium text-gray-700">
                  {formatDate(data.updatedAt)}
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;