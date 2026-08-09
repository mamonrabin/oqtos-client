/* eslint-disable react-hooks/static-components */
"use client";

import { apiBaseUrl } from "@/config";
import { TFlashProduct } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Clock3, Copy, Zap } from "lucide-react";

interface ProductProps {
  productList: TFlashProduct;
}

const TimerBanner: React.FC<ProductProps> = ({ productList }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expireDate = new Date(
        productList?.couponId?.expireDate
      ).getTime();

      const difference = expireDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
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

  const TimerBox = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className="flex min-w-[48px] flex-col items-center sm:min-w-[58px]">
      <div
        className="
          flex h-11 w-full items-center justify-center
          rounded-lg border border-white/10
          bg-black/40 px-2
          shadow-lg backdrop-blur-md
          sm:h-14 sm:rounded-xl sm:px-3
        "
      >
        <span
          className="
            font-mono text-lg font-bold tracking-tight text-white
            sm:text-2xl
            lg:text-3xl
          "
        >
          {formatTime(value)}
        </span>
      </div>

      <span className="mt-1 text-[8px] font-medium uppercase tracking-widest text-white/60 sm:text-[10px]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded sm:min-h-[360px] lg:min-h-[420px]">
      {/* Image */}
      <Image
        src={apiBaseUrl + productList?.image}
        alt="Flash Sale"
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        unoptimized
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

      {/* Top subtle gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
  <div className="flex flex-col items-start">

    {/* Badge */}
    <div className="mb-2.5">
      <div className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg sm:text-xs">
        <Zap size={12} fill="currentColor" />
        Flash Sale
      </div>
    </div>

    {/* Title */}
    <div className="mb-3">
      <h3 className="max-w-[240px] text-xl font-bold leading-[1.1] text-white sm:text-2xl">
        Limited Time Offer
      </h3>

      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/70">
        <Clock3 size={13} />
        Hurry! This deal ends soon
      </p>
    </div>

    {/* Timer */}
    {!isExpired ? (
      <div className="w-full">
        <div className="grid w-full grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-1.5 sm:gap-2">

          <TimerBox
            value={timeLeft.days}
            label="Days"
          />

          <span className="mt-3 text-lg font-bold text-white/70">
            :
          </span>

          <TimerBox
            value={timeLeft.hours}
            label="Hours"
          />

          <span className="mt-3 text-lg font-bold text-white/70">
            :
          </span>

          <TimerBox
            value={timeLeft.minutes}
            label="Mins"
          />

          <span className="mt-3 text-lg font-bold text-white/70">
            :
          </span>

          <TimerBox
            value={timeLeft.seconds}
            label="Secs"
          />

        </div>
      </div>
    ) : (
      <div className="rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md">
        <span className="text-sm font-semibold text-white">
          Sale has ended
        </span>
      </div>
    )}

    {/* Discount + Code */}
    {productList?.couponId?.discount && (
      <div className="mt-3 flex w-full flex-wrap items-center gap-2">

        <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">
          {productList.couponId.discount}% OFF
        </span>

        {productList?.couponId?.code && (
          <div className="flex min-w-0 max-w-[170px] items-center gap-1.5 rounded-md border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-md">
            <span className="shrink-0 text-[10px] text-white/60">
              Code:
            </span>

            <span className="truncate text-[10px] font-semibold text-white">
              {productList.couponId.code}
            </span>

            <Copy
              size={11}
              className="shrink-0 text-white/60"
            />
          </div>
        )}

      </div>
    )}

  </div>
</div>
    </div>
  );
};

export default TimerBanner;