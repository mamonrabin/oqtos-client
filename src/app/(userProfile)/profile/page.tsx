import UserInfo from "@/components/userDashboard/profile/UserInfo";
import UserUpdateForm from "@/components/userDashboard/profile/UserUpdateForm";
import React from "react";

const Page = () => {
  return (
    <div className="Container px-4 py-8 xl:px-40 bg-[#F5F7FA]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500 md:text-base">
          Manage your personal information
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] lg:gap-8">
        {/* Sidebar */}
        <UserInfo/>

        {/* Main Content */}
        <UserUpdateForm/>
      </div>
    </div>
  );
};

export default Page;