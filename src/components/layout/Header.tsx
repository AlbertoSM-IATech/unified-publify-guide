
import { Bell, Menu, User, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";

const Header = ({ 
  toggleSidebar, 
  sidebarOpen 
}: { 
  toggleSidebar: () => void; 
  sidebarOpen: boolean; 
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="flex h-14 items-center border-b border-border px-4 py-2">
      <button
        className="rounded p-1.5 text-foreground hover:bg-muted lg:hidden"
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
        <div className="flex items-center space-x-1 rounded-full p-1 hover:bg-muted">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-secondary">
            <User size={20} className="h-full w-full p-1" />
          </div>
          <span className="ml-1 hidden text-sm md:inline-block">
            {user?.nombre || "Usuario"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
