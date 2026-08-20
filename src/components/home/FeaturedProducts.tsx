/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import ProductSlider from "../common/ProductSlider";
import SectionHeader2 from "../shared/SectionHeader2";
import { TCustome } from "@/types/customeType";

interface productProps {
  featured: THomeControl;
  productList: TProduct[];
  design: TCustome;
  isLoading: boolean;
}

const FeaturedProducts: React.FC<productProps> = ({
  featured,
  productList,
  design,
  isLoading,
}) => {
  const sectionHead = design?.home?.sectionHead || "Default";
  return (
    <div className="Container md:mt-12 mt-6">
      {sectionHead === "Default" ? (
        <SectionHeader title={featured.title} subTitle={featured.subTitle} />
      ) : (
        <SectionHeader2 title={featured.title} subTitle={featured.subTitle} />
      )}

      <ProductSlider productList={productList} isLoading={isLoading} design={design} />
    </div>
  );
};

export default FeaturedProducts;
