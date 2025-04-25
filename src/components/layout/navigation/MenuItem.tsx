
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MenuItem as MenuItemType, SubMenuItem as SubMenuItemType } from "./types";
import { SubMenuItem } from "./SubMenuItem";

interface MenuItemProps {
  item: MenuItemType;
  isActive: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  currentPath: string;
}

export const MenuItem = ({ 
  item, 
  isActive, 
  isExpanded, 
  onToggleExpand,
  currentPath 
}: MenuItemProps) => {
  if (item.path === "/biblioteca") {
    return (
      <div className="space-y-1">
        <button
          onClick={onToggleExpand}
          className={`w-full text-left flex items-center justify-between rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
            isActive ? "bg-black/10 dark:bg-white/10" : ""
          }`}
        >
          <div className="flex items-center">
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </div>
          {isExpanded ? (
            <ChevronUp size={16} className="text-black/70 dark:text-white/70" />
          ) : (
            <ChevronDown size={16} className="text-black/70 dark:text-white/70" />
          )}
        </button>
        
        {isExpanded && item.subItems && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <SubMenuItem
                key={subItem.path}
                subItem={subItem}
                isActive={currentPath === subItem.path}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
        isActive ? "bg-black/10 dark:bg-white/10" : ""
      }`}
    >
      {item.icon}
      <span className="ml-2">{item.label}</span>
    </Link>
  );
};
