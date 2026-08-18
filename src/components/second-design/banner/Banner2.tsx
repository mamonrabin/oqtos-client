import React from "react";
import BannerCategory from "./BannerCategory";
import { TBanner, TCategory, TSubCategory } from "@/types";

import Banner2Slide from "./Banner2Slide";

interface CategoryProps {
  categoryList: TCategory[];
  subcategoryList: TSubCategory[];
  mainBanners: TBanner[]
}


const Banner2: React.FC<CategoryProps> = ({ categoryList,subcategoryList, mainBanners }) => {
  return (
    <div className="Container mt-4 flex gap-4">
      {/* Category Sidebar */}
      <div className="w-[240px] lg:block hidden shrink-0">
        <BannerCategory categoryList={categoryList} subcategoryList={subcategoryList} />
      </div>

      {/* Banner Slider */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-xl">
        <div className="flex h-[420px] items-center justify-center">
        <Banner2Slide mainBanners={mainBanners}/>
        </div>
      </div>
    </div>
  );
};

export default Banner2;