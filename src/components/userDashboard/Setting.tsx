"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  SlidersHorizontal,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { changePassword } from "@/services/auth.api";
import { toast } from "sonner";

type TChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Setting = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TChangePasswordForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

 const onSubmit = async (data: TChangePasswordForm) => {
  try {
    await changePassword(
      data.currentPassword,
      data.newPassword
    );

    toast.success("Password changed successfully", {
      description: "Your password has been updated.",
    });

    reset();
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to change password",
      {
        description: "Please check your current password and try again.",
      }
    );
  }
};

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <SlidersHorizontal size={20} />

            <span className="text-sm font-semibold">
              Account Settings
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your account security and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Change Password */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 p-5 sm:p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lock size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Change Password
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>

              <KeyRound
                size={20}
                className="hidden text-gray-300 sm:block"
              />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 sm:p-7"
            >
              <div className="space-y-5">
                {/* Current Password */}
                <div>
                  <label
                    htmlFor="current-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Current Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      {...register("currentPassword", {
                        required: "Current password is required",
                      })}
                      className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
                        errors.currentPassword
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-primary focus:ring-primary/10"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.currentPassword && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    New Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                      className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
                        errors.newPassword
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-primary focus:ring-primary/10"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((prev) => !prev)
                      }
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.newPassword ? (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.newPassword.message}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-gray-500">
                      Password must be at least 6 characters long.
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm new password"
                      {...register("confirmPassword", {
                        required:
                          "Please confirm your new password",
                        validate: (value) =>
                          value === newPassword ||
                          "Passwords do not match",
                      })}
                      className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-primary focus:ring-primary/10"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="mt-7 flex justify-end border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <KeyRound size={17} />

                  {isSubmitting
                    ? "Updating..."
                    : "Update Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Setting;