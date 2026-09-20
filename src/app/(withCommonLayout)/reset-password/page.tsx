"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { resetPassword } from "@/services/auth.api";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!userId || !token) {
      toast.error("Invalid or expired password reset link");
      return;
    }

    try {
      await resetPassword(
        userId,
        token,
        data.password
      );

      toast.success("Password reset successfully!");

      router.push("/logIn");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // Invalid URL
  if (!userId || !token) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-xl rounded border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-red-500">
            Invalid Reset Link
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This password reset link is invalid or incomplete.
          </p>

          <Link
            href="/forgot-password"
            className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-10 md:py-20">
      <div className="w-full max-w-xl rounded border bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
              className={`w-full rounded border px-4 py-3 text-sm outline-none transition
                focus:border-primary focus:ring-1 focus:ring-primary
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
              className={`w-full rounded border px-4 py-3 text-sm outline-none transition
                focus:border-primary focus:ring-1 focus:ring-primary
                ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-[#065b79] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link
            href="/logIn"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;