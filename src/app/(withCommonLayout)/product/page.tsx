import ShopContent from "@/components/shop/ShopContent";
import ShopContent2 from "@/components/shop/ShopContent2";
import { getAllBrand } from "@/services/brand.api";
import { getAllCategory } from "@/services/category.api";
import { getCustomeDesign } from "@/services/customeDesign.api";
import { getAllProducts } from "@/services/products.api";
import { getAllSubCategory } from "@/services/subcategory.api";

const Page = async () => {
  const [
    productResponse,
    { data: categoryList },
    { data: SubCategoryList },
    { data: brandList },
    { data: designList },
  ] = await Promise.all([
    getAllProducts({
      page: 1,
      limit: 4,
    }),
    getAllCategory(),
    getAllSubCategory(),
    getAllBrand(),
    getCustomeDesign(),
  ]);

  const products = productResponse.data.data;
  const meta = productResponse.data.meta;
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