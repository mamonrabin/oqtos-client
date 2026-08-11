"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import {
  ArrowRightLeft,
  Headphones,
  HandCoins,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ৳2,000",
  },
  {
    icon: ArrowRightLeft,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: Headphones,
    title: "Online Support",
    description: "We're here to help",
  },
  {
    icon: HandCoins,
    title: "Secure Payment",
    description: "Multiple payment options",
  },
];

const TopFooter = () => {
  return (
    <section className="Container mt-12 bg-primary px-5 py-6 sm:px-8 lg:px-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1.8}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <SwiperSlide key={feature.title}>
              <div
                className={`
                  flex items-center  gap-3
                  px-2 sm:px-4 lg:px-6
                  ${
                    index !== 0
                      ? "lg:border-l lg:border-white/15"
                      : ""
                  }
                `}
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-4 text-white/70 sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TopFooter;