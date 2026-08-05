"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
  LayoutDashboard, 
  ShoppingBasket, 
  UserRound, 
  Van,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.api";
import { useCurrentUser } from "./AuthContext";


const UserMenu = () => {
  const { user,setUser } = useCurrentUser();

  console.log("current user", user);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      href: "/dashboard",
    },
    {
      label: "My Orders",
      icon: <ShoppingBasket size={16} />,
      href: "/orders",
    },
    {
      label: "Track Order",
      icon: <Van size={16} />,
      href: "/track-order",
    },
    {
      label: "Settings",
      icon: <Settings size={16} />,
      href: "/settings",
    },
  ];

  const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logout();

//       // Refresh the app to update authentication state
//       router.refresh();

//       // Redirect to login page
//       router.push("/logIn");
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const handleLogout = async () => {
  try {
    await logout();
    setUser(null);
    router.refresh()
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="p-2 lg:flex hidden cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-primary hover:scale-105">
          <UserRound size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 w-72 rounded-b rounded-t-[0px] border border-gray-200 bg-white shadow-xl p-0 overflow-hidden">
        {/* User Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "guest@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuGroup>
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} className="rounded-[0px] hover:!bg-gray-100">
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700  transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator className="my-0" />

        {/* Logout */}
        <div className="py-2">
          <DropdownMenuItem className="rounded-[0px]  hover:!bg-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600  w-full transition-colors duration-150 cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;