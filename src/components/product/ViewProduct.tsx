"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import QuickImageGallery from "./QuickImageGallery";

interface productProps {
  product: TProduct;
}

const ViewProduct: React.FC<productProps> = ({ product }) => {
  const [selectedInventory, setSelectedInventory] = useState(
    product?.inventories?.[0] || null
  );

   // Get unique colors by colorName
  const uniqueColors = product?.inventories?.reduce((acc, curr) => {
    if (!acc.some(item => item.colorName === curr.colorName)) {
      acc.push(curr);
    }
    return acc;
  }, [] as typeof product.inventories) || [];
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
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

            {/* Free Shipping */}
            {product.freeShipping && (
              <div className="mt-2">
                <span className="text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                  🚚 Free Shipping
                </span>
              </div>
            )}

            {/* Description */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 text-sm mb-1">
                Description
              </h4>
              <div
                className="text-gray-500 text-sm leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* Color Selection by ColorName */}
            {uniqueColors.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 text-sm">
                    Color:
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {selectedInventory?.colorName || "Select Color"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {uniqueColors.map((inventory) => (
                    <button
                      key={inventory._id}
                      onClick={() => setSelectedInventory(inventory)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedInventory?._id === inventory._id
                          ? "border-primary ring-2 ring-primary/30 ring-offset-2"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor: inventory.color || "#e5e7eb",
                      }}
                      title={inventory.colorName}
                    >
                      {!inventory.color && (
                        <span className="text-[8px] text-gray-500 absolute inset-0 flex items-center justify-center font-medium">
                          {inventory.colorName?.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                      {selectedInventory?._id === inventory._id && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-[10px]">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Color Details */}
             {selectedInventory && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">Color:</span>{" "}
                  <span className="text-gray-600 capitalize">
                    {selectedInventory.colorName || "N/A"}
                  </span>
                </div>
                {selectedInventory.size && (
                  <div>
                    <span className="font-medium text-gray-700">Size:</span>{" "}
                    <span className="text-gray-600 uppercase">
                      {selectedInventory.size}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Quantity:</span>{" "}
                  <span className="text-gray-600">
                    {selectedInventory.quantity} pcs
                  </span>
                </div>
                {selectedInventory.color && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Color Code:</span>
                    <span
                      className="w-5 h-5 rounded border border-gray-300"
                      style={{ backgroundColor: selectedInventory.color }}
                    />
                    <span className="text-gray-600 text-xs">
                      {selectedInventory.color}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
