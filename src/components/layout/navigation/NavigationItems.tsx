
import { 
  Home, BookOpen, LineChart, PieChart, Settings, 
  User, MegaphoneIcon, BookText, FolderIcon, FileSearch, ShoppingCart
} from "lucide-react";
import { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  { path: "/dashboard", icon: <Home size={20} className="text-gray-500" />, label: "Dashboard" },
  { 
    path: "/biblioteca", 
    icon: <BookOpen size={20} className="text-gray-500" />, 
    label: "Biblioteca",
    subItems: [
      { path: "/biblioteca/libros", icon: <BookText size={18} className="text-gray-500" />, label: "Libros" },
      { path: "/biblioteca/colecciones", icon: <FolderIcon size={18} className="text-gray-500" />, label: "Series" },
      { path: "/biblioteca/investigaciones", icon: <FileSearch size={18} className="text-gray-500" />, label: "Investigaciones" },
    ]
  },
  { path: "/marketing", icon: <MegaphoneIcon size={20} className="text-gray-500" />, label: "Marketing" },
  { path: "/finanzas", icon: <PieChart size={20} className="text-gray-500" />, label: "Finanzas" },
  { 
    path: "/checkout", 
    icon: <ShoppingCart size={20} className="text-gray-500" />, 
    label: "Checkout",
    subItems: [
      { path: "/checkout", icon: <ShoppingCart size={18} className="text-gray-500" />, label: "Checkout" },
      { path: "/checkout/success", icon: <ShoppingCart size={18} className="text-gray-500" />, label: "Éxito" },
      { path: "/checkout/cancel", icon: <ShoppingCart size={18} className="text-gray-500" />, label: "Cancelado" },
    ]
  },
  { path: "/perfil", icon: <User size={20} className="text-gray-500" />, label: "Perfil" },
  { path: "/configuracion", icon: <Settings size={20} className="text-gray-500" />, label: "Configuración" },
  { path: "/contacto", icon: <MegaphoneIcon size={20} className="text-gray-500" />, label: "Contacto" },
];
