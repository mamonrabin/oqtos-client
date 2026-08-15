"use client";

import { useCurrentUser } from "@/components/auth/AuthContext";
import { format } from "date-fns";
const UserInfo = () => {
  const { user } = useCurrentUser();
  console.log("--------------------user----------------------------", user);
  return (
    <div className="h-fit rounded-xl bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
        {user?.name?.slice(0, 2).toUpperCase()}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{user?.name}</h3>

      <p className="mt-1 break-all text-sm text-gray-500">{user?.email}</p>

      <p className="mt-3 text-sm text-gray-600">
        📞 {user?.phone || "01*********"}
      </p>

      <p className="mt-4 border-t border-gray-200 pt-4 text-xs text-gray-400">
        Member since{" "}
        {user?.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "-"}
      </p>
    </div>
  );
};

export default UserInfo;
