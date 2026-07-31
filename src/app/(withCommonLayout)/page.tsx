import Banner from "@/components/home/Banner";
import BestSell from "@/components/home/BestSell";
import Category from "@/components/home/Category";
import NewArrivals from "@/components/home/NewArrivals";
import { getAllBanner } from "@/services/banner.api";
import { getAllCategory } from "@/services/category.api";
import { getHomeControl } from "@/services/homecontrol.api";
import { getNewArrivalProducts } from "@/services/products.api";
import { TBanner, THomeControl } from "@/types";
import React from "react";

const Home = async () => {
  const { data: bannerList } = await getAllBanner();
  const mainBanners = bannerList?.filter(
    (banner: TBanner) => banner.type === "Main",
  );

  const { data: categoryList } = await getAllCategory();
  const { data: productList,isLoading } = await getNewArrivalProducts();

  const { data: sectionList } = await getHomeControl();

  const componentMap: Record<
    string,
    (section: THomeControl) => React.ReactNode
  > = {
    "New Arrivals": (section) => (
      <NewArrivals key={section._id} newArrivals={section} productList={productList} isLoading={isLoading} />
    ),

    "Best Selling": (section) => <BestSell key={section._id} />,
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
