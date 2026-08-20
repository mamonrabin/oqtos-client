import { TFlashProduct, THomeControl } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import Image from "next/image";
import { apiBaseUrl } from "@/config";
import FlashSellSlider from "../common/FlashSellSlider";
import TimerBanner from "../common/TimerBanner";
import SectionHeader2 from "../shared/SectionHeader2";
import TimerBanner2 from "../common/TimerBanner2";
import { TCustome } from "@/types/customeType";

interface ProductProps {
  flashSale: THomeControl;
  productList: TFlashProduct;
  design: TCustome;
  isLoading: boolean;
}

const FlashSellProducts: React.FC<ProductProps> = ({
  flashSale,
  productList,
  isLoading,
  design,
}) => {
  const flashProducts = Array.isArray(productList?.products)
    ? productList.products
    : [];

  const sectionHead = design?.home?.sectionHead || "Default";
  const flashBanner = design?.home?.flashBanner || "Default";

  return (
    <section className="Container md:mt-12 mt-6">
      {sectionHead === "Default" ? (
        <SectionHeader title={flashSale.title} subTitle={flashSale.subTitle} />
      ) : (
        <SectionHeader2 title={flashSale.title} subTitle={flashSale.subTitle} />
      )}

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        {/* Flash Sale Banner */}
        <div className="w-full lg:w-[30%] xl:w-[28%]">
          {flashBanner === "Default" ? (
            <TimerBanner productList={productList} />
          ) : (
            <TimerBanner2 productList={productList} />
          )}
        </div>

        {/* Products */}
        <div className="w-full min-w-0 lg:w-[70%] xl:w-[72%]">
          <FlashSellSlider
            flashProducts={flashProducts}
            isLoading={isLoading}
            design={design}
          />
        </div>
      </div>
    </section>
  );
};

export default FlashSellProducts;
