import MessengerBtn from "@/components/common/MessengerBtn";
import ScrollToBottomToTop from "@/components/common/ScrollToBottomToTop";
import DownFooter from "@/components/layout/footer/DownFooter";
import Footer from "@/components/layout/footer/Footer";
import TopFooter from "@/components/layout/footer/TopFooter";
import Categorybar from "@/components/layout/header/Categorybar";
import Navbar from "@/components/layout/header/Navbar";

import { getAllCategory } from "@/services/category.api";
import { getCustomeDesign } from "@/services/customeDesign.api";
import { getLogoAndFooter } from "@/services/logo.api";
import { getAllSocilLink } from "@/services/socialIcon.api";
import { getAllSubCategory } from "@/services/subcategory.api";

import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: designList } = await getCustomeDesign();
  const { data: logoList } = await getLogoAndFooter();
  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();
  const { data: socialLinkes } = await getAllSocilLink();

  // API returns an array
  const design = designList?.[0];

  // Default হলে Categorybar দেখাবে
  const showCategorybar =
    design?.home?.bannerType === "Default";

  return (
    <div>
      <Navbar
        logoList={logoList}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
      />

      {showCategorybar && <Categorybar />}

      <MessengerBtn />

      <ScrollToBottomToTop />

      {children}

      <TopFooter />

      <Footer
        logoList={logoList}
        socialLinkes={socialLinkes}
      />

      <DownFooter />
    </div>
  );
};

export default layout;