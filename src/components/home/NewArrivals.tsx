/* eslint-disable @typescript-eslint/no-explicit-any */
import { THomeControl, TProduct } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import ProductCard from "../product/ProductCard";

interface productProps {
  newArrivals: THomeControl;
  productList: TProduct[];
  isLoading: any
}

const NewArrivals: React.FC<productProps> = ({ newArrivals, productList,isLoading }) => {
  console.log("newArrivals", newArrivals);
  return (
    <div className="Container md:mt-12 mt-6 pb-20">
      <SectionHeader
        title={newArrivals.title}
        subTitle={newArrivals.subTitle}
      />


      <div className="grid lg:grid-cols-4 gap-2">
        {
          productList?.slice(0,4).map(product => <ProductCard key={product._id} product={product} isLoading={isLoading}/>)
        }
      </div>
    </div>
  );
};

export default NewArrivals;
