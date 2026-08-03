"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import QuickImageGallery from "./QuickImageGallery";
import SizeColorAndQuantity from "./SizeColeAndQuantity";
import AddToCart from "./AddToCart";

interface productProps {
  product: TProduct;
}

const ViewProduct: React.FC<productProps> = ({ product }) => {
 

  return (
    <Dialog>
      <DialogTrigger className="p-2 cursor-pointer bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
        <Eye size={18} className="text-gray-700" />
      </DialogTrigger>
      <DialogContent className="lg:max-w-5xl sm:max-w-xl w-full max-h-[90vh] !rounded-none p-0 overflow-y-auto">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          {/* LEFT: Product Gallery */}
          <div className="w-full">
            <QuickImageGallery product={product} />
          </div>

          {/* RIGHT: Product Info */}
          <div className="p-6 flex flex-col">
            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-tight">
              {product.title}
            </h2>

            {/* Brand & Category */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">Brand:</span>{" "}
              {product.brand?.title || "N/A"}
            </div>

            {/* Price Section */}
            <div className="mt-4 flex items-center gap-3 border-b pb-4">
              <p className="text-2xl font-bold text-primary">
                ৳{product?.price?.toFixed(2)}
              </p>
              {(product.discount ?? 0) > 0 && (
                <>
                  <p className="text-gray-400 line-through text-base">
                    ৳{product.mrpPrice.toFixed(2)}
                  </p>
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-4 flex items-center gap-2">
              <span className="font-medium text-gray-700">Availability:</span>
              {product.stock_status === "in_stock" &&
              (product.availableQuantity ?? 0) > 0 ? (
                <span className="text-green-600 font-semibold text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full inline-block"></span>
                  In Stock ({product.availableQuantity ?? 0} pcs)
                </span>
              ) : (
                <span className="text-red-500 font-semibold text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                  Out of Stock
                </span>
              )}
            </div>

          

            {/* Description */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 text-sm mb-1">
                Description
              </h4>
              <div
                className="text-gray-500 text-sm leading-relaxed line-clamp-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

           <SizeColorAndQuantity product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
