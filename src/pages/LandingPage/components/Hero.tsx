import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardImg from "@/assets/publify-dashboard-concept.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

export const Hero = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center px-4 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
          
          {/* Título principal */}
          <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Sistema Operativo Editorial{" "}
            <span className="text-primary">para publishers de KDP</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p variants={fadeInUp} className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Todo tu negocio editorial en un solo sistema. Por fin.
          </motion.p>

          {/* Texto de dolor */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Si tu operativa vive entre Drive, Sheets, Notion, freelancers y Ads, no tienes control. Tienes parches.
          </motion.p>

          {/* Tagline en azul */}
          <motion.p variants={fadeInUp} className="text-base md:text-lg font-semibold text-accent mb-10">
            Investiga → Crea → Analiza → Escala
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button onClick={scrollToWaitlist} size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
                Unirme a la waitlist
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button onClick={scrollToHowItWorks} variant="outline" size="lg" className="text-lg px-8 py-6 border-border hover:border-primary/50 hover:bg-primary/5">
                <ArrowDown className="mr-2" size={18} />
                Ver cómo funciona
              </Button>
            </motion.div>
          </motion.div>

          {/* Microcopy conversión */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-16">
            <span>✓ Apuntarte es gratis</span>
            <span>✓ Acceso progresivo desde el 1 de abril</span>
            <span>✓ Cupo: 20–30 early adopters</span>
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10"
            >
              <img 
                src={dashboardImg} 
                alt="Publify Dashboard - Sistema Operativo Editorial con el libro como nodo central" 
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
