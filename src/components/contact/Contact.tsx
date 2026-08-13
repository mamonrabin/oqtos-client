"use client";

import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import type { TContact } from "@/types";

import { toast } from "sonner";
import { createContact } from "@/services/contact.api";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContact>();

 const onSubmit = async (data: TContact) => {
  try {
    const result = await createContact(data);

    toast.success(result?.message || "Message sent successfully!");

    reset();
  } catch (error) {
    console.error(error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to send message. Please try again.",
    );
  }
};

  return (
    <main className="min-h-screen bg-gray-50/70">
      {/* ========================================
          HEADER
      ======================================== */}
      <section className="border-b bg-white">
        <div className="Container py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Get In Touch
              </p>

              <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Contact Us
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px]">
            Have a question, suggestion, or need help? Send us a message and
            our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ========================================
          CONTACT CONTENT
      ======================================== */}
      <section className="Container py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* ========================================
              CONTACT INFORMATION
          ======================================== */}
          <div className="order-2 lg:order-1 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Contact Information
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              We’d love to hear from you
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Whether you have a question about our products, an order, or
              anything else, our team is ready to help.
            </p>

            <div className="mt-8 space-y-5">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="mt-1 text-sm text-gray-500">
                    support@example.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="mt-1 text-sm text-gray-500">
                    +880 1XXX-XXXXXX
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Small note */}
            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <p className="text-xs leading-5 text-gray-500">
                We usually respond to messages within 24 hours during business
                days.
              </p>
            </div>
          </div>

          {/* ========================================
              CONTACT FORM
          ======================================== */}
          <div className="order-1 lg:order-2 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Send a Message
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                How can we help?
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                      errors.name
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone{" "}
                  <span className="font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  {...register("phone")}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Write your message..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                    errors.message
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" />

                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;