import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/publify-logo-dark.png";
import logoLight from "@/assets/publify-logo-light.png";

const navLinks = [
  { href: "#problema", label: "Problema" },
  { href: "#waitlist", label: "Preventa" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : ""}`}>
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center">
          <img 
            src={theme === "dark" ? logoLight : logoDark} 
            alt="Publify - Sistema Operativo Editorial" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground leading-tight">Gratis · Plazas limitadas</p>
          </div>
          <Button onClick={scrollToWaitlist} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Quiero acceso prioritario
          </Button>
        </div>
        
        <button className="rounded-md p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="border-t border-border px-4 py-4 md:hidden bg-background">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors">
             <><Sun size={16} className="inline mr-1" /> Modo Claro</> : <><Moon size={16} className="inline mr-1" /> Modo Oscuro</> : "🌙 Modo Oscuro"}
            </button>
            <div className="pt-2">
              <Button onClick={scrollToWaitlist} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Quiero acceso prioritario
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
