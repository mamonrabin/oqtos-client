/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import ProductSlider from "../common/ProductSlider";
import SectionHeader2 from "../shared/SectionHeader2";

interface productProps {
  featured: THomeControl;
  productList: TProduct[];
  isLoading: any;
}

const FeaturedProducts: React.FC<productProps> = ({
  featured,
  productList,
  isLoading,
}) => {
  return (
    <div className="Container md:mt-12 mt-6">
      {/* <SectionHeader
        title={featured.title}
        subTitle={featured.subTitle}
      /> */}

      <SectionHeader2 title={featured.title} subTitle={featured.subTitle} />

      <ProductSlider productList={productList} isLoading={isLoading} />
    </div>
  );
};

export default FeaturedProducts;
