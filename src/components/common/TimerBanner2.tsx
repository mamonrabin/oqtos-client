"use client";

import { apiBaseUrl } from "@/config";
import { TFlashProduct } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Copy, Zap } from "lucide-react";

interface ProductProps {
  productList: TFlashProduct;
}

const TimerBanner2: React.FC<ProductProps> = ({ productList }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expireDate = new Date(
        productList?.couponId?.expireDate
      ).getTime();

      const difference = expireDate - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(
            difference / (1000 * 60 * 60 * 24)
          ),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) /
              (1000 * 60)
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000
          ),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [productList?.couponId?.expireDate]);

  const formatTime = (value: number) =>
    value.toString().padStart(2, "0");

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div
      className="
        group relative
        flex h-full min-h-[300px]
        flex-col overflow-hidden
        rounded-2xl
        bg-gray-950
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-primary/10
        sm:min-h-[360px]
      "
    >
      {/* Background image */}
      <Image
        src={`${apiBaseUrl}${productList?.image}`}
        alt="Flash Sale"
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 50vw"
        className="
          object-cover
          opacity-60
          transition-all duration-700
          group-hover:scale-105
          group-hover:opacity-70
        "
      />

      {/* Image tint */}
      <div className="absolute inset-0 bg-gray-950/55" />

      {/* Decorative glow */}
      <div
        className="
          absolute -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-primary/30
          blur-3xl
        "
      />

      {/* Discount circle */}
      {productList?.couponId?.discount && (
        <div
          className="
            absolute right-4 top-4
            flex h-16 w-16
            rotate-6
            flex-col items-center justify-center
            rounded-full
            border border-white/20
            bg-primary
            text-white
            shadow-lg
            transition-transform duration-300
            group-hover:rotate-0
            sm:h-[72px] sm:w-[72px]
          "
        >
          <span className="text-base font-black leading-none sm:text-lg">
            {productList.couponId.discount}%
          </span>

          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wider">
            OFF
          </span>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        {/* Small label */}
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary">
            <Zap size={13} fill="currentColor" />
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
            Flash Sale
          </span>
        </div>

        {/* Main title */}
        <div className="mt-auto">
          <div className="mb-3 max-w-[220px]">
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-primary">
              Limited offer
            </p>

            <h2 className="text-2xl font-black leading-[1.05] tracking-tight text-white sm:text-3xl">
              Hurry,
              <br />
              Time is Running!
            </h2>
          </div>

          {/* Timer */}
          {!isExpired ? (
            <div className="flex items-end gap-1.5">
              {/* Days */}
              <div>
                <div className="flex h-12 min-w-[48px] items-center justify-center rounded-lg bg-white px-2 sm:h-14 sm:min-w-[55px]">
                  <span className="font-mono text-lg font-black text-gray-900 sm:text-xl">
                    {formatTime(timeLeft.days)}
                  </span>
                </div>

                <p className="mt-1 text-center text-[7px] font-bold uppercase tracking-wider text-white/50">
                  Days
                </p>
              </div>

              <span className="mb-5 text-white/40">:</span>

              {/* Hours */}
              <div>
                <div className="flex h-12 min-w-[48px] items-center justify-center rounded-lg bg-white/10 px-2 backdrop-blur-md sm:h-14 sm:min-w-[55px]">
                  <span className="font-mono text-lg font-black text-white sm:text-xl">
                    {formatTime(timeLeft.hours)}
                  </span>
                </div>

                <p className="mt-1 text-center text-[7px] font-bold uppercase tracking-wider text-white/50">
                  Hours
                </p>
              </div>

              <span className="mb-5 text-white/40">:</span>

              {/* Minutes */}
              <div>
                <div className="flex h-12 min-w-[48px] items-center justify-center rounded-lg bg-white/10 px-2 backdrop-blur-md sm:h-14 sm:min-w-[55px]">
                  <span className="font-mono text-lg font-black text-white sm:text-xl">
                    {formatTime(timeLeft.minutes)}
                  </span>
                </div>

                <p className="mt-1 text-center text-[7px] font-bold uppercase tracking-wider text-white/50">
                  Min
                </p>
              </div>

              <span className="mb-5 text-white/40">:</span>

              {/* Seconds */}
              <div>
                <div className="flex h-12 min-w-[48px] items-center justify-center rounded-lg bg-primary px-2 shadow-lg shadow-primary/20 sm:h-14 sm:min-w-[55px]">
                  <span className="font-mono text-lg font-black text-white sm:text-xl">
                    {formatTime(timeLeft.seconds)}
                  </span>
                </div>

                <p className="mt-1 text-center text-[7px] font-bold uppercase tracking-wider text-white/50">
                  Sec
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white px-4 py-3 text-center">
              <span className="text-sm font-bold text-gray-900">
                Sale has ended
              </span>
            </div>
          )}

          {/* Bottom row */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            {productList?.couponId?.code ? (
              <div className="flex items-center gap-2">
                <span className="text-[8px] uppercase tracking-wider text-white/40">
                  Coupon
                </span>

                <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1">
                  <span className="text-[9px] font-bold text-white">
                    {productList.couponId.code}
                  </span>

                  <Copy
                    size={10}
                    className="text-white/40"
                  />
                </div>
              </div>
            ) : (
              <span className="text-[9px] text-white/40">
                Limited time only
              </span>
            )}

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerBanner2;