/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";

import ProductSlider from "../common/ProductSlider";
import SectionHeader2 from "../shared/SectionHeader2";
import { TCustome } from "@/types/customeType";
import ProductWithoutSlider from "../common/ProductWithoutSlider";

interface productProps {
  newArrivals: THomeControl;
  productList: TProduct[];
  design: TCustome;
  isLoading: boolean;
}

const NewArrivals: React.FC<productProps> = ({
  newArrivals,
  productList,
  design,
  isLoading,
}) => {
  const sectionHead = design?.home?.sectionHead || "Default";

  console.log("---------newArrivals---------", newArrivals?.sliderStatus);

  return (
    <div className="Container md:mt-10 mt-6">
      {sectionHead === "Default" ? (
        <SectionHeader
          title={newArrivals.title}
          subTitle={newArrivals.subTitle}
        />
      ) : (
        <SectionHeader2
          title={newArrivals.title}
          subTitle={newArrivals.subTitle}
        />
      )}

      {newArrivals?.sliderStatus === "withslider" ? (
        <ProductSlider
          productList={productList}
          isLoading={isLoading}
          design={design}
        />
      ) : (
        <ProductWithoutSlider
          productList={productList}
          isLoading={isLoading}
          design={design}
        />
      )}
    </div>
  );
};

export default NewArrivals;
