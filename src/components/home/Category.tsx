"use client";

import { apiBaseUrl } from "@/config";
import { TCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface categoryProps {
  categoryList: TCategory[];
}

const Category: React.FC<categoryProps> = ({ categoryList }) => {
  return (
    <div className="Container mt-6">
      <Swiper
        slidesPerView={4}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 4 },
          700: { slidesPerView: 6 },
          768: { slidesPerView: 8 },
          1024: { slidesPerView: 9 },
          1280: { slidesPerView: 10 },
          1536: { slidesPerView: 10 },
        }}
        modules={[Navigation]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        // onSwiper={(swiper) => (swiperRef.current = swiper as SwiperClass)}
        speed={1000}
      >
        {categoryList?.map((category, index) => (
          <SwiperSlide key={category._id} className="px-1">
            <Link href={`/product?category=${category.slug}`}>
              <div className="overflow-hidden border border-[#262626]/24 hover:border-primary/40 duration-300 rounded cursor-pointer">
                <Image
                  src={`${apiBaseUrl}${category.image}`}
                  alt={category.categoryName}
                  width={80}
                  height={80}
                  unoptimized
                  className="bg-[#262626]/12 rounded hover:scale-110 duration-300 w-full h-full"
                  priority={index === 0}
                />
              </div>
              <p className=" md:text-[12px] text-[10px] text-center font-semibold capitalize mt-1 text-[#262626]/60 group-hover:text-primary duration-300">
                {category?.categoryName?.slice(0, 14) || "N/A"}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
