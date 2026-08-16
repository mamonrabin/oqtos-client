"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Check,
  TicketPercent,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "../auth/AuthContext";
import { updateAffiliateUser } from "@/services/user.api";

type CouponFormValues = {
  coupon: string;
  agreeTerms: boolean;
};

const CreateCoupon = () => {
  const router = useRouter();

  const { user } = useCurrentUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    defaultValues: {
      coupon: "",
      agreeTerms: false,
    },
  });

  const coupon = watch("coupon");
  const agreeTerms = watch("agreeTerms");

  const onSubmit = async (data: CouponFormValues) => {
    if (!user?._id) {
      toast.error("User information not found.");
      return;
    }

    try {
      await updateAffiliateUser({
        id: user._id,
        payload: {
          affiliateCoupon: data.coupon,
        },
      });

      toast.success("Coupon created successfully!", {
        description: `Your coupon code is ${data.coupon}`,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create coupon", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
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
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
            {/* Coupon */}
            <div>
              <label
                htmlFor="coupon"
                className="mb-2.5 block text-sm font-semibold text-gray-800"
              >
                Your coupon code
              </label>

              <input
                id="coupon"
                type="text"
                placeholder="YOURNAME10"
                autoComplete="off"
                {...register("coupon", {
                  required: "Coupon code is required",

                  minLength: {
                    value: 4,
                    message: "Coupon code must be at least 4 characters",
                  },

                  maxLength: {
                    value: 20,
                    message: "Coupon code cannot exceed 20 characters",
                  },

                  pattern: {
                    value: /^[A-Z0-9]+$/,
                    message:
                      "Coupon can contain only letters and numbers",
                  },

                  onChange: (e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/\s/g, "");
                  },
                })}
                className={`h-13 w-full rounded-xl border bg-white px-4 text-base font-semibold tracking-wider text-gray-900 outline-none transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:ring-4 focus:ring-primary/10 ${
                  errors.coupon
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              />

              {errors.coupon ? (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.coupon.message}
                </p>
              ) : (
                <p className="mt-2 text-xs text-gray-400">
                  Use letters and numbers only. Keep your coupon short,
                  memorable, and easy to share.
                </p>
              )}
            </div>

            {/* Coupon Preview */}
            {coupon && !errors.coupon && (
              <div className="mt-5 rounded-xl border border-primary/10 bg-primary/5 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Coupon Preview
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold tracking-wider text-gray-900">
                    {coupon}
                  </span>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Your Code
                  </span>
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="mt-6">
              <div
                className={`rounded-xl border p-4 transition-colors ${
                  errors.agreeTerms
                    ? "border-red-200 bg-red-50/50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("agreeTerms", {
                      required: "You must agree to the terms",
                    })}
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

                {errors.agreeTerms && (
                  <p className="mt-2 pl-7 text-xs font-medium text-red-500">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={!coupon || !agreeTerms || isSubmitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                <Check size={17} />

                {isSubmitting ? "Creating..." : "Create Coupon"}
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