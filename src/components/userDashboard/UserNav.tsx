"use client";
import { apiBaseUrl } from "@/config";
import { TLogo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCurrentUser } from "../auth/AuthContext";
import UserResponsivebar from "./UserResponsivebar";

interface logoProps {
  logoList: TLogo[];
}

const UserNav: React.FC<logoProps> = ({ logoList }) => {
  const { user } = useCurrentUser();
  return (
    <div className="py-6 flex items-center justify-between Container bg-white border-b shadow-xs sticky md:top-0 -top-1 z-50">
      <div className="md:hidden block">
        <UserResponsivebar/>
      </div>
      <Link href="/">
        <div className="flex  items-center justify-center  lg:w-auto w-full">
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
      </Link>

      <div className="md:flex hidden items-center justify-center gap-8 text-sm font-medium text-gray-600">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">My Profile</Link>
        <Link href="/my-orders">My Orders</Link>
        <Link href="/track-order">Track Order</Link>
        <Link href="/product" className="text-red-600">
          Go to Shop
        </Link>
      </div>

      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#262626] text-sm font-medium text-gray-300">
        {user?.name?.slice(0, 2)}
      </div>
    </div>
  );
};

export default UserNav;
