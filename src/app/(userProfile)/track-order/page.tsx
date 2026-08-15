import {
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Search,
  Truck,
  Box,
  Phone,
} from "lucide-react";
import React from "react";

const TrackOrderPage = () => {
  const order = {
    orderId: "ORD-260815-42519VJB1",
    status: "CONFIRMED",
    courier: "Not assigned",
    trackingCode: "",
    estimatedDelivery: "3–5 business days",
  };

  const steps = [
    {
      title: "Order Placed",
      description: "Your order has been successfully placed.",
      date: "Aug 15, 2026 • 08:15 PM",
      completed: true,
      icon: Package,
    },
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed by the store.",
      date: "Aug 15, 2026 • 08:15 PM",
      completed: true,
      icon: CheckCircle2,
    },
    {
      title: "Processing",
      description: "Your order is being prepared.",
      date: "",
      completed: false,
      icon: Box,
    },
    {
      title: "Shipped",
      description: "Your package will be handed over to the courier.",
      date: "",
      completed: false,
      icon: Truck,
    },
    {
      title: "Delivered",
      description: "Your order will be delivered to your address.",
      date: "",
      completed: false,
      icon: MapPin,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-primary">
            Order Tracking
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Track Your Order
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Check the current status and delivery progress of your order.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Track an order
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your order ID to check your order status.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                defaultValue={order.orderId}
                placeholder="Enter order ID"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Search size={17} />
              Track Order
            </button>
          </form>
        </section>

        {/* ================= ORDER STATUS ================= */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Order Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Order ID
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-900">
                #{order.orderId}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Placed on August 15, 2026
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold capitalize text-blue-700">
              {order.status.toLowerCase()}
            </span>
          </div>

          {/* Current Status */}
          <div className="border-b border-gray-100 bg-gray-50/70 p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck size={22} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Current Status
                </p>

                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  Order Confirmed
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your order has been confirmed and will be processed soon.
                </p>
              </div>
            </div>
          </div>

          {/* ================= TIMELINE ================= */}
          <div className="p-5 sm:p-8">
            <h3 className="mb-7 text-base font-semibold text-gray-900">
              Order Progress
            </h3>

            <div className="relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={step.title}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >
                    {/* Vertical Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[19px] top-10 h-full w-0.5 ${
                          step.completed
                            ? "bg-primary"
                            : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        step.completed
                          ? "bg-primary text-white"
                          : "border-2 border-gray-200 bg-white text-gray-400"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <h4
                          className={`text-sm font-semibold ${
                            step.completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h4>

                        {step.date && (
                          <span className="text-xs text-gray-400">
                            {step.date}
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-1 text-sm ${
                          step.completed
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= TRACKING INFO ================= */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Courier */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Truck size={19} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Delivery Information
                </h3>

                <p className="text-xs text-gray-500">
                  Courier and tracking details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-500">
                  Courier
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {order.courier}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-500">
                  Tracking Code
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {order.trackingCode || "Not available yet"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Estimated Delivery
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {order.estimatedDelivery}
                </span>
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <MapPin size={19} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Delivery Address
                </h3>

                <p className="text-xs text-gray-500">
                  Where your order will be delivered
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  Riaz
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Dhaka Saver Road 2, Dhaka
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 text-sm text-gray-600">
                <Phone size={14} />
                01746770324
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TrackOrderPage;