import Banner from "@/components/home/Banner";
import BestSell from "@/components/home/BestSell";
import BestSelles from "@/components/home/BestSelles";
import Category from "@/components/home/Category";
import FlashSellProducts from "@/components/home/FlashSellProducts";
import NewArrivals from "@/components/home/NewArrivals";
import { getAllBanner } from "@/services/banner.api";
import { getflasSellProducts } from "@/services/campaign.api";
import { getAllCategory } from "@/services/category.api";
import { getHomeControl } from "@/services/homecontrol.api";
import { getBestSellingProducts, getNewArrivalProducts } from "@/services/products.api";
import { TBanner, THomeControl } from "@/types";
import React from "react";

const Home = async () => {
  const { data: bannerList } = await getAllBanner();
  const mainBanners = bannerList?.filter(
    (banner: TBanner) => banner.type === "Main",
  );

  const { data: categoryList } = await getAllCategory();
  const { data: newArrivalProducts,isLoading:newArrivalLoading } = await getNewArrivalProducts();
  const { data: bestSelingProduct,isLoading:bestSellingLoading } = await getBestSellingProducts();
  const { data: flasSellProducts,isLoading:flasSellProductsLoading } = await getflasSellProducts();

 

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
      <Banner mainBanners={mainBanners} />
      <Category categoryList={categoryList} />

      {activeSections.map(
        (section: THomeControl) =>
          componentMap[section.landing]?.(section) ?? null,
      )}
    </div>
  );
};

export default Home;
