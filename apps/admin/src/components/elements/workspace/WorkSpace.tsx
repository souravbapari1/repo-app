"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React, { memo, useEffect } from "react";
import { menuItems } from "./data";
import MenuItem from "./MenuItem";
import { useSidebarStore } from "./useSidebarStore"; // Zustand store for sidebar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function WorkSpace({ children }: { children?: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { isOpen, toggleSidebar } = useSidebarStore(); // Zustand store for sidebar state

  useEffect(() => {
    // On mobile, the sidebar should always be collapsed
    if (isMobile) {
      useSidebarStore.getState().setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex relative w-full transition-all">
      {/* Sidebar */}
      <div
        className={cn(
          `${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out w-72 shadow-md sticky top-0 left-0 z-40 bg-white h-screen`,
          `${isMobile ? "fixed top-0 left-0  z-40" : ""}`
        )}
      >
        <div className="text-gray-900 h-14 shadow-sm flex justify-center items-center font-semibold text-lg">
          Workspace
        </div>
        {/* Sidebar content */}
        <div className="flex flex-col justify-start items-start px-3 py-3">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <p className="text-xs uppercase px-3 py-2 mt-3 font-sans font-extrabold text-gray-400">
                {item.name.toUpperCase()}
              </p>
              {item.menu.map((subItem, subIndex) => (
                <MenuItem key={subIndex} item={subItem} index={subIndex} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "" : isMobile ? "" : "-ml-72"
        }`}
      >
        {/* Top Navigation Bar */}
        <div className="h-14 bg-white sticky top-0 z-40 flex justify-between items-center px-5 shadow-sm">
          <div className="flex items-center">
            <Menu
              onClick={toggleSidebar}
              className="cursor-pointer text-gray-500 transition-all duration-200"
              size={24}
            />
          </div>
          {/* Other potential elements like logo, profile icon, notifications, etc. */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for profile and other icons */}
            <div className="w-8 h-8 bg-gray-300 rounded-xl" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-8 h-8 bg-gray-300 rounded-xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content area */}
        <div className="max-w-[1600px] px-5 mx-auto py-5">{children}</div>
      </div>
    </div>
  );
}

export default memo(WorkSpace);
