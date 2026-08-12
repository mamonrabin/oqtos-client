import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { apiBaseUrl } from "@/config";
import { TCategory, TLogo, TSubCategory } from "@/types";
import {
  TextAlignJustify,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  logoList: TLogo[];
  categoryList: TCategory[];
  subcategoryList: TSubCategory[];
}

const Responsivebar: React.FC<LogoProps> = ({
  logoList,
  categoryList,
  subcategoryList,
}) => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden rounded-xl p-2.5 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <TextAlignJustify size={22} />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] overflow-y-auto bg-gradient-to-b from-white to-gray-50/50 p-0 shadow-2xl sm:w-[380px]"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white/95 px-6 py-5 backdrop-blur-md">
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

          <SheetClose className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700">
            <X size={20} />
          </SheetClose>
        </div>

        {/* Categories */}
        <div className="border-t bg-white px-4 py-6">
          <div className="mb-5 flex items-center justify-between px-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Shop by Category
            </h3>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-primary">
              {categoryList?.length} Categories
            </span>
          </div>

          <ul className="space-y-1">
            {categoryList?.slice(0, 15).map((category: TCategory) => {
              const subcategories = subcategoryList?.filter(
                (sub: TSubCategory) =>
                  sub.category?._id === category._id,
              );

              const hasSubcategories = subcategories?.length > 0;

              return (
                <li key={category._id}>
                  {hasSubcategories ? (
                    /* =========================
                       CATEGORY WITH SUBCATEGORIES
                    ========================== */
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-transparent px-4 py-3.5 transition-all duration-200 hover:border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent">
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />

                          <span className="text-sm font-medium capitalize text-gray-700 transition-colors duration-200 group-hover:text-primary">
                            {category.categoryName}
                          </span>
                        </div>

                        <ChevronDown
                          size={16}
                          className="text-gray-400 transition-transform duration-300 group-open:rotate-180 group-hover:text-blue-500"
                        />
                      </summary>

                      {/* Subcategories */}
                      <ul className="ml-6 mt-1 space-y-0.5 border-l-2 border-blue-100 pl-4">
                        {subcategories.map(
                          (sub: TSubCategory) => (
                            <li key={sub._id}>
                              <SheetClose>
                                <Link
                                  href={`/product?category=${category.slug}&subCategory=${sub.slug}`}
                                  className="group/link flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm capitalize text-gray-600 transition-all duration-200 hover:bg-blue-50/70 hover:text-primary"
                                >
                                  <ChevronRight
                                    size={14}
                                    className="text-gray-300 transition-colors group-hover/link:text-blue-400"
                                  />

                                  {sub.subcategoryName}
                                </Link>
                              </SheetClose>
                            </li>
                          ),
                        )}
                      </ul>
                    </details>
                  ) : (
                    /* =========================
                       CATEGORY WITHOUT SUBCATEGORY
                    ========================== */
                    <SheetClose>
                      <Link
                        href={`/product?category=${category.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 transition-all duration-200 hover:border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />

                          <span className="text-sm font-medium capitalize text-gray-700 transition-colors duration-200 group-hover:text-primary">
                            {category.categoryName}
                          </span>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-gray-300 transition-colors group-hover:text-primary"
                        />
                      </Link>
                    </SheetClose>
                  )}
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