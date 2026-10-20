
"use client";

import { useMemo, useState } from "react";
import { hindSiliguri } from "@/app/font";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const INSIDE_DHAKA_CHARGE = 60;
const OUTSIDE_DHAKA_CHARGE = 120;

const products = [
  {
    id: 1,
    name: "প্রিমিয়াম বেবি বোরকা + হিজাব সেট",
    price: 399,
    image: "/images/baby-borka-1.jpg",
    colors: [
      { name: "মিন্ট", value: "#8eaaa0" },
      { name: "অলিভ", value: "#a4ae8e" },
      { name: "পিংক", value: "#e8a7bd" },
      { name: "কালো", value: "#30333a" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "প্রিমিয়াম বেবি বোরকা সেট",
    price: 399,
    image: "/images/baby-borka-2.jpg",
    colors: [
      { name: "মিন্ট", value: "#8eaaa0" },
      { name: "অলিভ", value: "#a4ae8e" },
      { name: "পিংক", value: "#e8a7bd" },
      { name: "কালো", value: "#30333a" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
];

type Selection = {
  quantity: number;
  color: string;
  size: string;
};

type DeliveryArea = "inside" | "outside";

const initialSelections: Record<number, Selection> = {
  1: { quantity: 1, color: "মিন্ট", size: "M" },
  2: { quantity: 0, color: "পিংক", size: "S" },
};

const OrderSection = () => {
  const [selections, setSelections] =
    useState<Record<number, Selection>>(initialSelections);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: "",
    deliveryArea: "inside" as DeliveryArea,
  });

  const [submitted, setSubmitted] = useState(false);

  const updateSelection = (
    id: number,
    changes: Partial<Selection>
  ) => {
    setSelections((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...changes },
    }));
    setSubmitted(false);
  };

  const updateCustomer = (
    field: keyof typeof customer,
    value: string
  ) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const selectedProducts = useMemo(
    () =>
      products.filter(
        (product) => (selections[product.id]?.quantity ?? 0) > 0
      ),
    [selections]
  );

  const totalQuantity = selectedProducts.reduce(
    (sum, product) => sum + selections[product.id].quantity,
    0
  );

  const subtotal = selectedProducts.reduce(
    (sum, product) =>
      sum + product.price * selections[product.id].quantity,
    0
  );

  const delivery =
    subtotal === 0
      ? 0
      : customer.deliveryArea === "inside"
        ? INSIDE_DHAKA_CHARGE
        : OUTSIDE_DHAKA_CHARGE;

  const total = subtotal + delivery;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (totalQuantity === 0) {
      setSubmitted(false);
      return;
    }

    // Connect your order API here.
    // The current code does not send or save orders.
    setSubmitted(true);
  };

  return (
    <section
      id="order"
      className={`${hindSiliguri.className} relative overflow-hidden bg-[#f3f8f8] px-4 py-12 sm:py-20`}
    >
      <div className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-9 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <ShoppingBag size={16} />
            সহজ অর্ডার ফর্ম
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            আপনার পছন্দের সেটটি <span className="text-primary">
              অর্ডার করুন এখনই
            </span>
          </h2>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            পণ্য নির্বাচন করুন, তথ্য দিন, অর্ডার সম্পন্ন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT: Product selection */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    আপনার পছন্দের পণ্য
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    কালার, সাইজ ও পরিমাণ নির্বাচন করুন
                  </p>
                </div>

                <span className="rounded-xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                  {totalQuantity} টি
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {products.map((product) => {
                  const selection = selections[product.id];
                  const isSelected = selection.quantity > 0;

                  return (
                    <div
                      key={product.id}
                      className={`p-4 transition sm:p-6 ${
                        isSelected ? "bg-primary/[0.025]" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#edf4f2] sm:h-36 sm:w-32">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />

                          {isSelected && (
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow">
                              <Check size={14} />
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold leading-6 text-slate-800 sm:text-base">
                                {product.name}
                              </h4>

                              <p className="mt-1 text-lg font-extrabold text-primary">
                                ৳{product.price}
                              </p>
                            </div>

                            <span
                              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                                isSelected
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {isSelected ? "নির্বাচিত" : "নির্বাচন করুন"}
                            </span>
                          </div>

                          {/* Color selection */}
                          <div className="mt-3">
                            <p className="mb-2 text-xs font-semibold text-slate-500">
                              কালার: {selection.color}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {product.colors.map((color) => (
                                <button
                                  key={color.name}
                                  type="button"
                                  title={color.name}
                                  aria-label={`${product.name}: ${color.name}`}
                                  aria-pressed={selection.color === color.name}
                                  onClick={() =>
                                    updateSelection(product.id, {
                                      color: color.name,
                                    })
                                  }
                                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${
                                    selection.color === color.name
                                      ? "border-primary ring-2 ring-primary/15 ring-offset-1"
                                      : "border-white shadow-sm hover:scale-105"
                                  }`}
                                >
                                  <span
                                    className="h-5 w-5 rounded-full border border-black/5"
                                    style={{
                                      backgroundColor: color.value,
                                    }}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Size and quantity */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <label className="relative">
                              <span className="sr-only">সাইজ</span>
                              <select
                                value={selection.size}
                                onChange={(event) =>
                                  updateSelection(product.id, {
                                    size: event.target.value,
                                  })
                                }
                                className="h-9 appearance-none rounded-xl border border-slate-200 bg-white py-1 pl-3 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                              >
                                {product.sizes.map((size) => (
                                  <option key={size} value={size}>
                                    সাইজ: {size}
                                  </option>
                                ))}
                              </select>

                              <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-2.5 top-3 text-slate-500"
                              />
                            </label>

                            <div className="flex h-9 items-center rounded-xl border border-slate-200 bg-white">
                              <button
                                type="button"
                                aria-label="পরিমাণ কমান"
                                disabled={selection.quantity === 0}
                                onClick={() =>
                                  updateSelection(product.id, {
                                    quantity: Math.max(
                                      0,
                                      selection.quantity - 1
                                    ),
                                  })
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-l-xl text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="min-w-7 text-center text-sm font-bold text-slate-800">
                                {selection.quantity}
                              </span>

                              <button
                                type="button"
                                aria-label="পরিমাণ বাড়ান"
                                onClick={() =>
                                  updateSelection(product.id, {
                                    quantity: selection.quantity + 1,
                                  })
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-r-xl text-primary transition hover:bg-primary/10"
                              >
                                <Plus size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4 text-sm text-slate-500 sm:px-7">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-primary" />
                  অর্ডারের আগে আপনার পছন্দের সাইজ ও কালার যাচাই করুন।
                </div>
              </div>
            </div>

            {/* RIGHT: Customer details and summary */}
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    ডেলিভারির তথ্য
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন।
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      আপনার নাম *
                    </label>
                    <input
                      required
                      autoComplete="name"
                      value={customer.name}
                      onChange={(e) =>
                        updateCustomer("name", e.target.value)
                      }
                      placeholder="সম্পূর্ণ নাম লিখুন"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="(?:\+?88)?01[3-9]\d{8}"
                      title="সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন"
                      value={customer.phone}
                      onChange={(e) =>
                        updateCustomer("phone", e.target.value)
                      }
                      placeholder="01XXXXXXXXX"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      জেলা *
                    </label>
                    <input
                      required
                      autoComplete="address-level1"
                      value={customer.district}
                      onChange={(e) =>
                        updateCustomer("district", e.target.value)
                      }
                      placeholder="আপনার জেলার নাম"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  {/* Delivery Area Selection */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      ডেলিভারি এরিয়া নির্বাচন করুন *
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        aria-pressed={
                          customer.deliveryArea === "inside"
                        }
                        onClick={() =>
                          updateCustomer("deliveryArea", "inside")
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          customer.deliveryArea === "inside"
                            ? "border-primary bg-primary/[0.06] ring-2 ring-primary/10"
                            : "border-slate-200 bg-white hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-800">
                            Inside Dhaka
                          </span>

                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              customer.deliveryArea === "inside"
                                ? "border-primary bg-primary text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {customer.deliveryArea === "inside" && (
                              <Check size={12} />
                            )}
                          </span>
                        </div>

                        <p className="mt-3 text-2xl font-extrabold text-primary">
                          ৳৬০
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          ঢাকার ভেতরে
                        </p>
                      </button>

                      <button
                        type="button"
                        aria-pressed={
                          customer.deliveryArea === "outside"
                        }
                        onClick={() =>
                          updateCustomer("deliveryArea", "outside")
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          customer.deliveryArea === "outside"
                            ? "border-primary bg-primary/[0.06] ring-2 ring-primary/10"
                            : "border-slate-200 bg-white hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-800">
                            Outside Dhaka
                          </span>

                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              customer.deliveryArea === "outside"
                                ? "border-primary bg-primary text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {customer.deliveryArea === "outside" && (
                              <Check size={12} />
                            )}
                          </span>
                        </div>

                        <p className="mt-3 text-2xl font-extrabold text-primary">
                          ৳১২০
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          ঢাকার বাইরে
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      সম্পূর্ণ ঠিকানা *
                    </label>
                    <textarea
                      required
                      autoComplete="street-address"
                      rows={3}
                      value={customer.address}
                      onChange={(e) =>
                        updateCustomer("address", e.target.value)
                      }
                      placeholder="বাসা, রোড, এলাকা, থানা ও জেলার নাম লিখুন"
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      অতিরিক্ত নির্দেশনা (ঐচ্ছিক)
                    </label>
                    <input
                      value={customer.note}
                      onChange={(e) =>
                        updateCustomer("note", e.target.value)
                      }
                      placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                    <ShoppingBag size={19} className="text-primary" />
                    অর্ডারের সারাংশ
                  </h3>
                </div>

                <div className="space-y-3 p-5 sm:px-6">
                  {selectedProducts.length === 0 ? (
                    <p className="py-3 text-center text-sm text-slate-500">
                      অর্ডার করতে অন্তত একটি পণ্য নির্বাচন করুন।
                    </p>
                  ) : (
                    selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-700">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {selections[product.id].color} · সাইজ{" "}
                            {selections[product.id].size} ·{" "}
                            {selections[product.id].quantity} টি
                          </p>
                        </div>

                        <span className="shrink-0 font-bold text-slate-800">
                          ৳
                          {product.price *
                            selections[product.id].quantity}
                        </span>
                      </div>
                    ))
                  )}

                  <div className="border-t border-dashed border-slate-200 pt-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>পণ্যের মূল্য</span>
                      <span>৳{subtotal}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <Truck size={16} />
                        ডেলিভারি চার্জ
                      </span>

                      <span className="font-semibold text-slate-700">
                        ৳{delivery}
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          ({customer.deliveryArea === "inside"
                            ? "ঢাকার ভেতরে"
                            : "ঢাকার বাইরে"})
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-primary/[0.07] p-4">
                    <span className="font-bold text-slate-800">
                      সর্বমোট
                    </span>
                    <span className="text-2xl font-extrabold text-primary">
                      ৳{total}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={totalQuantity === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <ShoppingBag size={19} />
                    ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                    <ArrowRight size={18} />
                  </button>

                  {submitted && (
                    <p
                      role="status"
                      className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"
                    >
                      ফর্মের তথ্য যাচাই হয়েছে। অর্ডারটি এখনো
                      সার্ভারে পাঠানো হয়নি। অর্ডার নিশ্চিত করতে
                      আপনার backend API সংযুক্ত করুন।
                    </p>
                  )}

                  <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 size={15} className="text-primary" />
                    ক্যাশ অন ডেলিভারি · সহজ অর্ডার প্রক্রিয়া
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>


    
    </section>
  );
};

export default OrderSection;
