
import { Bell, Menu, User, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const Header = ({
  toggleSidebar,
  sidebarOpen
}: {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-14 items-center border-b border-border px-4 py-2"
    >
      <motion.button
        className="rounded p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={20} />
      </motion.button>
      
      <div className="ml-4 mr-auto"></div>
      
      <div className="flex items-center space-x-2">
        {/* Botón de tema */}
        <motion.button
          className="rounded-full p-2 hover:bg-muted"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          whileHover={{
            scale: 1.1,
            rotate: theme === "dark" ? 180 : 0
          }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        
        {/* Notificaciones */}
        <motion.button
          className="rounded-full p-2 hover:bg-muted"
          aria-label="Notificaciones"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={18} />
        </motion.button>
        
        {/* Avatar del usuario con dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              className="flex cursor-pointer items-center space-x-1 rounded-full p-1 hover:bg-muted"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl || undefined} alt={user?.nombre || "Usuario"} />
                <AvatarFallback>
                  <User size={20} className="text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <span className="ml-1 hidden text-sm md:inline-block">
                {user?.nombre || "Usuario"}
              </span>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;
