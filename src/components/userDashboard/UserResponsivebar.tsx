"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  UserRound,
  ShoppingBag,
  Truck,
  Store,
  ChevronRight,
  Menu,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const UserSidebar = () => {
  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      href: "/profile",
      icon: UserRound,
    },
    {
      label: "My Orders",
      href: "/my-orders",
      icon: ShoppingBag,
    },
    {
      label: "Track Order",
      href: "/track-order",
      icon: Truck,
    },
  ];

  return (
    <div className="mb-4 lg:hidden">
      <Sheet>
        {/* Trigger */}
        <SheetTrigger className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50">
          <Menu size={18} />
        </SheetTrigger>

        {/* Sidebar */}
        <SheetContent
          side="left"
          className="w-[320px] overflow-y-auto bg-white p-0 shadow-2xl sm:w-[380px]"
        >
          {/* Header */}
          <SheetHeader className="border-b border-gray-100 px-6 py-5">
            <SheetTitle className="text-left text-lg font-semibold text-gray-900">
              My Account
            </SheetTitle>

            <p className="text-left text-xs text-gray-500">
              Manage your account
            </p>
          </SheetHeader>

          {/* Navigation */}
          <nav className="w-full px-4 py-6">
            <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Account
            </p>

            <div className="w-full space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SheetClose key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition group-hover:bg-gray-200">
                          <Icon size={17} />
                        </div>

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                        className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500"
                      />
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-100" />

            {/* Go To Shop */}
            <SheetClose>
              <Link
                href="/product"
                className="group flex w-full items-center justify-between rounded-xl border border-red-100 bg-red-50/50 px-4 py-3.5 text-red-600 transition hover:bg-red-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500">
                    <Store size={17} />
                  </div>

                  <span className="text-sm font-semibold">
                    Go to Shop
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className="text-red-400 transition group-hover:translate-x-0.5"
                />
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserSidebar;