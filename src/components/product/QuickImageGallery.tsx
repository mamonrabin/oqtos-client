
"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { TProduct } from "@/types";
import { apiBaseUrl } from "@/config";

interface ProductProps {
  product: TProduct;
}

const QuickImageGallery: React.FC<ProductProps> = ({ product }) => {
  const { thumbnailImage, backviewImage, images } = product;

  // Get only valid images and remove duplicates
  const allImages = [
    thumbnailImage,
    backviewImage,
    ...(images || []),
  ].filter(
    (img, index, arr): img is string =>
      typeof img === "string" &&
      img.trim() !== "" &&
      arr.indexOf(img) === index
  );

  if (allImages.length === 0) return null;

  const hasMultipleImages = allImages.length > 1;

 
return (
  <div className="w-full min-w-0 max-w-full overflow-hidden">
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={0}
      loop={hasMultipleImages}
      pagination={
        hasMultipleImages
          ? { clickable: true, dynamicBullets: true }
          : false
      }
      className="w-full min-w-0 max-w-full overflow-hidden"
    >
      {allImages.map((img, index) => (
        <SwiperSlide key={img} className="min-w-0!">
          <div className="flex w-full min-w-0 items-center justify-center overflow-hidden border bg-gray-50">
            <Image
              src={`${apiBaseUrl}${img}`}
              alt={`${product.title || "Product"} - Image ${index + 1}`}
              width={600}
              height={600}
              priority={index === 0}
              unoptimized
              className="block  w-full object-contain h-[350px] md:h-auto md:max-h-[90vh] md:object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

};

export default QuickImageGallery;
