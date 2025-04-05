
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  BookMarked, 
  LineChart, 
  Settings, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Rocket,
  Zap
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const LandingPage = () => {
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

  const handleGetStarted = () => {
    navigate("/register");
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
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

  const benefits = [
    {
      title: "Todo en uno",
      description: "Olvídate de 7 herramientas diferentes."
    },
    {
      title: "Enfocado en KDP",
      description: "Está pensado especialmente para ti."
    },
    {
      title: "Visual y claro",
      description: "Sin curva técnica de aprendizaje."
    },
    {
      title: "Te ahorra tiempo",
      description: "Automatiza tu operativa editorial."
    },
    {
      title: "Escalable con tu negocio",
      description: "Desde autores independientes hasta editoriales establecidas."
    },
    {
      title: "Interfaz intuitiva",
      description: "Diseñada pensando en la mejor experiencia de usuario."
    }
  ];

  const faqs = [
    {
      question: "¿Necesito saber programar o diseñar?",
      answer: "No. Publify está hecho para ser intuitivo desde el primer clic, con una interfaz amigable diseñada para autores y editores, no para programadores."
    },
    {
      question: "¿Puedo importar libros desde otras plataformas?",
      answer: "Sí. Puedes traer tus datos desde Notion, Drive o Excel fácilmente con nuestras herramientas de importación."
    },
    {
      question: "¿Solo sirve para Amazon KDP?",
      answer: "Está optimizado para KDP, pero puedes adaptarlo a otras plataformas fácilmente. Trabajamos continuamente para añadir integración con más plataformas."
    },
    {
      question: "¿Cómo funciona el sistema de marketing?",
      answer: "Publify integra herramientas de marketing digital como creación de landing pages, formularios, campañas de email y análisis de resultados, todo desde un único panel."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 border-b border-opacity-0 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center">
            <span className="font-heading text-2xl font-bold text-foreground">Publify</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 md:flex">
            <a href="#caracteristicas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Características
            </a>
            <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Beneficios
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <button 
              onClick={toggleTheme} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                href="#caracteristicas" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Características
              </a>
              <a 
                href="#beneficios" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Beneficios
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
                Modo {theme === "dark" ? "Claro" : "Oscuro"}
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

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            variants={fadeIn}
            className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Gestiona y haz crecer tu editorial de <span className="text-primary">KDP</span> desde un solo lugar
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="mt-6 text-lg text-muted-foreground md:text-xl"
          >
            Publify es tu centro de control para autopublicadores y editoriales modernas. Unifica tu biblioteca, 
            automatiza tu marketing y domina tu negocio editorial sin caos.
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0"
          >
            <Button 
              onClick={handleGetStarted}
              className="group text-base px-8 py-6"
              size="lg"
            >
              Quiero probar Publify
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Button>
            <Button 
              variant="outline"
              onClick={handleLogin}
              size="lg"
              className="text-base px-8 py-6"
            >
              Solicitar acceso anticipado
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Chaos Section */}
      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <motion.div 
          className="mx-auto max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center"
            variants={fadeIn}
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">El Caos de Publicar sin Sistema</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              La gestión editorial tradicional implica múltiples herramientas y un constante cambio de contexto
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={staggerContainer}
          >
            {[
              {
                title: "Dispersión de datos",
                description: "Tu biblioteca está repartida entre Excel, Notion, Drive y carpetas infinitas."
              },
              {
                title: "Marketing manual",
                description: "Tu marketing es reactivo, manual y nada escalable."
              },
              {
                title: "Tiempo perdido",
                description: "Pierdes horas cada semana en tareas repetitivas."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="mb-2 font-heading text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={fadeIn}
          >
            <p className="text-lg font-medium">
              <span className="text-primary">Publify</span> pone orden, foco y automatización en el corazón de tu negocio editorial.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Two Systems Section */}
      <section id="caracteristicas" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Dos Sistemas, Un Solo Panel</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Combina gestión editorial y marketing en una única plataforma
            </p>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div 
              className="rounded-xl border bg-card p-8 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="mb-6 rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary">
                <BookOpen size={28} />
              </div>
              <h3 className="mb-4 font-heading text-2xl font-bold">Gestión Editorial Inteligente</h3>
              <ul className="space-y-3">
                {[
                  "Organiza libros, colecciones e investigaciones sin perderte.",
                  "Accede a toda tu información en una vista clara y estructurada.",
                  "Sincronización total y backups automáticos.",
                  "Desde la idea hasta la venta, todo bajo control."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="mt-6"
                variant="outline"
                onClick={() => navigate("/biblioteca/libros")}
              >
                Explorar gestión editorial
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="rounded-xl border bg-card p-8 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="mb-6 rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary">
                <Zap size={28} />
              </div>
              <h3 className="mb-4 font-heading text-2xl font-bold">Marketing Automatizado y Sin Dolor</h3>
              <ul className="space-y-3">
                {[
                  "Crea webs, formularios, campañas y embudos en minutos.",
                  "Gestiona tus contactos y correos desde un solo CRM.",
                  "Ahorra tiempo, gana lectores, fideliza clientes.",
                  "Publify trabaja mientras tú creas."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="mt-6"
                variant="outline"
                onClick={() => navigate("/marketing")}
              >
                Descubrir marketing
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Características Principales</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Publify ofrece todas las herramientas que necesitas para gestionar tu actividad editorial de forma eficiente
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover group rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-heading text-xl font-medium">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Beneficios Clave</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Descubre cómo Publify puede transformar tu proceso editorial
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Check size={24} className="mb-4 text-primary" />
                <h3 className="mb-2 font-heading text-lg font-medium">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Finance Module Section */}
      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary mb-6">
                <LineChart size={28} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-6">Finanzas bajo control</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Módulo en desarrollo que transformará la forma en que analizas tus resultados
              </p>
              <ul className="space-y-4">
                {[
                  "Importa CSV de tus regalías automáticamente",
                  "Conecta gastos por libro y campaña",
                  "Visualiza beneficios netos por proyecto",
                  "Genera informes detallados para tu contabilidad"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="text-center p-6">
                <p className="text-primary font-medium mb-2">Módulo en desarrollo</p>
                <h3 className="text-xl font-heading font-bold mb-4">Disponible próximamente</h3>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                >
                  <Button onClick={() => navigate("/finanzas")} variant="outline">
                    Vista previa
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:py-28">
        <motion.div 
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Rocket size={32} />
            </div>
          </div>
          <h2 className="font-heading text-4xl font-bold mb-6">Haz despegar tu editorial</h2>
          <p className="mb-10 text-lg text-muted-foreground mx-auto max-w-2xl">
            Empieza hoy con la herramienta que transforma tu operativa editorial desde el minuto uno.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 shadow-lg"
              size="lg"
            >
              Solicitar acceso anticipado
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-heading text-3xl font-bold">Preguntas Frecuentes</h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left font-heading py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12">
        <motion.div 
          className="mx-auto max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-heading text-2xl font-bold mb-2">Publify</span>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                La plataforma todo-en-uno para autores y editoriales.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 sm:flex-row">
              <div>
                <h4 className="font-heading text-sm font-medium mb-3">Enlaces rápidos</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#caracteristicas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Características
                    </a>
                  </li>
                  <li>
                    <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Beneficios
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading text-sm font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Términos y condiciones
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Política de privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Publify. Todos los derechos reservados.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
