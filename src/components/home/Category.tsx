"use client";

import { apiBaseUrl } from "@/config";
import { TCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface CategoryProps {
  categoryList: TCategory[];
}

const Category: React.FC<CategoryProps> = ({ categoryList }) => {
  return (
    <div className="Container mt-6">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={categoryList?.length > 10}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 8,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 9,
            spaceBetween: 12,
          },
          1280: {
            slidesPerView: 10,
            spaceBetween: 12,
          },
          1536: {
            slidesPerView: 10,
            spaceBetween: 14,
          },
        }}
        grabCursor
      >
        {categoryList?.map((category, index) => (
          <SwiperSlide key={category._id}>
            <Link href={`/product?category=${category.slug}`} className="group block">
              {/* Category Image */}
              <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-sm">
                <Image
                  src={`${apiBaseUrl}${category.image}`}
                  alt={category.categoryName}
                  width={80}
                  height={80}
                  unoptimized
                  priority={index === 0}
                  className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category Name */}
              <p className="mt-1.5 truncate text-center text-[11px] font-semibold capitalize text-gray-500 transition-colors duration-300 group-hover:text-primary md:text-xs">
                {category?.categoryName || "N/A"}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;