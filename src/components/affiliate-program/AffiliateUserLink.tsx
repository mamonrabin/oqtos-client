"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Globe,
  Link2,
  Save,
  ShieldAlert,
  TicketPercent,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../auth/AuthContext";
import { toast } from "sonner";
import { updateAffiliateUser } from "@/services/user.api";

type SocialLinksForm = {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  website: string;
};

const AffiliateUserLink = () => {
  const { user } = useCurrentUser();

  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SocialLinksForm>({
    defaultValues: {
      facebook: "",
      instagram: "",
      youtube: "",
      tiktok: "",
      website: "",
    },
  });

  const coupon = user?.affiliateCoupon || "YOURCOUPON";

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/product?ref=${coupon}`
      : "";

  // Load existing affiliate links
  useEffect(() => {
    if (!user?.affiliateLink) return;

    reset({
      facebook: user.affiliateLink[0] || "",
      instagram: user.affiliateLink[1] || "",
      youtube: user.affiliateLink[2] || "",
      tiktok: user.affiliateLink[3] || "",
      website: user.affiliateLink[4] || "",
    });
  }, [user, reset]);

  const handleSaveSocialLinks = async (data: SocialLinksForm) => {
    if (!user?._id) {
      toast.error("User information not found.");
      return;
    }

    try {
      setIsSaving(true);

      // Convert object into string[]
      const affiliateLink = [
        data.facebook,
        data.instagram,
        data.youtube,
        data.tiktok,
        data.website,
      ].filter((link) => link.trim() !== "");

      await updateAffiliateUser({
        id: user._id,
        payload: {
          affiliateLink,
        },
      });

      toast.success("Social links saved successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save social links", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async (
    text: string,
    message = "Copied successfully!",
  ) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);
      toast.success(message);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
    <main className="Container py-6 sm:py-10">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to My Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            OqtosEarm Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Manage your affiliate profile, referral links, and social influence
            networks.
          </p>
        </div>

        <Link
          href="/become-an-affiliate"
          className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          What is OqtosEarm?
        </Link>
      </div>

      {/* Social Links */}
      <section className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Your Influence Network
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your social profiles so we can verify your affiliate
              presence.
            </p>
          </div>

          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
            <Link2 size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSaveSocialLinks)}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Facebook */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaFacebook size={18} />
                Facebook
              </label>

              <input
                type="url"
                {...register("facebook")}
                placeholder="https://facebook.com/yourprofile"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaInstagram size={18} />
                Instagram
              </label>

              <input
                type="url"
                {...register("instagram")}
                placeholder="https://instagram.com/yourusername"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaYoutube size={18} />
                YouTube
              </label>

              <input
                type="url"
                {...register("youtube")}
                placeholder="https://youtube.com/@yourchannel"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaTiktok size={18} />
                TikTok
              </label>

              <input
                type="url"
                {...register("tiktok")}
                placeholder="https://tiktok.com/@yourusername"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Website */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Globe size={18} />
                Website
              </label>

              <input
                type="url"
                {...register("website")}
                placeholder="https://yourwebsite.com"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Social Links
              </>
            )}
          </button>
        </form>
      </section>

      {/* Account Status */}
      <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <ShieldAlert size={21} />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-amber-900">
              Account Verification
            </h3>

            <p className="mt-1 text-sm leading-5 text-amber-700">
              Your social influence information will be reviewed before your
              affiliate account is fully activated.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Verification Pending
          </span>
        </div>
      </section>

      {/* Coupon */}
      <section className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TicketPercent size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Your Coupon Code
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Share this code with your audience.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Current Code
            </p>

            <div className="mt-2 flex items-center gap-3">
              <span className="break-all text-2xl font-extrabold tracking-[2px] text-gray-900">
                {coupon}
              </span>

              <button
                type="button"
                onClick={() => handleCopy(coupon, "Coupon copied!")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Active Code
          </span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <span className="mt-0.5">ⓘ</span>

          <p>
            Customers can use this coupon code when purchasing products through
            your referral.
          </p>
        </div>
      </section>

      {/* Affiliate Link */}
      <section className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Link2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Your Affiliate Link
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Share this link with your audience to earn commissions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AffiliateUserLink;