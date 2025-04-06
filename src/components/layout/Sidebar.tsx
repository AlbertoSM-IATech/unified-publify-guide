
import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, LineChart, PieChart, Settings, 
  User, BookMarked, LayoutGrid, X, MegaphoneIcon,
  BookText, FolderIcon, FileSearch
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
    { path: "/dashboard", icon: <Home size={20} className="text-gray-500" />, label: "Dashboard" },
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

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
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
      <motion.aside
        variants={sidebarVariants}
        animate={open ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 w-64 transform bg-sidebar lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col border-r border-sidebar-border">
          {/* Header del sidebar */}
          <div className="flex h-14 items-center border-b border-sidebar-border px-4">
            <Link to="/dashboard" className="flex items-center">
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
          <motion.nav 
            className="flex-1 space-y-1 px-2 py-4"
            variants={containerVariants}
            initial="closed"
            animate="open"
          >
            {menuItems.map((item) => (
              <motion.div key={item.path} className="mb-2" variants={itemVariants}>
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
                    className={`sidebar-link ${isActive(item.path) ? "active" : ""} hover:bg-sidebar-accent/50 transition-colors duration-200`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {/* Submenús para biblioteca */}
                {'subItems' in item && shouldExpandBiblioteca() && (
                  <motion.div 
                    className="ml-6 mt-1 space-y-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subItems?.map((subItem) => (
                      <motion.div key={subItem.path} variants={itemVariants}>
                        <Link
                          to={subItem.path}
                          className={`sidebar-link ${
                            location.pathname === subItem.path ? "active" : ""
                          } hover:bg-sidebar-accent/30 transition-colors duration-200`}
                        >
                          {subItem.icon}
                          <span className="ml-2">{subItem.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.nav>
          
          {/* Footer opcional */}
          <div className="border-t border-sidebar-border p-4">
            <div className="text-xs text-sidebar-foreground/70">
              Publify v0.1.0
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
