import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BarChart3, Eye, Layers, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardImg from "@/assets/publify-dashboard-concept.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const benefits = [
{ icon: BookOpen, text: "Toda la información de cada libro en un solo lugar" },
{ icon: BarChart3, text: "Decisiones con datos reales" },
{ icon: Eye, text: "Visión clara de tu catálogo" },
{ icon: Layers, text: "Escalar tu editorial sin caos" },
{ icon: TrendingUp, text: "Recuperar horas cada semana" }];


export const Hero = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center px-4 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Partículas y formas geométricas flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triángulos flotantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`tri-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            <svg width={20 + i * 8} height={20 + i * 8} viewBox="0 0 40 40">
              <polygon
                points="20,4 36,36 4,36"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        ))}

        {/* Círculos pulsantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: `${5 + i * 18}%`,
              top: `${20 + ((i * 37) % 60)}%`,
              background: i % 2 === 0
                ? 'hsl(var(--primary))'
                : 'hsl(var(--accent))',
            }}
            animate={{
              y: [0, -60 - i * 10, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Hexágonos */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              right: `${8 + i * 15}%`,
              top: `${10 + i * 30}%`,
            }}
            animate={{
              rotate: [0, 120, 240, 360],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <svg width={30 + i * 12} height={30 + i * 12} viewBox="0 0 50 50">
              <polygon
                points="25,2 46,14 46,36 25,48 4,36 4,14"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        ))}

        {/* Líneas diagonales cruzando */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] w-40"
            style={{
              top: `${25 + i * 25}%`,
              left: '-10%',
              background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)`,
            }}
            animate={{
              x: ['0%', '400%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3,
            }}
          />
        ))}
      </div>
      <div className="mx-auto w-[90%]">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left — Text */}
          <div className="text-left">
            <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Gestiona toda tu editorial desde un solo lugar
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-primary mb-6 md:text-3xl font-light">
              Recupera horas cada semana con el único sistema diseñado para publishers KDP.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              Con Publify puedes gestionar todo tu negocio editorial en un solo lugar:
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-8">
              {["Investiga", "Crea", "Analiza", "Escala"].map((step, i) =>
              <span key={step} className="flex items-center gap-2 text-xs">
                  <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.25, duration: 0.4 }}
                  className="relative inline-flex items-center px-3 py-1.5 rounded-full md:text-base font-semibold tracking-wide uppercase text-xs overflow-hidden"
                  style={{
                    color: 'hsl(217, 91%, 60%)',
                    background: 'hsl(217, 91%, 60%, 0.1)',
                    border: '1px solid hsl(217, 91%, 60%, 0.25)'
                  }}>
                    {/* Highlight que recorre cada paso */}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, hsl(217, 91%, 60%, 0.3) 50%, transparent 100%)',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2 + i * 0.6,
                        repeatDelay: 2.4 - i * 0.6 + 1.8,
                      }}
                    />
                    <span className="relative z-10">{step}</span>
                  </motion.span>
                  {i < 3 &&
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.0 + i * 0.25, duration: 0.3 }}
                  className="text-lg"
                  style={{ color: 'hsl(217, 91%, 60%)' }}>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.3 + i * 0.6,
                      }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                }
                </span>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-5 sm:grid-cols-5 gap-3 mb-8">
              {benefits.map((b, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/80 border border-border text-left">
                  <b.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{b.text}</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-start gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button onClick={scrollToWaitlist} size="lg" className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
                  Unirme a la Waitlist
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Solo tu email. Sin tarjeta. Sin compromiso.
              </p>
            </motion.div>
          </div>

          {/* Right — Dashboard image */}
          <motion.div
            variants={fadeInUp}
            className="relative"
            style={{ perspective: "1200px" }}>
            {/* Glow behind the image */}
            <div className="absolute -inset-4 rounded-2xl bg-primary/15 blur-2xl" />
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, rotateX: 2, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotateX: 0, scale: 1.02, transition: { duration: 0.4 } }}
              className="relative rounded-xl overflow-hidden border-2 border-border"
              style={{
                boxShadow: "0 25px 60px -12px hsl(var(--primary) / 0.25), 0 12px 30px -8px rgba(0,0,0,0.3)",
                transformStyle: "preserve-3d"
              }}>
              <img
                src={dashboardImg}
                alt="Publify Dashboard - Sistema Operativo Editorial"
                className="w-full h-auto"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>);

};