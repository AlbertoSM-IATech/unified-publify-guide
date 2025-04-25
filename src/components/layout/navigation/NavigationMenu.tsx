
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { menuItems } from "./NavigationItems";
import { MenuItem } from "./MenuItem";

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
          <MenuItem
            item={item}
            isActive={isActive(item.path)}
            isExpanded={item.path === "/biblioteca" ? bibliotecaExpanded : undefined}
            onToggleExpand={item.path === "/biblioteca" ? () => setBibliotecaExpanded(!bibliotecaExpanded) : undefined}
            currentPath={location.pathname}
          />
        </div>
      ))}
    </nav>
  );
};
