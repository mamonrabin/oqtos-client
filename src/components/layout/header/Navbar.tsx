/* eslint-disable react-hooks/rules-of-hooks */
import { apiBaseUrl } from "@/config";
import { getLogoAndFooter } from "@/services/logo.api";
import { TLogo } from "@/types";
import { menuList } from "@/utils/menuList";
import { Heart, Search, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Responsivebar from "./Responsivebar";
import CartSidebar from "@/components/cart/CartSidebar";
import UserMenu from "@/components/auth/UserMenu";


const Navbar = async () => {
  const { data: logoList } = await getLogoAndFooter();

  

  return (
    <div className="Container flex items-center justify-between py-3">
      <div className="lg:hidden">
        <Responsivebar logoList={logoList} />
      </div>
      <div className="flex  items-center justify-center md:ml-0 ml-10 lg:w-auto w-full">
        {logoList?.map((item: TLogo) => (
          <Image
            key={item._id}
            src={`${apiBaseUrl}${item.headerLogo}`}
            alt="optos"
            width={100}
            height={100}
            unoptimized
            className=""
          ></Image>
        ))}
      </div>
      <div>
        <ul className="lg:flex hidden  items-center gap-6 ">
          {menuList.map((menu, index) => (
            <li
              key={index}
              className="font-medium text-gray-600 hover:text-primary duration-300 translation-all"
            >
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center cursor-pointer">
        <button className="flex p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-blue-600">
          <Search size={18} />
        </button>

        <Link href="/logIn">
          <button className="p-2 lg:flex hidden cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-blue-600">
            <UserRound size={18} />
          </button>
        </Link>

        <UserMenu/>

        <button className="p-2 lg:flex hidden cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-blue-600 relative">
          <Heart size={18} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </button>
        <CartSidebar />
      </div>
    </div>
  );
};

export default Navbar;
