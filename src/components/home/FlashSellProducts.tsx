import { TFlashProduct, THomeControl } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import Image from "next/image";
import { apiBaseUrl } from "@/config";
import FlashSellSlider from "../common/FlashSellSlider";
import TimerBanner from "../common/TimerBanner";
import SectionHeader2 from "../shared/SectionHeader2";
import TimerBanner2 from "../common/TimerBanner2";

interface ProductProps {
  flashSale: THomeControl;
  productList: TFlashProduct;
  isLoading: boolean;
}

const FlashSellProducts: React.FC<ProductProps> = ({
  flashSale,
  productList,
  isLoading,
}) => {
  const flashProducts = Array.isArray(productList?.products)
    ? productList.products
    : [];

  return (
    <section className="Container md:mt-12 mt-6">
      {/* <SectionHeader
        title={flashSale.title}
        subTitle={flashSale.subTitle}
      /> */}

       <SectionHeader2
         title={flashSale.title}
        subTitle={flashSale.subTitle}
      />

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        {/* Flash Sale Banner */}
        <div className="w-full lg:w-[30%] xl:w-[28%]">
          {/* <TimerBanner productList={productList}/> */}
          <TimerBanner2 productList={productList}/>
        </div>

        {/* Products */}
        <div className="w-full min-w-0 lg:w-[70%] xl:w-[72%]">
          <FlashSellSlider
            flashProducts={flashProducts}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default FlashSellProducts;