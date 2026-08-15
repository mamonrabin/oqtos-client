import AffiliateBanner from "@/components/affiliate-program/AffiliateBanner";
import RecenteOrder from "@/components/userDashboard/order/RecenteOrder";
import UserTab from "@/components/userDashboard/UserTab";
import { getAllOrder } from "@/services/order.api";
import React from "react";

const page = async() => {
  const {data:orderList} = await getAllOrder()

  const orders = orderList?.data
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="Container py-10 md:py-14">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back, Al Mamon
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your orders, account, and preferences
          </p>
        </div>

        {/* Affiliate */}
        <div className="mt-7">
          <AffiliateBanner />
        </div>
        <div className="mt-7">
          <UserTab/>
        </div>
        <div className="mt-7">
          <RecenteOrder orders={orders}/>
        </div>
      </div>
    </main>
  );
};

export default page;