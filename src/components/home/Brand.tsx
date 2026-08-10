/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBrand, THomeControl } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import Image from "next/image";
import { apiBaseUrl } from "@/config";
import Link from "next/link";

interface BrandProps {
  brand: THomeControl;
  brands: TBrand[];
  isLoading: any;
}

const Brand: React.FC<BrandProps> = ({ brand, brands, isLoading }) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-8 md:py-12">
        <SectionHeader
          title={brand?.title || "Shop by Brands"}
          subTitle={
            brand?.subTitle || "Discover products from your favorite brands"
          }
        />

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white"
            >
              <div className="aspect-square animate-pulse bg-gray-100" />

              <div className="px-3 py-3">
                <div className="mx-auto h-3 w-20 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="Container md:mt-12 mt-6">
      <SectionHeader
        title={brand?.title || "Shop by Brands"}
        subTitle={
          brand?.subTitle || "Discover products from your favorite brands"
        }
      />

      <div className="mt-8 grid grid-cols-4 xl:gap-3 lg:gap-2 gap-2 sm:grid-cols-4  md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8">
        {brands?.map((brandItem) => (
          <Link
            href={`/brands/${brandItem.slug}`}
            key={brandItem._id}
            className="group relative overflow-hidden rounded border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
          >
            {/* Logo */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-50/70 p-5 transition-colors duration-300 group-hover:bg-primary/[0.03]">
              <Image
                src={apiBaseUrl + brandItem.image}
                alt={brandItem.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 12.5vw"
                className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Soft hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-primary/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Brand name */}
            <div className="border-t border-gray-100 px-2 py-3 text-center">
              <h3 className="truncate md:text-sm text-xs font-semibold text-gray-700 transition-colors duration-300 group-hover:text-primary">
                {brandItem.title}
              </h3>
            </div>

            {/* Bottom hover indicator */}
            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-12" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Brand;
