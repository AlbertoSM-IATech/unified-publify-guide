
import { Bell, Menu, User, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ 
  toggleSidebar, 
  sidebarOpen 
}: { 
  toggleSidebar: () => void; 
  sidebarOpen: boolean; 
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <header className="flex h-14 items-center border-b border-border px-4 py-2">
      <button
        className="rounded p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>
      
      <div className="ml-4 mr-auto">
        {/* Se puede agregar un buscador o título de página aquí */}
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Botón de tema */}
        <button
          className="rounded-full p-2 hover:bg-muted"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {/* Notificaciones */}
        <button className="rounded-full p-2 hover:bg-muted" aria-label="Notificaciones">
          <Bell size={18} />
        </button>
        
        {/* Avatar del usuario */}
        <button 
          onClick={handleProfileClick}
          className="flex cursor-pointer items-center space-x-1 rounded-full p-1 hover:bg-muted"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User size={20} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="ml-1 hidden text-sm md:inline-block">
            {user?.nombre || "Usuario"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
