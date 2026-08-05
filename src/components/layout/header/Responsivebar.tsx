import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { apiBaseUrl } from "@/config";
import { TCategory, TLogo, TSubCategory } from "@/types";
import { TextAlignJustify, X, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface logoProps {
  logoList: TLogo[];
  categoryList:TCategory[]
  subcategoryList:TSubCategory[]
}

const Responsivebar: React.FC<logoProps> = ({ logoList,categoryList,subcategoryList }) => {
  

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-700 hover:text-blue-600">
        <TextAlignJustify size={22} />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] sm:w-[380px] p-0 bg-gradient-to-b from-white to-gray-50/50 overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <Link href="/" className="block">
            {logoList?.map((item: TLogo) => (
              <Image
                key={item._id}
                src={`${apiBaseUrl}${item.headerLogo}`}
                alt="Optos"
                width={120}
                height={50}
                unoptimized
                className="h-11 w-auto object-contain"
              />
            ))}
          </Link>

          <SheetClose className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </SheetClose>
        </div>

        {/* Categories Section */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-5 px-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Shop by Category
            </h3>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-full">
              {categoryList?.length} Categories
            </span>
          </div>

          <ul className="space-y-1">
            {categoryList?.slice(0, 15).map((category: TCategory) => {
              const subcategories = subcategoryList?.filter(
                (sub: TSubCategory) => sub.category._id === category._id,
              );
              const hasSubcategories = subcategories?.length > 0;

              return (
                <li key={category._id} className="group">
                  <details className="group">
                    <summary className="flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer list-none hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-blue-100">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 capitalize transition-colors duration-200">
                          {category.categoryName}
                        </span>
                      </div>
                      {hasSubcategories && (
                        <ChevronDown
                          size={16}
                          className="text-gray-400 group-open:rotate-180 transition-transform duration-300 group-hover:text-blue-500"
                        />
                      )}
                    </summary>

                    {hasSubcategories && (
                      <ul className="ml-6 mt-1 pl-4 border-l-2 border-blue-100 space-y-0.5">
                        {subcategories.map((sub: TSubCategory) => (
                          <li key={sub._id}>
                            <Link
                              href={`/product?subcategory=${sub.slug}`}
                              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all duration-200 capitalize group/link"
                            >
                              <ChevronRight
                                size={14}
                                className="text-gray-300 group-hover/link:text-blue-400 transition-colors"
                              />
                              {sub.subcategoryName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Responsivebar;
