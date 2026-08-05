import Categorybar from "@/components/layout/header/Categorybar";
import Navbar from "@/components/layout/header/Navbar";
import Providers from "@/providers/Providers";
import { getAllCategory } from "@/services/category.api";
import { getLogoAndFooter } from "@/services/logo.api";
import { getAllSubCategory } from "@/services/subcategory.api";

// export default function layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <div className="">
//       <Navbar />
//       <Categorybar />
//       {children}
//     </div>
//   );
// }

import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: logoList } = await getLogoAndFooter();
  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();
  return (
    <div className="">
      <Navbar
        logoList={logoList}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
      />
      <Categorybar />
      {children}
    </div>
  );
};

export default layout;
