"use client";


import AddToCart from "./AddToCart";


import { TProduct } from "@/types";
import SizeColorAndQuantity from "./SizeColeAndQuantity";
import ProductImageGallery from "./ProductImageGallery";
import ShippingPolicyCard from "./ShippingPolicyCard";
import ProductInformation from "./ProductInformation";

interface ProductDetailsProps {
  product: TProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
 

  return (
    <div className=" mx-auto py-4 sm:py-6 lg:py-8">
      <div className="Container grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* LEFT: Image Gallery */}
       <ProductImageGallery product={product} />

        {/* RIGHT: Product Details */}
        <div className="flex flex-col">
          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap">
            <span>Home</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span>{product.category?.categoryName}</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>

          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Brand & Rating */}
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-gray-500">
              Brand:{" "}
              <span className="font-medium text-gray-700">
                {product.brand?.title}
              </span>
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ৳{product.price.toFixed(2)}
            </span>
            {product.discount && product.discount > 0 && (
              <>
                <span className="text-gray-400 line-through text-base sm:text-lg">
                  ৳{product.mrpPrice.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-lg">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base">Availability:</span>
            {product.stock_status === "in_stock" &&
            (product.availableQuantity ?? 0) > 0 ? (
              <span className="text-green-600 font-semibold text-xs sm:text-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full inline-block"></span>
                In Stock ({product.availableQuantity ?? 0} pcs)
              </span>
            ) : (
              <span className="text-red-500 font-semibold text-xs sm:text-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full inline-block"></span>
                Out of Stock
              </span>
            )}
          </div>

            {/* Free Shipping */}
            {product.freeShipping && (
              <div className="mt-2">
                <span className="text-primary text-[12px] inline-flex items-center gap-1">
                  <span className="text-sm capitalize font-medium">🚚 Free Shipping</span> on this product
                </span>
              </div>
            )}

          <SizeColorAndQuantity product={product} />
          <AddToCart />

          {/* Tags */}
          {/* {product.tags && product.tags.length > 0 && (
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {product.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )} */}

          <ShippingPolicyCard/>
        </div>
      </div>

      <div className="mt-10">
        <ProductInformation product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;