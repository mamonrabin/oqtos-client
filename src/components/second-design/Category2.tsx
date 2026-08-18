"use client";

import { apiBaseUrl } from "@/config";
import { TCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface CategoryProps {
  categoryList: TCategory[];
}

const Category2: React.FC<CategoryProps> = ({ categoryList }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="Container mt-8 md:mt-10">
      {/* Category Slider */}
      <div className="relative px-1">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={3.2}
          spaceBetween={10}
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 9,
              spaceBetween: 22,
            },
          }}
          loop={categoryList?.length > 9}
          grabCursor
          className="!pb-2"
        >
          {categoryList?.map((category, index) => (
            <SwiperSlide key={category._id}>
              <Link
                href={`/product?category=${category.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="mx-auto aspect-square w-full max-w-[110px] overflow-hidden rounded-full border border-gray-200 bg-gray-50 p-1.5 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md md:max-w-[120px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src={`${apiBaseUrl}${category.image}`}
                      alt={category.categoryName}
                      fill
                      sizes="120px"
                      unoptimized
                      priority={index < 3}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Category Name */}
                <p className="mt-2.5 truncate text-center text-xs font-semibold capitalize text-gray-700 transition-colors duration-300 group-hover:text-primary md:text-sm">
                  {category?.categoryName || "N/A"}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous categories"
          className="
    absolute -left-2 top-[55px] z-20 duration-300 cursor-pointer
    hidden h-9 w-9 -translate-y-1/2
    items-center justify-center
    rounded-full
    border border-gray-200
    bg-white
    text-gray-700
    shadow-sm
    transition-all 
    hover:border-primary
    hover:bg-primary
    hover:text-white
   
    hover:shadow-md
    active:scale-95
    sm:flex
    md:top-[60px]
    md:h-10 md:w-10
  "
        >
          <ChevronLeft size={19} strokeWidth={2} />
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next categories"
          className="
    absolute -right-2 top-[55px] z-20 duration-300 cursor-pointer
    hidden h-9 w-9 -translate-y-1/2
    items-center justify-center
    rounded-full
    border border-gray-200
    bg-white
    text-gray-700
    shadow-sm
    transition-all 
    hover:border-primary
    hover:bg-primary
    hover:text-white
    hover:shadow-md
    active:scale-95
    sm:flex
    md:top-[60px]
    md:h-10 md:w-10
  "
        >
          <ChevronRight size={19} strokeWidth={2} />
        </button>

        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-5 bg-gradient-to-r from-white to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-5 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
};

export default Category2;
