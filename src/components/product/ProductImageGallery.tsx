/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // Get all images
  const allImages = [
    product.thumbnailImage,
    product.backviewImage,
    ...(product.images || []),
  ].filter(Boolean);
  return (
    <div>
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image Slider */}
        <div className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden">
          <Swiper
            spaceBetween={0}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="product-main-slider"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-square flex items-center justify-center p-4 sm:p-6 md:p-8">
                  <Image
                    src={apiBaseUrl + image}
                    alt={`${product.title} - Image ${index + 1}`}
                    width={500}
                    height={500}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all border border-gray-200">
            <ChevronLeft size={16} className="sm:text-gray-700" />
          </button>
          <button className="swiper-button-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all border border-gray-200">
            <ChevronRight size={16} className="sm:text-gray-700" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
          >
            <Heart
              size={18}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
              }
            />
          </button>
        </div>

        {/* Thumbnail Slider */}
        {allImages.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
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
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-all">
                  <Image
                    src={apiBaseUrl + image}
                    alt={`Thumbnail ${index + 1}`}
                    width={500}
                    height={500}
                    unoptimized
                    className="w-full h-full object-cover"
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
