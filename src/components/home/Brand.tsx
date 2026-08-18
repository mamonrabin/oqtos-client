/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBrand, THomeControl } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import Image from "next/image";
import { apiBaseUrl } from "@/config";
import Link from "next/link";
import SectionHeader2 from "../shared/SectionHeader2";
import BrandCard from "../brand-card/BrandCard";
import BrandCard2 from "../brand-card/BrandCard2";

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
        {/* <SectionHeader title={brand?.title} subTitle={brand?.subTitle} /> */}
        <SectionHeader2 title={brand?.title} subTitle={brand?.subTitle} />

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
      {/* <SectionHeader
        title={brand?.title || "Shop by Brands"}
        subTitle={
          brand?.subTitle || "Discover products from your favorite brands"
        }
      /> */}
       <SectionHeader2 title={brand?.title} subTitle={brand?.subTitle} />

      <div className="grid grid-cols-4 xl:gap-3 lg:gap-2 gap-2 sm:grid-cols-4  md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8">
        {brands?.map((brandItem) => (
         <BrandCard key={brandItem._id} brandItem={brandItem}/>
        //  <BrandCard2 key={brandItem._id} brandItem={brandItem}/>
        ))}
      </div>
    </section>
  );
};

export default Brand;
