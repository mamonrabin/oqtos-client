import Banner2 from "@/components/second-design/banner/Banner2";
import BestSelles from "@/components/home/BestSelles";
import Blog from "@/components/home/Blog";

import FeaturedProducts from "@/components/home/FeaturedProducts";
import FlashSellProducts from "@/components/home/FlashSellProducts";
import NewArrivals from "@/components/home/NewArrivals";
import { getAllBanner } from "@/services/banner.api";
import { getAllBlog } from "@/services/blog.api";
import { getAllBrand } from "@/services/brand.api";
import { getflasSellProducts } from "@/services/campaign.api";
import { getAllCategory } from "@/services/category.api";
import { getHomeControl } from "@/services/homecontrol.api";
import {
  getBestSellingProducts,
  getNewArrivalProducts,
  getProductsByLabel,
} from "@/services/products.api";
import { TBanner, THomeControl } from "@/types";
import React from "react";
import { getAllSubCategory } from "@/services/subcategory.api";
import Category2 from "@/components/second-design/Category2";
import Brand2 from "@/components/home/Brand2";
import Banner from "@/components/home/Banner";
import { getCustomeDesign } from "@/services/customeDesign.api";
import Category from "@/components/home/Category";
import Brand from "@/components/home/Brand";

const Home = async () => {
  const { data: bannerList } = await getAllBanner();
  const mainBanners = bannerList?.filter(
    (banner: TBanner) => banner.type === "Main",
  );

  const { data: designList } = await getCustomeDesign();

  const design = designList?.[0];

  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();
  const { data: newArrivalProducts, isLoading: newArrivalLoading } =
    await getNewArrivalProducts();
  const { data: bestSelingProduct, isLoading: bestSellingLoading } =
    await getBestSellingProducts();
  const { data: flasSellProducts, isLoading: flasSellProductsLoading } =
    await getflasSellProducts();
  const { data: featuredProduct, isLoading: featuredLoading } =
    await getProductsByLabel("Featured");
  const { data: brands, isLoading: brandLoading } = await getAllBrand();
  const { data: blogs, isLoading: blogLoading } = await getAllBlog();

  const { data: sectionList } = await getHomeControl();

  const brandSection = design?.home?.brandSection || "Default";

  const componentMap: Record<
    string,
    (section: THomeControl) => React.ReactNode
  > = {
    "New Arrivals": (section) => (
      <NewArrivals
        key={section._id}
        newArrivals={section}
        productList={newArrivalProducts}
        isLoading={newArrivalLoading}
        design={design}
      />
    ),
    "Best Selling": (section) => (
      <BestSelles
        key={section._id}
        bestSelling={section}
        productList={bestSelingProduct}
        isLoading={bestSellingLoading}
        design={design}
      />
    ),
    "Flash Sale": (section) => (
      <FlashSellProducts
        key={section._id}
        flashSale={section}
        productList={flasSellProducts}
        isLoading={flasSellProductsLoading}
        design={design}
      />
    ),
    "Featured Products": (section) => (
      <FeaturedProducts
        key={section._id}
        featured={section}
        productList={featuredProduct}
        isLoading={featuredLoading}
        design={design}
      />
    ),
    Brands: (section) =>
      brandSection === "Default" ? (
        <Brand
          key={section._id}
          brand={section}
          brands={brands}
          isLoading={brandLoading}
          design={design}
        />
      ) : (
        <Brand2
          key={section._id}
          brand={section}
          brands={brands}
          isLoading={brandLoading}
          design={design}
        />
      ),
    Blog: (section) => (
      <Blog
        key={section._id}
        blog={section}
        bloges={blogs}
        isLoading={blogLoading}
        design={design}
      />
    ),
  };

  const orderMap: Record<string, number> = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
  };

  const activeSections =
    sectionList
      ?.filter((section: THomeControl) => section.status === "Active")
      ?.sort(
        (a: THomeControl, b: THomeControl) =>
          orderMap[a.order] - orderMap[b.order],
      ) || [];

  const bannerType = design?.home?.bannerType || "Default";
  const categorySection = design?.home?.categorySection || "Default";

  return (
    <div>
      {bannerType === "Default" ? (
        <Banner mainBanners={mainBanners} />
      ) : (
        <Banner2
          categoryList={categoryList}
          subcategoryList={subcategoryList}
          mainBanners={mainBanners}
        />
      )}

      {categorySection === "Default" ? (
        <Category categoryList={categoryList} />
      ) : (
        <Category2 categoryList={categoryList} />
      )}

      {activeSections.map(
        (section: THomeControl) =>
          componentMap[section.landing]?.(section) ?? null,
      )}
    </div>
  );
};

export default Home;
