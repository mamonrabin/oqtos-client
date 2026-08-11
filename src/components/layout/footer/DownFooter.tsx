"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHome } from "react-icons/rx";
import {
  Phone,
  ShieldUser,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const DownFooter = () => {
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
      label: "Shop",
      href: "/product",
      icon: Store,
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
        fixed bottom-3 left-3 right-3 z-[999] border border-primary/10
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
          mx-auto
          flex max-w-md items-center justify-between
          rounded
          border border-gray-200
          bg-white/95
          px-2 py-2
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-md
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <div
                className={`
                  flex min-w-[58px]
                  flex-col items-center
                  justify-center
                  gap-0.5
                  rounded
                  px-2 py-1.5
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-500 hover:text-primary"
                  }
                `}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />

                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DownFooter;
