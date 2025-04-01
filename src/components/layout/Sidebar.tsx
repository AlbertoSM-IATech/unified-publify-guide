
import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, LineChart, PieChart, Settings, 
  User, BookMarked, LayoutGrid, X, MegaphoneIcon 
} from "lucide-react";

const Sidebar = ({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void 
}) => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/", icon: <Home size={20} />, label: "Dashboard" },
    { 
      path: "/biblioteca", 
      icon: <BookOpen size={20} />, 
      label: "Biblioteca",
      subItems: [
        { path: "/biblioteca/libros", label: "Libros" },
        { path: "/biblioteca/colecciones", label: "Colecciones" },
        { path: "/biblioteca/investigaciones", label: "Investigaciones" },
      ]
    },
    { path: "/marketing", icon: <MegaphoneIcon size={20} />, label: "Marketing" },
    { path: "/finanzas", icon: <PieChart size={20} />, label: "Finanzas" },
    { path: "/perfil", icon: <User size={20} />, label: "Perfil" },
    { path: "/configuracion", icon: <Settings size={20} />, label: "Configuración" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };

  // Determinar si un submenú debe estar abierto
  const shouldExpandSubmenu = (item: typeof menuItems[0]) => {
    if ('subItems' in item) {
      return item.subItems?.some(subItem => location.pathname.includes(subItem.path));
    }
    return false;
  };

  return (
    <>
      {/* Overlay para móviles */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col border-r border-sidebar-border">
          {/* Header del sidebar */}
          <div className="flex h-14 items-center border-b border-sidebar-border px-4">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-xl font-bold text-sidebar-foreground">
                Publify
              </span>
            </Link>
            
            <button 
              className="ml-auto rounded-full p-1 hover:bg-sidebar-accent lg:hidden" 
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Navegación */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <div key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
                
                {/* Submenús en caso de existir */}
                {'subItems' in item && shouldExpandSubmenu(item) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`sidebar-link text-xs ${
                          location.pathname === subItem.path ? "active" : ""
                        }`}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Footer opcional */}
          <div className="border-t border-sidebar-border p-4">
            <div className="text-xs text-sidebar-foreground/70">
              Publify v0.1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
