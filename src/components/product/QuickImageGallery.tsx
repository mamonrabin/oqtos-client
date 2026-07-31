"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TProduct } from "@/types";
import { apiBaseUrl } from "@/config";

interface productProps {
  product: TProduct;
}

const QuickImageGallery: React.FC<productProps> = ({ product }) => {
  const { thumbnailImage, backviewImage, images } = product;
  const allImages = [thumbnailImage, backviewImage, ...images];

  return (
    <div>
      <div className="md:w-full hidden md:block h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation={false}
          autoplay={false}
          pagination={{ clickable: true }}
          // autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="overflow-hidden"
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center w-full bg-gray-50 border overflow-hidden">
                <Image
                  src={apiBaseUrl + img}
                  alt={`Product ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full  max-h-[90vh] object-cover"
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <div className="flex md:hidden justify-center items-center w-full bg-gray-50 border">
          <Image
            src={apiBaseUrl + thumbnailImage}
            alt="thumbelImage"
            width={600}
            height={600}
             className="w-full  max-h-[90vh] object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default QuickImageGallery;
