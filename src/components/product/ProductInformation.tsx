/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TProduct } from "@/types";
import React, { useRef, useState } from "react";
import RatingsReviews from "./RatingsReviews";

interface ProductProps {
  product: TProduct;
}

const ProductDescription: React.FC<ProductProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("desc");
  const specRef = useRef(null);
  const descRef = useRef(null);
  const reviewRef = useRef(null);

  const handleScroll = (ref: any, tab: any) => {
    setActiveTab(tab);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex text-sm md:text-base items-center justify-center bg-[#EEEEEE] gap-4 border-b border-t border-[#262626]/10 py-6  md:px-0 px-4">
        <p
          onClick={() => handleScroll(descRef, "desc")}
          className={`w-40 py-4 font-medium flex items-center justify-center rounded cursor-pointer transition
      ${
        activeTab === "desc"
          ? "bg-primary text-white"
          : "text-[#262626]/90 hover:text-white bg-white hover:bg-primary"
      }`}
        >
          Description
        </p>

        <p
          onClick={() => handleScroll(specRef, "spec")}
          className={`w-40 py-4 font-medium flex items-center justify-center rounded cursor-pointer transition
      ${
        activeTab === "spec"
          ? "bg-primary text-white"
          : "text-[#262626]/90 hover:text-white bg-white hover:bg-primary"
      }`}
        >
          Specification
        </p>

        <p
          onClick={() => handleScroll(reviewRef, "review")}
          className={`w-40 py-4 font-medium flex items-center justify-center rounded cursor-pointer transition
      ${
        activeTab === "review"
          ? "bg-primary text-white"
          : "text-[#262626]/90 hover:text-white bg-white hover:bg-primary"
      }`}
        >
          Reviews
        </p>
      </div>

      {/* Description */}
      <div ref={descRef} className="description scroll-mt-24 bg-white  pb-8">
        <h2 className="lg:py-6 Container py-4 font-semibold text-xl border-b border-[#262626]/15">
          Description
        </h2>

        <h2 className="pt-6 pb-2 Container text-lg font-medium">
          {product.title}
        </h2>
        <div
          className="Container text-sm text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: product.description || "<p>No description available.</p>",
          }}
        />
      </div>

      {/* Specification */}
      <div className="bg-[#EEEEEE] py-2"></div>
      <div
        ref={specRef}
        className="specification scroll-mt-24 bg-white py-6 md:py-8"
      >
        <div className="mx-auto">
          {/* Specifications Table */}
          <div>
            <h2 className="Container pb-8 font-semibold text-xl border-b border-[#262626]/15">
              Specification
            </h2>

            <div className="Container">
              <div className="mt-6 overflow-hidden text-sm  rounded border-gray-200 bg-white">
              {product.specifications?.length ? (
                product.specifications.map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-1 sm:grid-cols-3 gap-0 transition-all duration-200 ${
                      index !== (product.specifications?.length ?? 0) - 1 &&
                      "border-b border-gray-100"
                    } hover:bg-blue-50/50 hover:shadow-inner`}
                  >
                    <div className="bg-gray-50/80 px-4 sm:px-6 py-3.5 sm:py-4 font-semibold text-gray-700  border-r border-gray-100">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B5DD5]/40"></span>
                        {item.key}
                      </span>
                    </div>
                    <div className="col-span-2 px-4 sm:px-6 py-3.5 sm:py-4 text-gray-800">
                      {item.value}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="text-5xl mb-4">📋</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    No Specifications Available
                  </h4>
                  <p className="text-gray-500">
                    Check back later for detailed product specifications.
                  </p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {/* <div className="bg-[#EEEEEE] py-2"></div>
      <div ref={reviewRef} className="review scroll-mt-24 bg-white">
     
      </div> */}
    </div>
  );
};

export default ProductDescription;
