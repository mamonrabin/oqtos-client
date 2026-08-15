import {
  Cog,
  MapPin,
  PackageSearch,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const UserTab = () => {
  const actions = [
    {
      label: "Edit Profile",
      href: "/profile",
      icon: UserRound,
    },
    {
      label: "Manage Orders",
      href: "/my-orders",
      icon: MapPin,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Cog,
    },
    {
      label: "Track Order",
      href: "/track-order",
      icon: PackageSearch,
    },
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className="group flex min-h-24 flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-3 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                <Icon size={19} strokeWidth={1.8} />
              </span>

              <span className="mt-2 text-sm font-medium text-gray-700 transition-colors group-hover:text-primary">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserTab;