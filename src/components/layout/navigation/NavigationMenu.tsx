
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { menuItems } from "./NavigationItems";

export const NavigationMenu = () => {
  const location = useLocation();
  const [bibliotecaExpanded, setBibliotecaExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/biblioteca")) {
      setBibliotecaExpanded(true);
    }
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto scrollbar-hide">
      {menuItems.map((item) => (
        <div key={item.path} className="mb-2">
          {item.path === "/biblioteca" ? (
            <div className="space-y-1">
              <button
                onClick={() => setBibliotecaExpanded(!bibliotecaExpanded)}
                className={`w-full text-left flex items-center justify-between rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
                  isActive(item.path) ? "bg-black/10 dark:bg-white/10" : ""
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </div>
                {bibliotecaExpanded ? (
                  <ChevronUp size={16} className="text-black/70 dark:text-white/70" />
                ) : (
                  <ChevronDown size={16} className="text-black/70 dark:text-white/70" />
                )}
              </button>
              
              {bibliotecaExpanded && item.subItems && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
                        location.pathname === subItem.path ? "bg-black/10 dark:bg-white/10" : ""
                      }`}
                    >
                      {subItem.icon}
                      <span className="ml-2">{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.path}
              className={`flex items-center rounded-md px-3 py-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
                isActive(item.path) ? "bg-black/10 dark:bg-white/10" : ""
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
