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
      <div className="mx-auto max-w-6xl w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left — Text */}
          <div className="text-left">
            <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
              Gestiona tu editorial desde un solo lugar{" "}
              <span className="text-primary">y ahorra horas cada semana.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Publify convierte el caos de usar herramientas genéricas como Sheets, Notion, Drive y el panel de KDP en un{" "}
              <strong className="text-foreground">sistema claro para publishers</strong>.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base font-semibold tracking-widest uppercase text-accent-foreground mb-8" style={{ color: 'hsl(217, 91%, 60%)' }}>
              Investiga → Crea → Analiza → Escala
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
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
            className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10">
              <img
                src={dashboardImg}
                alt="Publify Dashboard - Sistema Operativo Editorial"
                className="w-full h-auto"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>);

};