import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, LineChart, PieChart, Settings, 
  User, BookMarked, LayoutGrid, X, MegaphoneIcon,
  BookText, FolderIcon, FileSearch
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void 
}) => {
  const location = useLocation();
  
  // Estado para controlar si el submenú de biblioteca está expandido
  const [bibliotecaExpanded, setBibliotecaExpanded] = useState(true);

  const menuItems = [
    { path: "/", icon: <Home size={20} className="text-gray-500" />, label: "Dashboard" },
    { 
      path: "/biblioteca", 
      icon: <BookOpen size={20} className="text-gray-500" />, 
      label: "Biblioteca",
      subItems: [
        { path: "/biblioteca/libros", icon: <BookText size={18} className="text-gray-500" />, label: "Libros" },
        { path: "/biblioteca/colecciones", icon: <FolderIcon size={18} className="text-gray-500" />, label: "Colecciones" },
        { path: "/biblioteca/investigaciones", icon: <FileSearch size={18} className="text-gray-500" />, label: "Investigaciones" },
      ]
    },
    { path: "/marketing", icon: <MegaphoneIcon size={20} className="text-gray-500" />, label: "Marketing" },
    { path: "/finanzas", icon: <PieChart size={20} className="text-gray-500" />, label: "Finanzas" },
    { path: "/perfil", icon: <User size={20} className="text-gray-500" />, label: "Perfil" },
    { path: "/configuracion", icon: <Settings size={20} className="text-gray-500" />, label: "Configuración" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };

  // Determinar si el menú de biblioteca debe estar expandido basado en la ruta actual
  const shouldExpandBiblioteca = () => {
    return location.pathname.startsWith("/biblioteca") || bibliotecaExpanded;
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
            <Link to="/landing" className="flex items-center">
              <span className="font-heading text-xl font-bold text-sidebar-foreground">
                Publify
              </span>
            </Link>
            
            <button 
              className="ml-auto rounded-full p-1 hover:bg-sidebar-accent lg:hidden" 
              onClick={onClose}
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          
          {/* Navegación */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <div key={item.path} className="mb-2">
                {/* Enlace del menú principal */}
                {item.path === "/biblioteca" ? (
                  <button
                    onClick={() => setBibliotecaExpanded(!bibliotecaExpanded)}
                    className={`sidebar-link w-full text-left ${isActive(item.path) ? "active" : ""}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {/* Submenús para biblioteca */}
                {'subItems' in item && shouldExpandBiblioteca() && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`sidebar-link ${
                          location.pathname === subItem.path ? "active" : ""
                        }`}
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.label}</span>
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
