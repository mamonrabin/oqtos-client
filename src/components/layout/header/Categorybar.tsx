import { getAllCategory } from "@/services/category.api";
import { getAllSubCategory } from "@/services/subcategory.api";
import { TCategory, TSubCategory } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Categorybar = async () => {
  const { data: categoryList } = await getAllCategory();
  const { data: subcategoryList } = await getAllSubCategory();

  return (
    <div className="bg-primary border-b border-blue-500/30 lg:block hidden shadow-md">
      <div className="Container max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center xl:gap-8 gap-4 py-3">
          {categoryList?.slice(0, 15).map((category: TCategory) => {
            const subcategories = subcategoryList?.filter(
              (sub: TSubCategory) => sub.category._id === category._id,
            );
            const hasSubcategories = subcategories?.length > 0;

            return (
              <li
                key={category._id}
                className="relative group"
              >
                <Link
                  href="/product"
                  className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 group-hover:scale-105"
                >
                  {category.categoryName}
                  {hasSubcategories && (
                    <ChevronDown 
                      size={14} 
                      className="text-white/60 group-hover:text-white transition-colors duration-200 group-hover:rotate-180" 
                    />
                  )}
                </Link>

                {/* Animated Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>

                {/* Subcategories Dropdown */}
                {hasSubcategories && (
                  <ul className="absolute mt-3 min-w-[220px] bg-primary rounded-b opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 duration-300 overflow-hidden">
                    {/* Dropdown Arrow */}
                    
                    
                    {subcategories.map((sub: TSubCategory, index: number) => (
                      <li key={sub._id}>
                        <Link
                          href={`/product?subcategory=${sub.slug}`}
                          className={`flex items-center gap-2 px-5 py-3 text-sm text-white hover:text-primary hover:bg-blue-50 transition-all duration-200 capitalize ${
                            index !== subcategories.length - 1 ? "border-b border-[#fff]/10" : ""
                          }`}
                        >
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400" />
                          {sub.subcategoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categorybar;