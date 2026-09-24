"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { TBanner } from "@/types";
import { apiBaseUrl } from "@/config";
import Link from "next/link";

const COUNT_KEY = "oqtos-popup-count";
const COOLDOWN_KEY = "oqtos-popup-cooldown";

interface BannerProps {
  bannerList: TBanner[];
}

const WelcomePopup: React.FC<BannerProps> = ({ bannerList }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Only use Promotion banner
  const banner = bannerList?.find((item) => item.type === "Promotion");

  // Popup logic
  useEffect(() => {
    if (!banner) {
      console.log("No Promotion banner found");
      return;
    }

    const now = Date.now();

    let count = Number(localStorage.getItem(COUNT_KEY) || "0");

    const cooldownUntil = Number(localStorage.getItem(COOLDOWN_KEY) || "0");

    console.log("Promotion banner:", banner);
    console.log("Current count:", count);
    console.log("Cooldown:", cooldownUntil);

    // Still inside cooldown
    if (now < cooldownUntil) {
      console.log("Popup is in cooldown");
      return;
    }

    // Reset after cooldown
    if (cooldownUntil && now >= cooldownUntil) {
      count = 0;

      localStorage.removeItem(COOLDOWN_KEY);
      localStorage.setItem(COUNT_KEY, "0");
    }

    // Show maximum 10 times
    if (count >= 3) {
      console.log("Popup limit reached");
      return;
    }

    const newCount = count + 1;

    localStorage.setItem(COUNT_KEY, String(newCount));

    console.log("Opening popup:", newCount);

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    // After 3th popup → 5 minute cooldown
    if (newCount === 3) {
      const fiveMinutes = 5 * 60 * 1000;

      localStorage.setItem(COOLDOWN_KEY, String(Date.now() + fiveMinutes));

      console.log("5 minute cooldown started");
    }

    return () => clearTimeout(timer);
  }, [banner]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && banner && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#262626]/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden bg-white rounded shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute border right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              aria-label="Close popup"
            >
              <X size={20} />
            </motion.button>

            {/* Image */}
            <Link href={banner.link || "/"}>
              <div className="relative h-[300px] w-full md:h-[500px] rounded border">
                <Image
                  src={`${apiBaseUrl}${banner.image}`}
                  alt="Promotion"
                  fill
                  priority
                  unoptimized
                  className="object-cover p-5"
                />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
