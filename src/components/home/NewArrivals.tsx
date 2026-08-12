/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";

import ProductSlider from "../common/ProductSlider";

interface productProps {
  newArrivals: THomeControl;
  productList: TProduct[];
  isLoading: any
}

const NewArrivals: React.FC<productProps> = ({ newArrivals, productList,isLoading }) => {

  return (
    <div className="Container md:mt-12 mt-6">
      <SectionHeader
        title={newArrivals.title}
        subTitle={newArrivals.subTitle}
      />

{/* 
      <div className="grid lg:grid-cols-4 gap-2">
        {
          productList?.slice(0,4).map(product => <ProductCard key={product._id} product={product} isLoading={isLoading}/>)
        }
      </div> */}

      <ProductSlider productList={productList} isLoading={isLoading}/>
    </div>
  );
};

export default NewArrivals;
