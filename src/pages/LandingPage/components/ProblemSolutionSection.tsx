import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, Search, FileX, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const timeWasters = [{
  icon: <Search className="w-8 h-8 text-red-500" />,
  title: "5 horas semanales perdidas",
  description: "Saltando entre Google Drive, Excels, email marketing, herramientas de diseño, KDP, redes sociales...",
  impact: "260 horas anuales malgastadas"
}, {
  icon: <FileX className="w-8 h-8 text-red-500" />,
  title: "Archivos y datos dispersos",
  description: "Portadas en un sitio, manuscritos en otro, datos de ventas en Excel, leads en diferentes plataformas",
  impact: "Decisiones lentas y poco informadas"
}, {
  icon: <TrendingDown className="w-8 h-8 text-red-500" />,
  title: "Oportunidades perdidas",
  description: "Leads sin seguimiento, campañas descoordinadas, no sabes qué libros son rentables",
  impact: "Menos ventas de las que podrías tener"
}];
const solutionPoints = [{
  icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  title: "Una sola plataforma, todo centralizado",
  description: "Gestión de libros, marketing, finanzas y CRM desde un único panel",
  benefit: "Ahorra 5+ horas semanales"
}, {
  icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  title: "Marketing automatizado sin complicaciones",
  description: "Landing pages, email marketing, funnels y CRM integrado en español",
  benefit: "Más leads, mejores conversiones"
}, {
  icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  title: "Datos y finanzas cristalinas",
  description: "Ve el rendimiento real de cada libro, controla gastos e ingresos fácilmente",
  benefit: "Decisiones inteligentes basadas en datos"
}];
export const ProblemSolutionSection = () => {
  const navigate = useNavigate();
  return <section className="relative py-20 bg-background overflow-hidden">
      {/* Creative animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating problem elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-red-500/10 rounded-full"
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
        
        {/* Connecting lines animation */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/30 px-6 py-3 rounded-full mb-6"
          >
            <Clock className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600 dark:text-red-400">⏰ Realidad: Pierdes tiempo, dinero y oportunidades</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            El <span className="text-red-500 relative">
              caos editorial
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span> vs{" "}
            <span className="text-green-500 relative">
              el control total
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-green-500/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            La gestión editorial tradicional te tiene corriendo como un pollo sin cabeza. 
            <strong className="text-foreground"> Publify centraliza todo para que recuperes la cordura.</strong>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Problem Side - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated chaos visualization */}
            <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-dashed border-red-500 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-red-300 rounded-full"
              />
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-2xl border-2 border-red-200 dark:border-red-800/30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">El caos editorial actual</h3>
              </div>
              
              <div className="space-y-6">
                {timeWasters.map((point, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group flex items-start gap-4 p-6 bg-white/80 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-700/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="mt-1">{point.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-foreground group-hover:text-red-600 transition-colors">{point.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{point.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                          💸 {point.impact}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Side - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated success visualization */}
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
            
            <div className="bg-green-50 dark:bg-green-950/20 p-8 rounded-2xl border-2 border-green-200 dark:border-green-800/30 shadow-lg">
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
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Publify: Control total</h3>
              </div>
              
              <div className="space-y-6">
                {solutionPoints.map((point, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group flex items-start gap-4 p-6 bg-white/80 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/30 hover:shadow-md transition-all duration-300"
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
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FB923C]/5 via-[#FB923C]/10 to-[#FB923C]/5 rounded-2xl" />
          <div className="relative bg-gradient-to-br from-[#FB923C]/10 via-transparent to-primary/5 p-10 rounded-2xl border-2 border-[#FB923C]/20 backdrop-blur-sm">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-gradient-to-r from-[#FB923C] to-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Publify no te da más trabajo.{" "}
                <span className="text-[#FB923C]">Te devuelve la vida que habías perdido.</span>
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
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
                  className="bg-gradient-to-r from-[#FB923C] to-primary hover:shadow-lg hover:shadow-[#FB923C]/30 px-10 py-6 text-lg font-bold"
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
        </motion.div>
      </div>
    </section>;
};