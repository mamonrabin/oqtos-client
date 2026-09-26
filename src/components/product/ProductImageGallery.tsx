/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TProduct } from "@/types";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";

import { apiBaseUrl } from "@/config";

interface ProductDetailsProps {
  product: TProduct;
}

const ProductImageGallery: React.FC<ProductDetailsProps> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [zoom, setZoom] = useState({
    active: false,
    x: 50,
    y: 50,
  });

  const allImages = [
    product.thumbnailImage,
    product.backviewImage,
    ...(product.images || []),
  ].filter(Boolean);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoom({
      active: true,
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setZoom({
      active: false,
      x: 50,
      y: 50,
    });
  };

  return (
    <div className="w-full">
      <div className="space-y-3 sm:space-y-4">

        {/* Main Image */}
        <div className="relative overflow-hidden rounded-xl bg-gray-50 sm:rounded-2xl">
          <Swiper
            spaceBetween={0}
            navigation={{
              prevEl: ".product-prev",
              nextEl: ".product-next",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed
                  ? thumbsSwiper
                  : null,
            }}
            modules={[Navigation, Thumbs]}
            className="product-main-slider"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-square flex items-center justify-center p-4 sm:p-6 md:p-8">

                  {/* Zoom Container */}
                  <div
                    className="relative h-full w-full overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={apiBaseUrl + image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      priority={index === 0}
                      unoptimized
                      className="object-contain transition-transform cursor-all-scroll duration-200 ease-out"
                      style={{
                        transform: zoom.active
                          ? "scale(2)"
                          : "scale(1)",
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      }}
                    />

                    {/* Zoom Hint */}
                    {!zoom.active && (
                      <div className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">
                        Hover to zoom
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous */}
          {allImages.length > 1 && (
            <button
              type="button"
              className="product-prev absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next */}
          {allImages.length > 1 && (
            <button
              type="button"
              className="product-next absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Wishlist */}
          <button
            type="button"
            onClick={() =>
              setIsWishlisted((prev) => !prev)
            }
            className="absolute right-2 top-2 z-30 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white sm:right-4 sm:top-4 sm:p-2.5"
          >
            <Heart
              size={18}
              className={
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700"
              }
            />
          </button>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className="product-thumb-slider"
            breakpoints={{
              320: {
                slidesPerView: 4,
                spaceBetween: 6,
              },
              480: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition hover:border-primary">
                  <Image
                    src={apiBaseUrl + image}
                    alt={`Thumbnail ${index + 1}`}
                    width={500}
                    height={500}
                    unoptimized
                    className="h-full w-full object-cover cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;