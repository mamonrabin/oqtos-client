/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";

import ProductSlider from "../common/ProductSlider";
import SectionHeader2 from "../shared/SectionHeader2";

interface productProps {
  newArrivals: THomeControl;
  productList: TProduct[];
  isLoading: any;
}

const NewArrivals: React.FC<productProps> = ({
  newArrivals,
  productList,
  isLoading,
}) => {
  return (
    <div className="Container md:mt-12 mt-6">
      {/* <SectionHeader
        title={newArrivals.title}
        subTitle={newArrivals.subTitle}
      /> */}
      <SectionHeader2
        title={newArrivals.title}
        subTitle={newArrivals.subTitle}
      />

      <ProductSlider productList={productList} isLoading={isLoading} />
    </div>
  );
};

export default NewArrivals;
