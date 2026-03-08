import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BarChart3, Eye, Layers, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/motion/ParticlesBackground";
import { TextReveal } from "@/components/motion/TextReveal";
import dashboardImg from "@/assets/publify-dashboard-concept.jpg";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
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
    <section className="relative flex flex-col items-center px-4 pt-36 pb-28 md:pt-48 md:pb-40 overflow-hidden">
      {/* tsParticles profesionales */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticlesBackground />
      </div>
      <div className="mx-auto w-[90%]">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left — Text */}
          <div className="text-left">
            {/* GSAP text reveal — letter by letter */}
            <TextReveal
              as="h1"
              className="font-heading text-5xl md:text-6xl font-bold tracking-tight mb-6 text-primary lg:text-7xl"
              immediate
              delay={0.3}
              stagger={0.015}
              duration={0.5}
            >
              Gestiona toda tu editorial desde un solo lugar
            </TextReveal>

            <TextReveal
              as="p"
              className="text-xl mb-8 md:text-3xl lg:text-4xl font-light text-primary-foreground"
              immediate
              delay={0.9}
              stagger={0.01}
              duration={0.4}
            >
              Recupera horas cada semana con el único sistema diseñado para publishers KDP.
            </TextReveal>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Con Publify puedes gestionar todo tu negocio editorial en un solo lugar:
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-12">
              {["Investiga", "Crea", "Analiza", "Escala"].map((step, i) =>
              <span key={step} className="flex items-center gap-2 text-xs">
                  <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.25, duration: 0.4 }}
                  className="relative inline-flex items-center px-3 py-1.5 rounded-full md:text-base font-semibold tracking-wide uppercase text-xs overflow-hidden bg-accent/10 text-accent border border-accent/25">
                  
                    <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.3) 50%, transparent 100%)'
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2 + i * 0.6,
                      repeatDelay: 2.4 - i * 0.6 + 1.8
                    }} />
                  
                    <span className="relative z-10 text-xs">{step}</span>
                  </motion.span>
                  {i < 3 &&
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.0 + i * 0.25, duration: 0.3 }}
                  className="text-lg text-accent">
                  
                      <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.3 + i * 0.6
                    }}>
                    
                        →
                      </motion.span>
                    </motion.span>
                }
                </span>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-5 sm:grid-cols-5 gap-4 mb-12">
              {benefits.map((b, i) =>
              <motion.div
                key={i}
                data-gsap="benefit-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-card/80 border border-border text-left">
                
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
              <p className="text-sm text-accent">
                Solo tu email. Sin tarjeta. Sin compromiso.
              </p>
            </motion.div>
          </div>

          {/* Right — Dashboard image */}
          <motion.div
            variants={fadeInUp}
            className="relative"
            style={{ perspective: "1200px" }}>
            
            <div className="absolute -inset-8 rounded-3xl bg-primary/15 blur-3xl" />
            <motion.div
              data-gsap="hero-dashboard"
              initial={{ opacity: 0, y: 60, rotateX: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, rotateX: 2, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotateX: 0, scale: 1.02, transition: { duration: 0.4 } }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}>
              
              {/* Laptop frame */}
              <div
                className="relative rounded-t-xl overflow-hidden bg-neutral-900 p-[3px] pt-0"
                style={{
                  boxShadow: "0 25px 60px -12px hsl(var(--primary) / 0.25), 0 12px 30px -8px rgba(0,0,0,0.4)",
                }}>
                
                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 rounded-t-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-neutral-700/60 text-neutral-400 text-xs font-mono">
                      <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      app.publify.io
                    </div>
                  </div>
                </div>

                {/* Screen / dashboard image */}
                <div className="relative">
                  <img
                    src={dashboardImg}
                    alt="Publify Dashboard - Sistema Operativo Editorial"
                    className="w-full h-auto block"
                    loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Laptop base */}
              <div
                className="mx-auto h-3 bg-neutral-800 rounded-b-lg"
                style={{
                  width: "70%",
                  clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0% 100%)",
                }}
              />
              <div
                className="mx-auto h-[3px] rounded-b bg-neutral-700"
                style={{ width: "20%" }}
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>);

};