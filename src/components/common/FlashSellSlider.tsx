"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { TProduct } from "@/types";
import React from "react";
import ProductCard from "../product/ProductCard";

interface productProps {
  flashProducts: TProduct[];
  isLoading: boolean;
}

const FlashSellSlider: React.FC<productProps> = ({ flashProducts, isLoading }) => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={8}
        slidesPerView={2}
       
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
      >
        {flashProducts?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} isLoading={isLoading} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashSellSlider;
