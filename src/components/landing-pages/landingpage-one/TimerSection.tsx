"use client";

import { useEffect, useState } from "react";

const TimerSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 22,
    minutes: 12,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  const timeUnits = [
    { label: "দিন", value: timeLeft.days },
    { label: "ঘণ্টা", value: timeLeft.hours },
    { label: "মিনিট", value: timeLeft.minutes },
    { label: "সেকেন্ড", value: timeLeft.seconds },
  ];

  return (
   <section className="flex w-full justify-center bg-[#F5F1E8] px-3 py-5 sm:px-6">
  <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-4 text-center">

    {/* Offer Message */}
    <div className="flex flex-col items-center">
      <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#087096]/10 text-sm">
        🔥
      </span>

      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7C6F5B] sm:text-xs">
        বিশেষ অফার
      </p>

      <h2 className="mt-1 text-sm font-bold leading-tight text-[#1F2933] sm:text-base md:text-lg">
        সময় শেষ হওয়ার আগেই অর্ডার করুন!
      </h2>
    </div>

    {/* Timer */}
    <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="flex items-center justify-center gap-2 sm:gap-3"
        >
          {/* Timer Box */}
          <div className="flex min-w-[55px] flex-col items-center justify-center rounded-lg bg-[#087096] px-2.5 py-2 shadow-md sm:min-w-[70px] sm:px-3 sm:py-2.5">
            <span className="text-lg font-extrabold leading-none tracking-wide text-white tabular-nums sm:text-xl">
              {formatTime(unit.value)}
            </span>

            <span className="mt-1 text-[8px] font-semibold text-white/70 sm:text-[9px]">
              {unit.label}
            </span>
          </div>

          {/* Colon */}
          {index < timeUnits.length - 1 && (
            <span className="text-sm font-bold text-[#087096]/50 sm:text-base">
              :
            </span>
          )}
        </div>
      ))}
    </div>

    {/* CTA */}
    <button className="my-3 rounded-full bg-[#C99A3D] px-7 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B88932] hover:shadow-lg active:scale-95 sm:px-8 sm:text-sm">
      এখনই অর্ডার করুন →
    </button>

  </div>
</section>
  );
};

export default TimerSection;