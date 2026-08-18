"use client";

import { apiBaseUrl } from "@/config";
import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerProps {
  mainBanners: TBanner[];
}

const Banner2Slide: React.FC<BannerProps> = ({ mainBanners }) => {
  const router = useRouter();

  const handleBannerClick = (banner: TBanner) => {
    if (banner.link?.trim()) {
      router.push(banner.link);
      return;
    }

    if (banner.category?.slug) {
      router.push(`/product?category=${banner.category.slug}`);
    }
  };

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={mainBanners?.length > 1}
        className="custome h-full w-full overflow-hidden rounded-xl"
      >
        {mainBanners?.map((banner) => {
          const isClickable =
            !!banner.link?.trim() || !!banner.category?.slug;

          return (
            <SwiperSlide key={banner._id} className="h-full w-full">
              <div
                onClick={() =>
                  isClickable && handleBannerClick(banner)
                }
                className={`relative h-full w-full ${
                  isClickable ? "cursor-pointer" : ""
                }`}
              >
                <Image
                  src={`${apiBaseUrl}${banner.image}`}
                  alt={banner.title || "banner"}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  className="object-cover
                  "
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner2Slide;