
import { Link } from "react-router-dom";
import { SubMenuItem as SubMenuItemType } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SubMenuItemProps {
  subItem: SubMenuItemType;
  isActive: boolean;
}

export const SubMenuItem = ({ subItem, isActive }: SubMenuItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={subItem.path}
            className={`flex items-center rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
              isActive ? "bg-black/10 dark:bg-white/10" : ""
            }`}
          >
            {subItem.icon}
            <span className="ml-2">{subItem.label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{subItem.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
