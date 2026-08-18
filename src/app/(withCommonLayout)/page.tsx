
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
import { getBestSellingProducts, getNewArrivalProducts, getProductsByLabel } from "@/services/products.api";
import { TBanner, THomeControl } from "@/types";
import React from "react";
import { getAllSubCategory } from "@/services/subcategory.api";
import Category2 from "@/components/second-design/Category2";
import Brand2 from "@/components/home/Brand2";

const Home = async () => {
  const { data: bannerList } = await getAllBanner();
  const mainBanners = bannerList?.filter(
    (banner: TBanner) => banner.type === "Main",
  );

  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();
  const { data: newArrivalProducts,isLoading:newArrivalLoading } = await getNewArrivalProducts();
  const { data: bestSelingProduct,isLoading:bestSellingLoading } = await getBestSellingProducts();
  const { data: flasSellProducts,isLoading:flasSellProductsLoading } = await getflasSellProducts();
  const { data: featuredProduct,isLoading:featuredLoading } = await getProductsByLabel("Featured");
  const { data: brands,isLoading:brandLoading } = await getAllBrand();
  const { data: blogs,isLoading:blogLoading } = await getAllBlog();

 

  const { data: sectionList } = await getHomeControl();

  const componentMap: Record<
    string,
    (section: THomeControl) => React.ReactNode
  > = {
    "New Arrivals": (section) => (
      <NewArrivals key={section._id} newArrivals={section} productList={newArrivalProducts} isLoading={newArrivalLoading} />
    ),
    "Best Selling": (section) => (
      <BestSelles key={section._id} bestSelling={section} productList={bestSelingProduct} isLoading={bestSellingLoading} />
    ),
    "Flash Sale": (section) => (
      <FlashSellProducts key={section._id} flashSale={section} productList={flasSellProducts} isLoading={flasSellProductsLoading} />
    ),
    "Featured Products": (section) => (
      <FeaturedProducts key={section._id} featured={section} productList={featuredProduct} isLoading={featuredLoading} />
    ),
    "Brands": (section) => (
      <Brand2 key={section._id} brand={section} brands={brands} isLoading={brandLoading} />
    ),
    "Blog": (section) => (
      <Blog key={section._id} blog={section} bloges={blogs} isLoading={blogLoading} />
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

  return (
    <div>
      {/* <Banner mainBanners={mainBanners} /> */}
      <Banner2 categoryList={categoryList} subcategoryList={subcategoryList} mainBanners={mainBanners}/>
      {/* <Category categoryList={categoryList} /> */}
      <Category2 categoryList={categoryList}/>

      {activeSections.map(
        (section: THomeControl) =>
          componentMap[section.landing]?.(section) ?? null,
      )}
    </div>
  );
};

export default Home;
