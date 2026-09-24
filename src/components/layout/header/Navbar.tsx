/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { apiBaseUrl } from "@/config";
import { TCategory, TLogo, TSubCategory } from "@/types";
import { menuList } from "@/utils/menuList";
import { Heart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Responsivebar from "./Responsivebar";
import CartSidebar from "@/components/cart/CartSidebar";
import UserMenu from "@/components/auth/UserMenu";
import { useCurrentUser } from "@/components/auth/AuthContext";
import SearchBar from "@/components/common/SerachBar";
import SearchBar2 from "@/components/common/SerachBar2";
import { TCustome } from "@/types/customeType";
import { useWishlist } from "@/components/wish-list/WishlistContext";

interface logoProps {
  logoList: TLogo[];
  categoryList: TCategory[];
  subcategoryList: TSubCategory[];
  design: TCustome;
}

const Navbar: React.FC<logoProps> = ({
  logoList,
  categoryList,
  subcategoryList,
  design,
}) => {
  const { user } = useCurrentUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchSection = design?.search?.searchSection === "Default";

// for wishlist fetching
const { wishlist } = useWishlist();

  return (
    <div
      className={`Container sticky -top-2 z-50 flex items-center justify-between bg-white py-3 transition-all duration-300 ${
        isScrolled
          ? "border-b shadow-xs"
          : "border-b border-transparent shadow-none"
      }`}
    >
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Responsivebar
          logoList={logoList}
          categoryList={categoryList}
          subcategoryList={subcategoryList}
        />
      </div>

      {/* Logo */}
      <Link href="/">
        <div className="flex items-center justify-center lg:w-auto w-full">
          {logoList?.map((item: TLogo) => (
            <Image
              key={item._id}
              src={`${apiBaseUrl}${item.headerLogo}`}
              alt="optos"
              width={100}
              height={100}
              unoptimized
            />
          ))}
        </div>
      </Link>

      {/* Menu */}
      <div>
        <ul className="hidden items-center gap-6 lg:flex">
          {menuList.map((menu, index) => (
            <li
              key={index}
              className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
            >
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex cursor-pointer items-center">
        {searchSection ? (
          <SearchBar categoryList={categoryList} />
        ) : (
          <SearchBar2 categoryList={categoryList} />
        )}

        {user ? (
          <UserMenu />
        ) : (
          <Link href="/logIn">
            <button className="hidden cursor-pointer rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-primary lg:flex">
              <UserRound size={18} />
            </button>
          </Link>
        )}

        <Link href="/wise-list">
          <button className="relative hidden cursor-pointer rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-primary lg:flex">
            <Heart size={18} />

            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {wishlist.length}
            </span>
          </button>
        </Link>

        <CartSidebar />
      </div>
    </div>
  );
};

export default Navbar;
