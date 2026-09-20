"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHome, RxInfoCircled } from "react-icons/rx";
import { Phone, Store, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const DownFooter2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const isBottom = windowHeight + scrollY >= documentHeight - 20;

      if (scrollY > 120 && !isBottom) {
        setIsVisible(true);

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        setIsVisible(false);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: RxHome,
    },
    {
      label: "About",
      href: "/about",
      icon: RxInfoCircled,
    },
    {
      label: "Shop",
      href: "/product",
      icon: Store,
      isShop: true,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
    },
    {
      label: "Account",
      href: "/account",
      icon: UserRound,
    },
  ];

  return (
    <div
      className={`
        fixed bottom-3 left-3 right-3 z-[999]
        md:hidden
        transition-all duration-500 ease-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0"
        }
      `}
    >
      <nav
  className="
    relative
    mx-auto
    flex
    h-[64px]
    max-w-md
    items-center
    rounded
    border
    border-gray-200
    bg-white
    px-2
    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
  "
>
  {/* LEFT */}
  <div className="flex flex-1 items-center justify-around">
    {navItems.slice(0, 2).map((item) => {
      const Icon = item.icon;

      const isActive =
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href));

      return (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Icon
            size={20}
            strokeWidth={isActive ? 2.4 : 1.8}
            className={isActive ? "text-primary" : "text-gray-500"}
          />

          <span
            className={`text-[10px] font-medium ${
              isActive ? "text-primary" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>
        </Link>
      );
    })}
  </div>

  {/* SHOP */}
  <Link
    href="/product"
    className="
      relative
      z-20
      mx-3
      -mt-8
      flex
      h-[72px]
      w-[72px]
      shrink-0
      flex-col
      items-center
      justify-center
      rounded-full
      border-[5px]
      border-white
      bg-primary
      text-white
      shadow-[0_5px_20px_rgba(0,0,0,0.18)]
    "
  >
    <Store size={24} strokeWidth={2} />

    <span className="mt-0.5 text-[10px] font-semibold">
      Shop
    </span>
  </Link>

  {/* RIGHT */}
  <div className="flex flex-1 items-center justify-around">
    {navItems.slice(3, 5).map((item) => {
      const Icon = item.icon;

      const isActive =
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href));

      return (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Icon
            size={20}
            strokeWidth={isActive ? 2.4 : 1.8}
            className={isActive ? "text-primary" : "text-gray-500"}
          />

          <span
            className={`text-[10px] font-medium ${
              isActive ? "text-primary" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>
        </Link>
      );
    })}
  </div>
</nav>
    </div>
  );
};

export default DownFooter2;
