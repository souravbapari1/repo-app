import { usePathname } from "next/navigation";
import { menuItems } from "./data";
import { useSubMenuStore } from "./useSubMenuStore";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MenuItem = ({
  item,
  index,
}: {
  item: (typeof menuItems)[0]["menu"][0];
  index: number;
}) => {
  const { openSubMenus, toggleSubMenu, resetState } = useSubMenuStore();
  const router = usePathname(); // Get the current router
  const hasSubItems = item.items && item.items.length > 0;
  const isOpen = openSubMenus[item.name + index.toString()];

  // Function to determine if the current link is active
  const isActive = router === item.href;

  // Function to toggle the submenu
  const handleSubMenuToggle = () => {
    if (hasSubItems) {
      toggleSubMenu(item.name + index.toString());
    }
  };

  return (
    <div className="w-full text-gray-600 select-none">
      {/* Regular Link */}
      {!hasSubItems && (
        <Link
          onClick={resetState}
          href={item.href}
          className={`flex items-center space-x-3 justify-start px-3 py-2 rounded-sm w-full ${
            isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          }`}
        >
          {item.icon}
          <p>{item.name}</p>
        </Link>
      )}

      {/* Submenu Link */}
      {hasSubItems && (
        <div
          className={`flex ${
            item.items.some((subItem) => router === subItem.href)
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          } items-center space-x-3 justify-between px-3 py-2 rounded-md w-full cursor-pointer`}
          onClick={handleSubMenuToggle}
        >
          <div className="flex justify-start items-center gap-4 w-full">
            {item.icon}
            <p>{item.name}</p>
          </div>
          {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </div>
      )}

      {/* Sub-menu */}
      {hasSubItems && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden pl-7"
        >
          <div className="mb-3">
            {item.items.map((subItem, subIndex) => {
              const isSubItemActive = router === subItem.href;

              return (
                <Link
                  href={subItem.href}
                  key={subIndex}
                  className={cn(
                    `flex items-center space-x-3 justify-start px-3 py-2 rounded-md w-full hover:bg-gray-100 ${
                      isSubItemActive ? "text-blue-600" : ""
                    }`
                  )}
                >
                  <div
                    className={`w-3 h-[1px] ${
                      isSubItemActive ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <p>{subItem.name}</p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MenuItem;
