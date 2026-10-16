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
import ProductCard2 from "../product/ProductCard2";
import { TCustome } from "@/types/customeType";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard3 from "../product/ProductCard3";

interface productProps {
  productList: TProduct[];
  design: TCustome;
  isLoading: boolean;
}

const ProductSlider: React.FC<productProps> = ({
  productList,
  isLoading,
  design,
}) => {
  const cardType = design?.shop?.cardType || "Default";
  const cardCount = design?.shop?.cardCount || "4cards";

  const desktopCardCount =
    {
      "3cards": 3,
      "4cards": 4,
      "5cards": 5,
      "6cards": 6,
    }[cardCount] || 4;

  console.log("cardCount", cardCount);
  return (
    <div className="">
      <div className="flex items-end justify-end  mb-2">
        <Link
          href="/product"
          className="group inline-flex items-center gap-1.5 md:text-sm text-xs font-medium text-primary transition-colors duration-300 hover:text-black"
        >
          <span>View More</span>

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={8}
        slidesPerView={2}
        loop={true}
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
          1280: {
            slidesPerView: Math.min(desktopCardCount, 6),
          },
          1536: {
            slidesPerView: desktopCardCount,
          },
        }}
      >
        {productList?.map((product) => (
          <SwiperSlide key={product._id}>
            {cardType === "SecondCard" ? (
              <ProductCard2 product={product} isLoading={isLoading} />
            ) : cardType === "ThirdCard" ? (
              <ProductCard3 product={product} isLoading={isLoading} />
            ) : (
              <ProductCard product={product} isLoading={isLoading} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
