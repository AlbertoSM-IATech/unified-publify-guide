import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterURL } from "@/components/motion/TypewriterURL";
import { CountdownTimer } from "./CountdownTimer";
import dashboardImg from "@/assets/publify-dashboard-concept.jpg";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const serif = { fontFamily: "'DM Serif Display', serif" };
const sans = { fontFamily: "'Fira Sans', sans-serif" };

const steps = ["Investiga", "Crea", "Analiza", "Escala"];

export const Hero = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();

  return (
    <section
      className="relative flex flex-col items-center px-4 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      style={sans}
    >
      <div className="mx-auto w-[92%] max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Kicker / masthead */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <span className="h-px w-12 bg-primary" />
              <span className="text-primary uppercase tracking-[0.2em] text-[11px] font-semibold">
                Edición 2026 · Founders Only
              </span>
            </motion.div>

            {/* Headline serif */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
              style={serif}
            >
              Gestiona tu negocio en Amazon KDP como una{" "}
              <span className="text-primary italic">gran editorial.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed font-light"
              style={sans}
            >
              Sin parches, sin improvisación. El primer Sistema Operativo Editorial diseñado para
              escalar de publisher a CEO.
            </motion.p>

            {/* Countdown */}
            <motion.div variants={fadeInUp}>
              <CountdownTimer />
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
                <Button
                  onClick={openDialog}
                  size="lg"
                  className="h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-sm shadow-lg shadow-primary/25 group"
                >
                  Bloquear precio desde 25€/mes
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </motion.div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
                Limitado a las primeras 100 licencias
              </p>
              <WaitlistDialog open={open} onOpenChange={setOpen} />
            </motion.div>

            {/* Process index */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-4 gap-4 pt-10 border-t border-border/60"
            >
              {steps.map((step, i) => (
                <div key={step} className="space-y-1.5">
                  <span
                    className={`block text-sm font-bold ${
                      i === 0 ? "text-primary not-italic" : "text-foreground/40 italic"
                    }`}
                    style={i === 0 ? sans : serif}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {step}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product Preview */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 relative self-center">
            <div className="absolute -inset-8 rounded-3xl bg-primary/15 blur-[80px]" />
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-[50px]" />

            <motion.div
              data-gsap="hero-dashboard"
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.6 } }}
              className="relative rounded-xl overflow-hidden border border-border/60 shadow-2xl bg-[#1a1a1e] lg:rotate-2"
            >
              {/* Browser chrome */}
              <div className="bg-[#252528] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #ff5f57, #e0443e)" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #febc2e, #d4a019)" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #28c840, #1fa834)" }}
                  />
                </div>
                <div className="mx-auto bg-[#0d0d0d] text-[10px] text-neutral-500 px-6 py-1 rounded-md border border-white/5 font-mono">
                  <TypewriterURL text="app.publify.io" delay={1.8} speed={0.08} />
                </div>
              </div>

              <div className="relative">
                <img
                  src={dashboardImg}
                  alt="Publify Dashboard — Sistema Operativo Editorial para Amazon KDP"
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                  }}
                  animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                  transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating status tag */}
            <div className="absolute -bottom-5 -left-5 bg-background border border-border p-3 shadow-xl rounded-md hidden md:flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground">
                Sistema Activo
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
