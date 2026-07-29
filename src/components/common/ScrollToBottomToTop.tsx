"use client";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToBottomToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 z-10 right-4 bg-black text-white px-2 py-2 border border-white/20 rounded cursor-pointer hover:bg-primary duration-300"
    >
      <ChevronUp size={18} />
    </button>
  ) : null;
};

export default ScrollToBottomToTop;
