
"use client";

import { apiBaseUrl } from "@/config";
import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
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

const Banner3: React.FC<BannerProps> = ({ mainBanners }) => {
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

  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          speed={900}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={mainBanners.length > 1}
          className="banner3-swiper"
        >
          {mainBanners?.map((banner, index) => {
            const isClickable =
              !!banner.link?.trim() || !!banner.category?.slug;

            return (
              <SwiperSlide key={banner._id}>
                <div className="relative flex min-h-[350px] w-full items-center overflow-hidden sm:min-h-[420px] lg:min-h-[500px] xl:min-h-[540px]">
                  {/* Banner Image */}
                  <Image
                    src={`${apiBaseUrl}${banner.image}`}
                    alt={banner.title || "Banner"}
                    fill
                    unoptimized
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />

                  {/* Primary Gradient Overlay */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary/95 via-primary/70 to-white/10" />

                  {/* Subtle Bottom Overlay */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 w-full px-5 py-12 sm:px-10 md:px-14 lg:px-20">
                    <div className="max-w-[600px] space-y-5 text-white">
                      {/* Title */}
                      <h2 className="max-w-[570px] capitalize text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl xl:text-[56px]">
                        {banner.title}
                      </h2>

                      {/* Description */}
                      {banner.description && (
                        <p className="max-w-[550px] text-sm leading-6 text-white/85 sm:text-base">
                          {banner.description}
                        </p>
                      )}

                      {/* Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            isClickable
                              ? handleBannerClick(banner)
                              : router.push("/product")
                          }
                          className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg sm:px-7 sm:py-3.5"
                        >
                          <ShoppingBag size={17} />
                          Shop New Arrivals
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => router.push("/product")}
                          className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white/70 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 sm:px-7 sm:py-3.5"
                        >
                          Explore All Products
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      
    </section>
  );
};

export default Banner3;
