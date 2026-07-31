"use client";

import { apiBaseUrl } from "@/config";
import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface bannerProps {
  mainBanners: TBanner[];
}

const Banner: React.FC<bannerProps> = ({ mainBanners }) => {
  return (
    <div className="Container relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        // effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
        {mainBanners?.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="relative w-full aspect-[21/9] min-h-[200px] md:min-h-[400px] lg:min-h-[500px]">
              <Image
                src={`${apiBaseUrl}${banner.image}`}
                alt="Banner"
                fill
                unoptimized
                className="object-cover"
                priority
              />
              {/* Optional Overlay with Text */}
              {/* {banner.title && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">
                        {banner.subtitle}
                      </p>
                    )}
                    <button className="mt-4 px-6 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Shop Now
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


     
    </div>
  );
};

export default Banner;