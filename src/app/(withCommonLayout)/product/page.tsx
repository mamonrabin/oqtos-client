import ShopContent from "@/components/shop/ShopContent";
import { getAllBrand } from "@/services/brand.api";
import { getAllCategory } from "@/services/category.api";
import { getAllProducts } from "@/services/products.api";
import { getAllSubCategory } from "@/services/subcategory.api";

const Page = async () => {
  const [
    productResponse,
    { data: categoryList },
    { data: SubCategoryList },
    { data: brandList },
  ] = await Promise.all([
    getAllProducts({
      page: 1,
      limit: 4,
    }),
    getAllCategory(),
    getAllSubCategory(),
    getAllBrand(),
  ]);

  return (
    <ShopContent
      initialProducts={productResponse.data.data}
      initialMeta={productResponse.data.meta}
      categoryList={categoryList}
      SubCategoryList={SubCategoryList}
      brandList={brandList}
      isLoading={false}
    />
  );
};

export default Page;
