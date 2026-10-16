"use client";

import { apiBaseUrl } from "@/config";
import { TFlashProduct } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Clock3,
  Copy,
  Check,
  Zap,
  TicketPercent,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

interface ProductProps {
  productList: TFlashProduct;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const initialTime: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const calculateTimeLeft = (expireDate?: string | Date): TimeLeft => {
  if (!expireDate) return initialTime;

  const difference = new Date(expireDate).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return initialTime;
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
};

const TimerBox = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => (
  <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-white shadow-sm sm:h-11">
      <span className="font-mono text-lg font-extrabold tracking-tight text-primary">
        {String(value).padStart(2, "0")}
      </span>
    </div>

    <span className="text-[9px] font-semibold uppercase tracking-wider text-white/75">
      {label}
    </span>
  </div>
);

const TimerBanner3: React.FC<ProductProps> = ({ productList }) => {
  const expireDate = productList?.couponId?.expireDate;
  const discount = productList?.couponId?.discount;
  const couponCode = productList?.couponId?.code;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime);
  const [hasMounted, setHasMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(expireDate));
    };

    updateTimer();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [expireDate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCopied(false);
  }, [couponCode]);

  const isExpired =
    hasMounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const handleCopyCode = async () => {
    if (!couponCode || isExpired) return;

    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      toast.success("Coupon code copied!");
    } catch {
      toast.error("Unable to copy coupon code");
    }
  };

  return (
    <article className="group relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[22px] border border-primary/15 bg-primary p-1 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/15">
      {/* Product Image */}
      <div className="relative aspect-[4/3] max-h-[180px] shrink-0 overflow-hidden rounded-[18px] bg-white/10">
        <Image
          src={apiBaseUrl + productList?.image}
          alt="Flash Sale"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        {/* Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

        {/* Flash Badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full border border-white/30 bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-primary shadow-md sm:text-[10px]">
          <Zap size={12} fill="currentColor" />
          Flash Sale
        </div>

        {/* Discount Badge */}
        {discount != null && discount > 0 && (
          <div className="absolute right-2 top-2 flex h-12 w-12 rotate-12 flex-col items-center justify-center rounded-xl bg-primary text-white shadow-lg ring-2 ring-white/30 transition-transform duration-300 group-hover:rotate-0 sm:h-14 sm:w-14">
            <span className="text-base font-black leading-none sm:text-lg">
              {discount}%
            </span>
            <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider">
              OFF
            </span>
          </div>
        )}

        {/* Image Bottom Text */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="mb-1 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Exclusive Deals
          </div>

          <h3 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
            Limited Time
            <span className="block">Special Offer</span>
          </h3>
        </div>
      </div>

      {/* Primary Content */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[18px] bg-primary px-3 pb-2.5 pt-3 sm:px-4">
        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full border border-white/10" />

        {/* Countdown Heading */}
        <div className="relative mb-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white sm:text-base">
              {isExpired ? "Offer Expired" : "Hurry! Time Is Running Out"}
            </h4>

            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/70">
              <Clock3 size={12} className="shrink-0" />
              <span>
                {isExpired
                  ? "This exclusive offer has ended"
                  : "Grab your deal before it's gone"}
              </span>
            </p>
          </div>

          {!isExpired && hasMounted && (
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[9px] font-bold text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </div>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="relative">
          {!hasMounted ? (
            <div className="grid grid-cols-4 gap-1.5">
              {["Days", "Hours", "Mins", "Secs"].map((label) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="h-10 animate-pulse rounded-lg bg-white/20 sm:h-11" />
                  <span className="text-center text-[9px] text-white/70">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : !isExpired ? (
            <div className="flex items-start gap-1.5">
              <TimerBox value={timeLeft.days} label="Days" />

              <span className="mt-2.5 text-sm font-bold text-white/60">
                :
              </span>

              <TimerBox value={timeLeft.hours} label="Hours" />

              <span className="mt-2.5 text-sm font-bold text-white/60">
                :
              </span>

              <TimerBox value={timeLeft.minutes} label="Mins" />

              <span className="mt-2.5 text-sm font-bold text-white/60">
                :
              </span>

              <TimerBox value={timeLeft.seconds} label="Secs" />
            </div>
          ) : (
            <div className="flex min-h-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-center">
              <span className="text-xs font-bold text-white">
                This Sale Has Ended
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-dashed border-white/25" />

        {/* Coupon Section */}
        <div className="relative mt-auto">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <TicketPercent size={15} className="shrink-0 text-white" />

              <span className="text-xs font-bold text-white">
                Exclusive Coupon
              </span>
            </div>

            {discount != null && discount > 0 && (
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold text-white">
                Save {discount}%
              </span>
            )}
          </div>

          {couponCode ? (
            <button
              type="button"
              onClick={handleCopyCode}
              disabled={isExpired || !hasMounted}
              aria-label={`Copy coupon code ${couponCode}`}
              className="flex w-full items-center justify-between gap-2 rounded-xl bg-white p-2.5 text-left shadow-sm transition-all duration-300 enabled:cursor-pointer enabled:hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-65"
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                  Use coupon code
                </span>

                <span className="truncate text-xs font-extrabold tracking-wider text-primary sm:text-sm">
                  {couponCode}
                </span>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                {copied ? <Check size={16} /> : <Copy size={15} />}
              </div>
            </button>
          ) : (
            <div className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-3 py-3">
              <span className="text-[10px] font-medium text-white/80">
                {discount != null && discount > 0
                  ? `Enjoy ${discount}% off this offer`
                  : "Explore our exclusive flash sale"}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[9px] font-medium text-white/65 sm:text-[10px]">
              Limited availability
            </span>

            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-white sm:text-[10px]">
              Don&apos;t miss out
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TimerBanner3;