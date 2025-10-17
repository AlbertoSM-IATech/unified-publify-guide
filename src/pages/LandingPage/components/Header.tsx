import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/publify-logo-dark.png";
import logoLight from "@/assets/publify-logo-light.png";

export const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <header className={`fixed top-0 w-full z-50 border-b border-opacity-0 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center">
          <img 
            src={theme === "dark" ? logoLight : logoDark} 
            alt="Publify - La Herramienta de los Publishers Inteligentes" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex items-center">
          <a href="#realidad" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            La Realidad
          </a>
          <a href="#problema-solucion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Problema/Solución
          </a>
          <a href="#que-es-publify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ¿Qué es Publify?
          </a>
          <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cómo Funciona
          </a>
          <a href="#para-quien" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Para Quién
          </a>
          <a href="#precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Precios
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
          <button 
            onClick={toggleTheme} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="rounded-md p-2 md:hidden" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Authentication Buttons (Desktop) */}
        <div className="hidden space-x-4 md:flex">
          <Button 
            variant="outline"
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <Button 
            onClick={handleRegister}
          >
            Registrarse
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border px-4 py-4 md:hidden bg-background">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#realidad" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              La Realidad
            </a>
            <a 
              href="#problema-solucion" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Problema/Solución
            </a>
            <a 
              href="#que-es-publify" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              ¿Qué es Publify?
            </a>
            <a 
              href="#como-funciona" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Cómo Funciona
            </a>
            <a 
              href="#para-quien" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Para Quién
            </a>
            <a 
              href="#precios" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Precios
            </a>
            <a 
              href="#faq" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
            <button 
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }} 
              className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>
            <div className="flex flex-col gap-3 pt-2">
              <Button 
                variant="outline"
                onClick={handleLogin}
                className="w-full"
              >
                Iniciar sesión
              </Button>
              <Button 
                onClick={handleRegister}
                className="w-full"
              >
                Registrarse
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
