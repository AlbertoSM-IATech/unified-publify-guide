
import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, LineChart, PieChart, Settings, 
  User, BookMarked, LayoutGrid, X, MegaphoneIcon,
  BookText, FolderIcon, FileSearch, ChevronDown, ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialIcons } from "@/components/common/SocialIcons";
import { useTheme } from "@/hooks/useTheme";

const Sidebar = ({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void 
}) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const [bibliotecaExpanded, setBibliotecaExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/biblioteca")) {
      setBibliotecaExpanded(true);
    }
  }, [location.pathname]);

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
    { path: "/contacto", icon: <MegaphoneIcon size={20} className="text-gray-500" />, label: "Contacto" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
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
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.aside
        variants={sidebarVariants}
        animate={open ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 w-64 transform bg-[#3e3e3e] dark:bg-[#1e1e1e] border-r border-[#cacaca]/10 dark:border-[#3e3e3e]/10 lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-[#cacaca]/10 dark:border-[#3e3e3e]/10 px-4">
            <Link to="/dashboard" className="flex items-center">
              <span className="font-heading text-xl font-bold text-white">
                Publify
              </span>
            </Link>
            
            <button 
              className="ml-auto rounded-full p-1 hover:bg-white/10 lg:hidden" 
              onClick={onClose}
            >
              <X size={18} className="text-white" />
            </button>
          </div>
          
          <motion.nav 
            className="flex-1 space-y-1 px-2 py-4 overflow-y-auto scrollbar-hide"
            variants={containerVariants}
            initial="closed"
            animate="open"
          >
            {menuItems.map((item) => (
              <motion.div key={item.path} className="mb-2" variants={itemVariants}>
                {item.path === "/biblioteca" ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setBibliotecaExpanded(!bibliotecaExpanded)}
                      className={`w-full text-left flex items-center justify-between rounded-md px-3 py-2 text-white hover:bg-white/10 transition-colors ${
                        isActive(item.path) ? "bg-white/10" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </div>
                      {bibliotecaExpanded ? (
                        <ChevronUp size={16} className="text-white/70" />
                      ) : (
                        <ChevronDown size={16} className="text-white/70" />
                      )}
                    </button>
                    
                    {bibliotecaExpanded && item.subItems && (
                      <motion.div 
                        className="ml-6 mt-1 space-y-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center rounded-md px-3 py-2 text-white hover:bg-white/10 transition-colors ${
                              location.pathname === subItem.path ? "bg-white/10" : ""
                            }`}
                          >
                            {subItem.icon}
                            <span className="ml-2">{subItem.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-md px-3 py-2 text-white hover:bg-white/10 transition-colors ${
                      isActive(item.path) ? "bg-white/10" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>
          
          <div className="border-t border-[#cacaca]/10 dark:border-[#3e3e3e]/10 p-4">
            <SocialIcons className="justify-center" variant="sidebar" />
            <div className="text-xs text-white/70 text-center mt-4">
              Publify v0.1.0
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
