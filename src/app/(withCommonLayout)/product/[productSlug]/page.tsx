import ProductDetails from "@/components/product/ProductDetails";
import { getSingleProductBySlug } from "@/services/products.api";
import React from "react";
// Adjust the import path as needed

const Page = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;

  const { data } = await getSingleProductBySlug(productSlug);

  console.log("Product Data:", data);

  return (
    <div className="min-h-screen">
      <ProductDetails product={data} />
    </div>
  );
};

export default Page;