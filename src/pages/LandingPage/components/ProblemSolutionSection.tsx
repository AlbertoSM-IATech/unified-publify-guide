import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, Search, FileX, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TextReveal } from "@/components/motion/TextReveal";

const timeWasters = [{
  icon: <Search className="w-6 h-6 text-primary" />,
  title: "5 horas semanales perdidas",
  description: "Saltando entre Google Drive, Excels, email marketing, herramientas de diseño, KDP, redes sociales...",
  impact: "260 horas anuales malgastadas"
}, {
  icon: <FileX className="w-6 h-6 text-primary" />,
  title: "Archivos y datos dispersos",
  description: "Portadas en un sitio, manuscritos en otro, datos de ventas en Excel, leads en diferentes plataformas",
  impact: "Decisiones lentas y poco informadas"
}, {
  icon: <TrendingDown className="w-6 h-6 text-primary" />,
  title: "Oportunidades perdidas",
  description: "Leads sin seguimiento, campañas descoordinadas, no sabes qué libros son rentables",
  impact: "Menos ventas de las que podrías tener"
}];

const solutionPoints = [{
  icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  title: "Una sola plataforma, todo centralizado",
  description: "Gestión de libros, marketing, finanzas y CRM desde un único panel",
  benefit: "Ahorra 5+ horas semanales"
}, {
  icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  title: "Marketing automatizado sin complicaciones",
  description: "Landing pages, email marketing, funnels y CRM integrado en español",
  benefit: "Más leads, mejores conversiones"
}, {
  icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  title: "Datos y finanzas cristalinas",
  description: "Ve el rendimiento real de cada libro, controla gastos e ingresos fácilmente",
  benefit: "Decisiones inteligentes basadas en datos"
}];

export const ProblemSolutionSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 pointer-events-none">
        <div data-gsap="parallax-bg" className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-primary/10 dark:bg-primary/25 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 49%, hsl(var(--primary)) 50%, transparent 51%),
              linear-gradient(-45deg, transparent 49%, hsl(var(--accent)) 50%, transparent 51%)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div data-gsap="section-header" className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-6 py-3 rounded-full mb-6"
          >
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">⏰ Realidad: Pierdes tiempo, dinero y oportunidades</span>
          </motion.div>
          
          <TextReveal as="h2" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
            El caos editorial vs el control total
          </TextReveal>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La gestión editorial tradicional te tiene corriendo como un pollo sin cabeza. 
            <strong className="text-foreground"> Publify centraliza todo para que recuperes la cordura.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Problem Side */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-dashed border-primary rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-primary/30 rounded-full"
              />
            </div>
            
            <div className="bg-primary/5 dark:bg-primary/10 p-8 md:p-10 rounded-2xl border-2 border-primary/20 dark:border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-primary">El caos editorial actual</h3>
                  <p className="text-sm text-muted-foreground mt-1">El problema no es que trabajes mucho. <span className="text-primary font-semibold">Es que trabajas sin un sistema.</span></p>
                </div>
              </div>
              
              <div className="space-y-3">
                {timeWasters.map((point, index) => (
                  <div 
                    key={index}
                    data-gsap="problem-card"
                    className="group flex items-start gap-3 p-4 bg-card/80 dark:bg-primary/10 rounded-lg border border-primary/30 dark:border-primary/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="mt-1">{point.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-sm text-foreground group-hover:text-primary transition-colors">{point.title}</h4>
                      <p className="text-muted-foreground text-xs mb-2 leading-relaxed">{point.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                          💸 {point.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 opacity-20">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              />
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-8 md:p-10 rounded-2xl border-2 border-green-200 dark:border-green-800/30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-green-600 dark:text-green-400">Publify: Control total</h3>
                  <p className="text-sm text-muted-foreground mt-1">Todo tu negocio editorial en un solo sistema. <span className="text-green-600 dark:text-green-400 font-semibold">Por fin.</span></p>
                </div>
              </div>
              
              <div className="space-y-3">
                {solutionPoints.map((point, index) => (
                  <div 
                    key={index}
                    data-gsap="solution-card"
                    className="group flex items-start gap-4 p-5 bg-card/80 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="mt-1">{point.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-foreground group-hover:text-green-600 transition-colors">{point.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{point.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                          ✨ {point.benefit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div data-gsap="cta-pin" className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl" />
          <div data-gsap="cta-content" className="relative bg-gradient-to-br from-primary/10 via-transparent to-accent/5 p-10 md:p-12 rounded-2xl border-2 border-primary/20 backdrop-blur-sm">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              
              <TextReveal as="h3" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Publify no te da más trabajo. Te devuelve la vida que habías perdido.
              </TextReveal>
              
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Imagina tener todos tus libros, datos financieros, campañas de marketing y contactos 
                organizados en un solo lugar. <strong>Sin caos. Sin pérdidas de tiempo. Solo claridad.</strong>
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")} 
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 px-8 py-5 text-base font-bold text-primary-foreground"
                >
                  🚀 Recupera el control de tu editorial
                </Button>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Sistema completo de gestión</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Soporte en español</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
