/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { TBrand, THomeControl } from "@/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import SectionHeader2 from "../shared/SectionHeader2";
import BrandCard2 from "../brand-card/BrandCard2";

import "swiper/css";

interface BrandProps {
  brand: THomeControl;
  brands: TBrand[];
  isLoading: any;
}

const Brand2: React.FC<BrandProps> = ({
  brand,
  brands,
  isLoading,
}) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <section className="Container mt-6 md:mt-12">
        <SectionHeader2
          title={brand?.title}
          subTitle={brand?.subTitle}
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
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
    <section className="Container mt-6 md:mt-12">
      {/* Section Header */}
      <SectionHeader2
        title={brand?.title}
        subTitle={brand?.subTitle}
      />

      {/* Brand Slider */}
      <div className="relative mt-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={2.5}
          navigation={{
            prevEl: ".brand2-prev",
            nextEl: ".brand2-next",
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          className="brand2-swiper !pb-2"
        >
          {brands?.map((brandItem) => (
            <SwiperSlide key={brandItem._id}>
              <BrandCard2 brandItem={brandItem} />
            </SwiperSlide>
          ))}
        </Swiper>

     

     
      </div>
    </section>
  );
};

export default Brand2;