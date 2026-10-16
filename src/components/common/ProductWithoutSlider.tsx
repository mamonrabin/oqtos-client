"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TProduct } from "@/types";
import React from "react";
import ProductCard from "../product/ProductCard";
import ProductCard2 from "../product/ProductCard2";
import { TCustome } from "@/types/customeType";
import ProductCard3 from "../product/ProductCard3";

interface ProductProps {
  productList: TProduct[];
  design: TCustome;
  isLoading: boolean;
}

const ProductWithoutSlider: React.FC<ProductProps> = ({
  productList,
  isLoading,
  design,
}) => {
  const cardType = design?.shop?.cardType || "Default";
  const cardCount = design?.shop?.cardCount || "4cards";

  const gridClass =
    {
      "3cards": "xl:grid-cols-3",
      "4cards": "xl:grid-cols-4",
      "5cards": "xl:grid-cols-5",
      "6cards": "xl:grid-cols-6",
    }[cardCount] || "xl:grid-cols-4";

  return (
    <div>
      {/* Product Grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${gridClass}`}
      >
        {productList?.map((product) => (
          <div key={product._id}>
            {cardType === "SecondCard" ? (
              <ProductCard2 product={product} isLoading={isLoading} />
            ) : cardType === "ThirdCard" ? (
              <ProductCard3 product={product} isLoading={isLoading} />
            ) : (
              <ProductCard product={product} isLoading={isLoading} />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/product"
          className="group inline-flex items-center gap-2 rounded-lg bg-[#087096]/10 px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
        >
          <span>Discover More</span>
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductWithoutSlider;
