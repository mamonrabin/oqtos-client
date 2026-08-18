"use client";

import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToBottomToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;

      setVisible(scrollTop > 300);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (circumference * scrollProgress) / 100;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className="
        group fixed
       
        right-4
        z-50

        flex h-11 w-11
        items-center justify-center

        rounded-full
        border border-gray-100
        bg-white

        text-gray-700
        shadow-lg shadow-black/10

        transition-all duration-300

        hover:-translate-y-1
        hover:border-primary/20
        hover:bg-primary
        hover:text-white
        hover:shadow-xl
        hover:shadow-primary/20

        active:scale-90
        bottom-[9rem]
        md:bottom-[5.75rem]
        md:right-6
        md:h-12
        md:w-12
      "
    >
      {/* Progress Ring */}
      <svg
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          -rotate-90
        "
        viewBox="0 0 44 44"
      >
        {/* Background */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-200"
        />

        {/* Progress */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="
            text-primary
            transition-all duration-150
          "
        />
      </svg>

      {/* Arrow */}
      <ChevronUp
        size={18}
        strokeWidth={2}
        className="
          relative z-10
          transition-all duration-300
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
};

export default ScrollToBottomToTop;
