/* eslint-disable react-hooks/purity */
import ShopContent from "@/components/shop/ShopContent";
import ShopContent2 from "@/components/shop/ShopContent2";

import { getAllBrand } from "@/services/brand.api";
import { getAllCategory } from "@/services/category.api";
import { getCustomeDesign } from "@/services/customeDesign.api";
import { getAllProducts } from "@/services/products.api";
import { getAllSubCategory } from "@/services/subcategory.api";

const Page = async () => {
  const start = performance.now();

  const measure = async <T,>(name: string, request: Promise<T>) => {
    const requestStart = performance.now();

    try {
      const result = await request;

      console.log(
        `[Shop API] ${name}: ${(
          performance.now() - requestStart
        ).toFixed(0)}ms`
      );

      return result;
    } catch (error) {
      console.error(`[Shop API] ${name} failed:`, error);
      throw error;
    }
  };

  const [
    productResponse,
    categoryResponse,
    subCategoryResponse,
    brandResponse,
    designResponse,
  ] = await Promise.all([
    measure("Products", getAllProducts({ page: 1, limit: 4 })),
    measure("Categories", getAllCategory()),
    measure("Subcategories", getAllSubCategory()),
    measure("Brands", getAllBrand()),
    measure("Design", getCustomeDesign()),
  ]);

  console.log(
    `[Shop Page] Total: ${(performance.now() - start).toFixed(0)}ms`
  );

  const products = productResponse.data.data;
  const meta = productResponse.data.meta;

  const categoryList = categoryResponse.data;
  const SubCategoryList = subCategoryResponse.data;
  const brandList = brandResponse.data;
  const designList = designResponse.data;

  const design = designList?.[0];
  const shopSection = design?.shop?.shopPage || "Default";

  const props = {
    initialProducts: products,
    initialMeta: meta,
    categoryList,
    SubCategoryList,
    brandList,
    design,
    isLoading: false,
  };

  return shopSection === "Default" ? (
    <ShopContent {...props} />
  ) : (
    <ShopContent2 {...props} />
  );
};

export default Page;