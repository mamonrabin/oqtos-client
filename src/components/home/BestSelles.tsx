/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";

import ProductSlider from "../common/ProductSlider";

import SectionHeader from "../shared/SectionHeader";
import SectionHeader2 from "../shared/SectionHeader2";
import { TCustome } from "@/types/customeType";

interface productProps {
  bestSelling: THomeControl;
  productList: TProduct[];
  design: TCustome;
  isLoading: any;
}

const BestSelles: React.FC<productProps> = ({
  bestSelling,
  productList,
  design,
  isLoading,
}) => {
  const sectionHead = design?.home?.sectionHead || "Default";
  return (
    <div className="Container md:mt-12 mt-6">
      {sectionHead === "Default" ? (
        <SectionHeader
          title={bestSelling.title}
          subTitle={bestSelling.subTitle}
        />
      ) : (
        <SectionHeader2
          title={bestSelling.title}
          subTitle={bestSelling.subTitle}
        />
      )}

      {/* 
      <div className="grid lg:grid-cols-4 gap-2">
        {
          productList?.slice(0,4).map(product => <ProductCard key={product._id} product={product} isLoading={isLoading}/>)
        }
      </div> */}

      <ProductSlider productList={productList} isLoading={isLoading} design={design} />
    </div>
  );
};

export default BestSelles;
