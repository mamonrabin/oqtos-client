"use client";


import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface BannerProps {
  mainBanners: TBanner[];
}

const Banner: React.FC<BannerProps> = ({ mainBanners }) => {
  const router = useRouter();

  const handleBannerClick = (banner: TBanner) => {
    // If banner has a link, go to the link
    if (banner.link?.trim()) {
      router.push(banner.link);
      return;
    }

    // If no link but category exists, go to category products
    if (banner.category?.slug) {
      router.push(`/product?category=${banner.category.slug}`);
    }
  };

  return (
    <div className="Container relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="overflow-hidden"
      >
        {mainBanners?.map((banner) => {
          const isClickable =
            !!banner.link?.trim() || !!banner.category?.slug;

          return (
            <SwiperSlide key={banner._id}>
              <div
                onClick={() =>
                  isClickable && handleBannerClick(banner)
                }
                className={`relative w-full aspect-[21/9] min-h-[200px] md:min-h-[400px] lg:min-h-[500px] ${
                  isClickable ? "cursor-pointer" : ""
                }`}
              >
                <Image
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  fill
                  className=""
                  priority
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;