"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/components/auth/AuthContext";
import { updateUser } from "@/services/user.api";
import { toast } from "sonner";


type TUserUpdateForm = {
  name: string;
  email: string;
  phone: string;
};

const UserUpdateForm = () => {
  const { user } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserUpdateForm>({
    values: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

 const onSubmit = async (data: TUserUpdateForm) => {
  if (!user?._id) {
    toast.error("User ID not found");
    return;
  }

  try {
    await updateUser({
      id: user._id,
      payload: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
      },
    });

    toast.success("Profile updated successfully!");
    // Reload the full page after successful update
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error(error);

    toast.error("Failed to update profile. Please try again.");
  }
};
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm md:p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <div>
          <h3 className="border-b-2 border-gray-100 pb-3 text-lg font-semibold text-gray-900">
            Personal Information
          </h3>

          <div className="mt-5 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-700">*</span>
              </label>

              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-700">*</span>
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Your Phone
              </label>

              <input
                type="text"
                placeholder="01*********"
                {...register("phone", {
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message:
                      "Please enter a valid 11-digit phone number",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;