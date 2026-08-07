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
  productList: TProduct[];
  isLoading: boolean;
}

const ProductSlider: React.FC<productProps> = ({ productList, isLoading }) => {
  return (
    <div className="mt-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={8}
        slidesPerView={2}
       
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
          1536: { slidesPerView: 4 },
        }}
      >
        {productList?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} isLoading={isLoading} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
