
"use client";

import { apiBaseUrl } from "@/config";
import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface BannerProps {
  mainBanners: TBanner[];
}

const Banner4: React.FC<BannerProps> = ({ mainBanners }) => {
  const router = useRouter();

  const handleBannerClick = (banner: TBanner) => {
    if (banner.link?.trim()) {
      router.push(banner.link);
      return;
    }

    if (banner.category?.slug) {
      router.push(
        `/product?category=${encodeURIComponent(banner.category.slug)}`
      );
    }
  };

  if (!mainBanners?.length) return null;

  const hasMultiple = mainBanners.length > 1;

  return (
    <section className="Container relative rounded-lg">
      <div className="banner4 group rounded-lg relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
       
          slidesPerView={1}
          spaceBetween={0}
          speed={500}
          loop={hasMultiple}
          autoplay={
            hasMultiple
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={{
            prevEl: ".banner4-prev",
            nextEl: ".banner4-next",
          }}
          pagination={{
            el: ".banner4-pagination",
            clickable: true,
          }}
          className="w-full"
        >
          {mainBanners.map((banner, index) => {
            const isClickable =
              !!banner.link?.trim() || !!banner.category?.slug;

            return (
              <SwiperSlide key={banner._id}>
                <div
                  onClick={() =>
                    isClickable && handleBannerClick(banner)
                  }
                  onKeyDown={(e) => {
                    if (
                      isClickable &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleBannerClick(banner);
                    }
                  }}
                  role={isClickable ? "link" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  className={`relative w-full md:aspect-[16/4] aspect-[10/4] ${
                    isClickable ? "cursor-pointer" : ""
                  }`}
                >
                  <Image
                    src={`${apiBaseUrl}${banner.image}`}
                    alt={banner.title || "Promotional banner"}
                    fill
                    unoptimized
                    priority={index === 0}
                    
                    className="object-center"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {hasMultiple && (
          <>
            {/* Previous */}
            <button
              type="button"
              aria-label="Previous banner"
              className="banner4-prev text-primary border border-primary/20 font-bold absolute top-1/2 left-3 z-20  h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90  shadow-md transition-all duration-300 flex"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next */}
            <button
              type="button"
              aria-label="Next banner"
              className="banner4-next text-primary border border-primary/20 font-bold absolute top-1/2 right-3 z-20  h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90  shadow-md transition-all duration-300 flex"
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination */}
            <div className="banner4-pagination absolute! bottom-3! left-1/2! z-20! flex! w-auto! -translate-x-1/2 items-center justify-center gap-1.5" />
          </>
        )}
      </div>

  
    </section>
  );
};

export default Banner4;
