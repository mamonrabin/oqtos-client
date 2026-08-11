
import DownFooter from "@/components/layout/footer/DownFooter";
import Footer from "@/components/layout/footer/Footer";
import TopFooter from "@/components/layout/footer/TopFooter";
import Categorybar from "@/components/layout/header/Categorybar";
import Navbar from "@/components/layout/header/Navbar";

import { getAllCategory } from "@/services/category.api";
import { getLogoAndFooter } from "@/services/logo.api";
import { getAllSocilLink } from "@/services/socialIcon.api";
import { getAllSubCategory } from "@/services/subcategory.api";



import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: logoList } = await getLogoAndFooter();
  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();

  const {data:socialLinkes} = await getAllSocilLink()
  return (
    <div className="">
      <Navbar
        logoList={logoList}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
      />
      <Categorybar />
      {children}
      <TopFooter/>
      <Footer logoList={logoList} socialLinkes={socialLinkes}/>
      <DownFooter/>
    </div>
  );
};

export default layout;
