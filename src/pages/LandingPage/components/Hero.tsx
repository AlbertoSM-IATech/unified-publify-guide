import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BarChart3, Eye, Layers, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/motion/ParticlesBackground";
import { TextReveal } from "@/components/motion/TextReveal";
import { TypewriterURL } from "@/components/motion/TypewriterURL";
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
{ icon: BookOpen, text: "Información Centralizada" },
{ icon: BarChart3, text: "Decisiones con datos reales" },
{ icon: Eye, text: "Visión clara de tu negocio" },
{ icon: Layers, text: "Escalar sin caos" },
{ icon: TrendingUp, text: "Recuperar horas cada semana" }];


export const Hero = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center px-4 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* tsParticles profesionales */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticlesBackground />
      </div>
      <div className="mx-auto w-[90%]">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left — Text */}
          <div className="text-left">
            {/* GSAP text reveal — letter by letter */}
            <div className="mb-4">
              <TextReveal
                as="h1"
                className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary lg:text-5xl"
                immediate
                delay={0.3}
                stagger={0.015}
                duration={0.5}>
                
                Gestiona toda tu editorial
              </TextReveal>
              <TextReveal
                as="h1"
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary"
                immediate
                delay={0.6}
                stagger={0.015}
                duration={0.5}>
                
                desde un solo lugar
              </TextReveal>
            </div>

            <TextReveal
              as="p"
              className="text-lg mb-6 md:text-xl lg:text-2xl font-light text-foreground/80"
              immediate
              delay={0.9}
              stagger={0.01}
              duration={0.4}>
              
              Recupera horas cada semana con el único sistema diseñado para publishers KDP.
            </TextReveal>


            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2.5 mb-8">
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

            <motion.div variants={fadeInUp} className="grid grid-cols-5 sm:grid-cols-5 gap-3 mb-8">
              {benefits.map((b, i) =>
              <motion.div
                key={i}
                data-gsap="benefit-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/80 border border-border text-left">
                
                  <b.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs text-foreground">{b.text}</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-start gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button onClick={scrollToWaitlist} size="lg" className="text-base px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25">
                  Unirme a la Waitlist
                  <ArrowRight className="ml-2" size={18} />
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
            className="relative self-center"
            style={{ perspective: "1200px" }}>
            
            {/* Glow behind laptop */}
            <div className="absolute -inset-10 rounded-3xl bg-primary/20 blur-[60px]" />
            <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-[40px]" />
            
            <motion.div
              data-gsap="hero-dashboard"
              initial={{ opacity: 0, y: 60, rotateX: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, rotateX: 3, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotateX: 0, scale: 1.03, transition: { duration: 0.5 } }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}>
              
              {/* Monitor frame */}
              <div
                className="relative rounded-2xl overflow-hidden border border-neutral-700/50"
                style={{
                  background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1e 100%)",
                  padding: "2px",
                  boxShadow: "0 30px 80px -15px hsl(var(--primary) / 0.3), 0 15px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}>
                
                {/* Inner bezel */}
                <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1e" }}>
                  {/* Browser top bar */}
                  <div className="flex items-center gap-3 px-4 py-2" style={{ background: "linear-gradient(180deg, #333338 0%, #2a2a2e 100%)" }}>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #ff5f57, #e0443e)" }} />
                      <span className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #febc2e, #d4a019)" }} />
                      <span className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #28c840, #1fa834)" }} />
                    </div>
                    
                    {/* Navigation arrows */}
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-neutral-500 text-xs">◀</span>
                      <span className="text-neutral-500 text-xs">▶</span>
                    </div>
                    
                    {/* URL bar */}
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-2 px-5 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(0,0,0,0.3)", minWidth: "200px" }}>
                        <svg className="w-3 h-3 flex-shrink-0" style={{ color: "#28c840" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <TypewriterURL text="app.publify.io" delay={1.8} speed={0.08} />
                      </div>
                    </div>
                    
                    {/* Spacer for symmetry */}
                    <div className="w-16" />
                  </div>

                  {/* Screen content */}
                  <div className="relative">
                    <img
                      src={dashboardImg}
                      alt="Publify Dashboard - Sistema Operativo Editorial"
                      className="w-full h-auto block"
                      loading="lazy" />
                    
                    {/* Screen reflection */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, transparent 55%)"
                      }}
                      animate={{
                        backgroundPosition: ["200% 0%", "-200% 0%"]
                      }}
                      transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} />
                    
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Laptop base / stand */}
              <div className="relative mx-auto" style={{ width: "60%", marginTop: "-1px" }}>
                <div
                  className="h-4 rounded-b-lg"
                  style={{
                    background: "linear-gradient(180deg, #2a2a2e 0%, #222226 100%)",
                    clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                  }} />
                
                {/* Hinge notch */}
                <div
                  className="mx-auto h-1 rounded-b-sm"
                  style={{
                    width: "30%",
                    background: "linear-gradient(180deg, #333 0%, #2a2a2e 100%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                  }} />
                
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>);

};