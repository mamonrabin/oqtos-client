
"use client";

import { hindSiliguri } from "@/app/font";
import {
  Star,
  Quote,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "সুমাইয়া আক্তার",
    location: "ঢাকা",
    initials: "সু",
    rating: 5,
    date: "কাস্টমার রিভিউ",
    review:
      "বেবি বোরকা ও হিজাব সেটটি দেখতে অনেক সুন্দর। ফেব্রিকও বেশ আরামদায়ক মনে হয়েছে। পুরো সেটটি আমার খুব পছন্দ হয়েছে।",
  },
  {
    name: "নুসরাত জাহান",
    location: "চট্টগ্রাম",
    initials: "নু",
    rating: 5,
    date: "কাস্টমার রিভিউ",
    review:
      "ডিজাইনটি খুবই সুন্দর এবং ছবির মতো একটি সেট খুঁজছিলাম। অর্ডার করার আগে সাইজ ও কালার সম্পর্কে বিস্তারিত জানতে পেরেছি।",
  },
  {
    name: "ফারজানা রহমান",
    location: "রাজশাহী",
    initials: "ফা",
    rating: 5,
    date: "কাস্টমার রিভিউ",
    review:
      "ছোট্ট সোনামণির জন্য সুন্দর একটি সেট। কালার ও ডিজাইন দুটোই ভালো লেগেছে। কেনার আগে যোগাযোগ করাও সহজ ছিল।",
  },
  {
    name: "তাসনিম আক্তার",
    location: "সিলেট",
    initials: "তা",
    rating: 5,
    date: "কাস্টমার রিভিউ",
    review:
      "বেবি বোরকা ও হিজাব একসাথে পাওয়ার বিষয়টি ভালো লেগেছে। কেনার আগে প্রয়োজনীয় তথ্য জানতে পেরেছি।",
  },
];

const ReviewSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="reviews"
      className={`${hindSiliguri.className} relative overflow-hidden bg-[#f3f9fb] px-4 py-16 sm:py-24`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <MessageCircle size={16} />
            কাস্টমারদের মতামত
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            ভালোবাসা ও সন্তুষ্টি,<span className="text-primary">
              আমাদের অনুপ্রেরণা
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            আমাদের পণ্য সম্পর্কে ক্রেতাদের মতামত ও অভিজ্ঞতা
              জানুন।
          </p>
        </div>

        {/* Slider controls */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-600">
            কাস্টমার রিভিউ
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Next review"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Review slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".review-pagination",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!overflow-visible"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={`${review.name}-${index}`} className="!h-auto">
              <article className="group flex h-full min-h-[290px] flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 sm:p-6">
                {/* Quote and stars */}
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Quote size={22} />
                  </span>

                  <div className="flex items-center gap-0.5 rounded-full bg-amber-50 px-3 py-1.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="mt-5 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                  “{review.review}”
                </p>

                {/* Customer info */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-500 text-sm font-bold text-white">
                    {review.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {review.location} · {review.date}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    ক্রেতা
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="review-pagination mt-8 flex justify-center" />

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-primary/10 bg-white p-6 shadow-sm sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900">
              আপনার সোনামণির জন্য অর্ডার করতে চান?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              পণ্য সম্পর্কে জানতে বা অর্ডার করতে যোগাযোগ করুন।
            </p>
          </div>

          <a
            href="#order"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            এখনই অর্ডার করুন
            <ChevronRight size={19} />
          </a>
        </div>
      </div>

      {/* Swiper pagination styles */}
      <style jsx global>{`
        .review-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          border-radius: 9999px;
          background: #94a3b8;
          opacity: 0.55;
          transition: all 0.3s ease;
        }

        .review-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: var(--color-primary, #087895);
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
