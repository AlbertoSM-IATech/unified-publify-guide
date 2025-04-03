import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, BookMarked, LineChart, Settings, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/");
  };

  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Biblioteca Digital",
      description: "Gestiona todos tus libros, colecciones e investigaciones en un solo lugar. Organiza la información de manera eficiente."
    },
    {
      icon: <BookMarked size={24} />,
      title: "Fichas de Libros",
      description: "Crea fichas detalladas para cada libro con toda la información relevante: ISBN, ASIN, portadas, estados y más."
    },
    {
      icon: <LineChart size={24} />,
      title: "Finanzas Editoriales",
      description: "Controla tus ingresos y gastos editoriales. Visualiza gráficos de rendimiento y exporta informes detallados."
    },
    {
      icon: <Settings size={24} />,
      title: "Marketing Integrado",
      description: "Integración con plataformas de marketing para potenciar la visibilidad de tus libros."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center">
            <span className="font-heading text-2xl font-bold text-foreground">Publify</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 md:flex">
            <a href="#caracteristicas" className="text-sm text-muted-foreground hover:text-foreground">
              Características
            </a>
            <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground">
              Beneficios
            </a>
            <button 
              onClick={toggleTheme} 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Modo {theme === "dark" ? "Claro" : "Oscuro"}
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
            <button 
              onClick={handleLogin}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted"
            >
              Iniciar sesión
            </button>
            <button 
              onClick={handleRegister}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Registrarse
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-border px-4 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#caracteristicas" 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Características
              </a>
              <a 
                href="#beneficios" 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Beneficios
              </a>
              <button 
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }} 
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                Modo {theme === "dark" ? "Claro" : "Oscuro"}
              </button>
              <div className="flex space-x-4 pt-2">
                <button 
                  onClick={handleLogin}
                  className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted"
                >
                  Iniciar sesión
                </button>
                <button 
                  onClick={handleRegister}
                  className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  Registrarse
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Gestiona tu actividad editorial con <span className="text-primary">Publify</span>
          </h1>
          <p className="animate-fade-in mt-6 text-lg text-muted-foreground md:text-xl">
            La plataforma todo-en-uno para autores y editoriales. 
            Organiza tu biblioteca, controla tus finanzas y optimiza tu marketing editorial.
          </p>
          <div className="animate-fade-in mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button 
              onClick={handleRegister}
              className="flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              Empezar ahora
              <ChevronRight size={16} className="ml-2" />
            </button>
            <button 
              onClick={handleLogin}
              className="flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium hover:bg-muted"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Características Principales</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Publify ofrece todas las herramientas que necesitas para gestionar tu actividad editorial de forma eficiente
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-hover group rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-heading text-xl font-medium">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">¿Por qué elegir Publify?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Descubre cómo Publify puede transformar tu proceso editorial
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                title: "Todo en un solo lugar",
                description: "Centraliza toda la información de tus libros, finanzas y marketing en una única plataforma."
              },
              {
                title: "Ahorra tiempo y esfuerzo",
                description: "Automatiza procesos y evita la duplicación de tareas con nuestras herramientas especializadas."
              },
              {
                title: "Toma mejores decisiones",
                description: "Analiza datos y obtén insights valiosos para optimizar tu estrategia editorial."
              },
              {
                title: "Escalable con tu negocio",
                description: "Diseñado para crecer contigo, desde autores independientes hasta editoriales establecidas."
              },
              {
                title: "Interfaz intuitiva",
                description: "Diseño moderno y fácil de usar que no requiere conocimientos técnicos especiales."
              },
              {
                title: "Seguridad de tus datos",
                description: "Tus datos están protegidos con los más altos estándares de seguridad y privacidad."
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 font-heading text-lg font-medium">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={handleRegister}
              className="rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              Comenzar a usar Publify
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div>
              <span className="font-heading text-xl font-bold">Publify</span>
              <p className="mt-1 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Publify. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Términos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
