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


interface ProductImageGalleryProps {
  product: TProduct;
}

const ProductImageGallery = ({
  product,
}: ProductImageGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const allImages = [
    product.thumbnailImage,
    product.backviewImage,
    ...(product.images || []),
  ].filter(Boolean) as string[];

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.setProperty("--zoom-x", `${x}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${y}%`);
    e.currentTarget.classList.add("is-zoomed");
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.currentTarget.classList.remove("is-zoomed");
    e.currentTarget.style.setProperty("--zoom-x", "50%");
    e.currentTarget.style.setProperty("--zoom-y", "50%");
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
              <SwiperSlide key={`${image}-${index}`}>
                <div className="flex aspect-square items-center justify-center p-4 sm:p-6 md:p-8">
                  <div
                    className="product-zoom relative h-full w-full overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="product-zoom-image object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous */}
          {allImages.length > 1 && (
            <button
              type="button"
              aria-label="Previous product image"
              className="product-prev absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next */}
          {allImages.length > 1 && (
            <button
              type="button"
              aria-label="Next product image"
              className="product-next absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Wishlist */}
          <button
            type="button"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            onClick={() => setIsWishlisted((prev) => !prev)}
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
              320: { slidesPerView: 4, spaceBetween: 6 },
              480: { slidesPerView: 4, spaceBetween: 8 },
              768: { slidesPerView: 5, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 10 },
            }}
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={`thumb-${image}-${index}`}>
                <div className="aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition hover:border-primary">
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    width={120}
                    height={120}
                    sizes="(max-width: 480px) 25vw, 120px"
                    loading="lazy"
                    className="h-full w-full cursor-pointer object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .product-zoom-image {
          transform: scale(1);
          transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
          transition: transform 200ms ease-out;
        }

        .product-zoom.is-zoomed .product-zoom-image {
          transform: scale(2);
        }

        @media (hover: none) {
          .product-zoom.is-zoomed .product-zoom-image {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductImageGallery;
