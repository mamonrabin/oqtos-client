import React from "react";
import logo from "@/assets/logo/logo2.svg";
import Image from "next/image";
import AnnouncementBar from "./AnnouncementBar";

const LogoSection = () => {
  return (
    <div className="relative flex w-full items-center justify-center">

      {/* Moving announcement behind logo */}
      <AnnouncementBar />

      {/* Circular logo */}
      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-primary p-3 shadow-lg md:h-36 md:w-36">
        <Image
          src={logo}
          alt="Store Logo"
          width={120}
          height={120}
          className="h-full w-full rounded-full object-contain"
          priority
        />
      </div>

    </div>
  );
};

export default LogoSection;