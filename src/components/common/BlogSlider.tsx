"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { TBlog} from "@/types";
import React from "react";
import BlogCard from "../Blog/BlogCard";

interface productProps {
  bloges: TBlog[];
  isLoading: boolean;
}

const BlogSlider: React.FC<productProps> = ({ bloges, isLoading }) => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={8}
        slidesPerView={1}
       
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
      >
        {bloges?.map((blog) => (
          <SwiperSlide key={blog._id}>
            {/* <ProductCard blog={blog} isLoading={isLoading} /> */}
            <BlogCard blog={blog} isLoading={isLoading}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;
