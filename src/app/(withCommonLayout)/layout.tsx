/* eslint-disable @typescript-eslint/no-explicit-any */
import MessengerBtn from "@/components/common/MessengerBtn";
import ScrollToBottomToTop from "@/components/common/ScrollToBottomToTop";
import DownFooter from "@/components/layout/footer/DownFooter";
import DownFooter2 from "@/components/layout/footer/DownFooter2";
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

async function safeFetch(
  request: () => Promise<any>,
  fallback: any = [],
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const result = await Promise.race([
      request(),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error("API request timed out")),
          10000,
        );
      }),
    ]);

    return result?.data ?? fallback;
  } catch (error) {
    console.error("Layout API error:", error);
    return fallback;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    designList,
    logoList,
    categoryList,
    subcategoryList,
    socialLinkes,
  ] = await Promise.all([
    safeFetch(() => getCustomeDesign()),
    safeFetch(() => getLogoAndFooter()),
    safeFetch(() => getAllCategory()),
    safeFetch(() => getAllSubCategory()),
    safeFetch(() => getAllSocilLink()),
  ]);

  const design = designList?.[0];

  const showCategorybar =
    design?.home?.bannerType === "Default";

  const modileFooterSection =
    design?.home?.footerSection === "Default";

  return (
    <div>
      <Navbar
        logoList={logoList}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
        design={design}
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

      {modileFooterSection ? <DownFooter /> : <DownFooter2 />}
    </div>
  );
}