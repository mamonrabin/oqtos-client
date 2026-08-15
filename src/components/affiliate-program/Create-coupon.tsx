"use client";

import React, { useState } from "react";
import { ArrowLeft, Check, TicketPercent, Sparkles } from "lucide-react";
import Link from "next/link";

const CreateCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!coupon || !agreeTerms) return;

    console.log({
      coupon,
      agreeTerms,
    });

    // Create coupon API here
  };

  return (
    <main className="Container py-6 sm:py-10">
      {/* Back */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Page Heading */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <Sparkles size={14} />
          Affiliate Program
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Start earning with OqtosEarm
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Create your personal coupon code and share it with your audience to
          earn rewards from successful purchases.
        </p>
      </div>

      {/* Main Card */}
      <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
        {/* Card Top */}
        <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-6 sm:px-8">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <TicketPercent size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Create your coupon
              </h2>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Choose a unique code that your customers can easily remember.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl"
          >
            {/* Coupon */}
            <div>
              <label
                htmlFor="referrer_coupon"
                className="mb-2.5 block text-sm font-semibold text-gray-800"
              >
                Your coupon code
              </label>

              <div className="relative">
                <input
                  id="referrer_coupon"
                  name="referrer_coupon"
                  type="text"
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(
                      e.target.value
                        .toUpperCase()
                        .replace(/\s/g, "")
                    )
                  }
                  placeholder="YOURNAME10"
                  required
                  className="h-13 w-full rounded-xl border border-gray-200 bg-white px-4 text-base font-semibold tracking-wider text-gray-900 outline-none transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Use letters and numbers only. Keep your coupon short,
                memorable, and easy to share.
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-[17px] w-[17px] shrink-0 cursor-pointer accent-primary"
                />

                <span className="text-xs leading-5 text-gray-500 sm:text-sm">
                  I agree to the{" "}
                  <Link
                    href="/become-an-affiliate#affiliate-terms"
                    target="_blank"
                    className="font-semibold text-primary underline underline-offset-2"
                  >
                    Affiliate Code of Conduct, Content Policy & Terms
                  </Link>
                  . I understand that I am responsible for the content and
                  promotions associated with my coupon.
                </span>
              </label>
            </div>

            {/* Action */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={!coupon || !agreeTerms}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                <Check size={17} />
                Create Coupon
              </button>

              <span className="text-xs text-gray-400">
                You can share your coupon after it&apos;s created.
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateCoupon;