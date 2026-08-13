"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { TLogo, TSocilaLink } from "@/types";
import { apiBaseUrl } from "@/config";
import SocialLink from "./SocialLink";

interface FooterProps {
  logoList: TLogo[];
  socialLinkes:TSocilaLink[]
}

const Footer: React.FC<FooterProps> = ({ logoList,socialLinkes }) => {
  const logo = logoList?.[0];

  return (
    <footer className="bg-[#111827] text-white">
      {/* =========================
          Main Footer
      ========================== */}
      <div className="Container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* =========================
              Brand
          ========================== */}
          <div className="sm:col-span-2 lg:col-span-1">
            {logo?.footerLogo && (
              <Link href="/" className="inline-block">
                <Image
                  src={`${apiBaseUrl}${logo.footerLogo}`}
                  alt="Logo"
                  width={140}
                  height={50}
                  unoptimized
                  className="h-auto max-h-12 w-auto object-contain"
                />
              </Link>
            )}

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              {logo?.description ||
                "Quality products, great value, and a shopping experience you can trust."}
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              {logo?.address && (
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#087096]"
                  />

                  <span>{logo.address}</span>
                </div>
              )}

              {logo?.phone && (
                <a
                  href={`tel:${logo.phone}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone size={17} className="shrink-0 text-[#087096]" />

                  <span>{logo.phone}</span>
                </a>
              )}

              {logo?.email && (
                <a
                  href={`mailto:${logo.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail size={17} className="shrink-0 text-[#087096]" />

                  <span className="break-all">{logo.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* =========================
              company
          ========================== */}
          <div className="xl:ml-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Our Store
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
             policies
          ========================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Policies
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Privacy Policies
                </Link>
              </li>

              <li>
                <Link
                   href="/policies/terms-conditions"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/policies/return-policy"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Return Policy
                </Link>
              </li>

              <li>
                <Link
                    href="/policies/order-policy"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Order Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policies/shipping-policy"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              Newsletter
          ========================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>

            <p className="mt-5 text-sm leading-6 text-white/60">
              Subscribe to get updates about new products, offers, and exclusive
              discounts.
            </p>

            <form className="mt-5">
              <div className="flex overflow-hidden rounded border border-white/10 bg-white/5 focus-within:border-[#087096]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />

                <button
                  type="submit"
                  className="flex shrink-0 items-center justify-center bg-[#087096] px-4 text-white transition-colors hover:bg-[#075d7c]"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            {/* <p className="mt-3 text-xs text-white/40">
              We respect your privacy. Unsubscribe anytime.
            </p> */}

            <div>
              <SocialLink socialLinkes={socialLinkes}/>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Bottom Footer
      ========================== */}
      <div className="border-t border-white/10">
        <div className="Container flex flex-col gap-3 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} oqtos. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">
            <p className="text-xs text-white/50 ">
              Develop by <Link href="https://titaswebs.vercel.app/" target="_blank" className="transition-colors hover:text-white hover:underline cursor-pointer">Titasweb</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
