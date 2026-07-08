import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, DollarSign, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HeroScene3D } from "@/components/motion/HeroScene3D";
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

// Base resting angles for the CSS 3D dashboard stack
const BASE_TILT = { x: 15, y: -22, z: -4 };

export const Hero = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();
  const tiltRef = useRef<HTMLDivElement>(null);

  // Cursor-driven parallax tilt — rAF + direct DOM write to avoid React
  // re-renders (which would repaint the WebGL Canvas and stacked blur layers
  // on every mousemove and produce visible artefacts).
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetDx = 0;
    let targetDy = 0;

    const apply = () => {
      raf = 0;
      const x = BASE_TILT.x - targetDy * 12;
      const y = BASE_TILT.y - targetDx * 14;
      const z = BASE_TILT.z + targetDx * 2;
      el.style.transform = `rotateY(${y}deg) rotateX(${x}deg) rotateZ(${z}deg)`;
    };

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Skip work when the stack is fully out of viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      targetDx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      targetDy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col items-center px-4 sm:px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 overflow-hidden grain min-h-[92vh]"
      style={sans}
    >
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 bg-aurora animate-aurora opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid-editorial opacity-30 sm:opacity-40" aria-hidden />

      {/* Signature colored glows */}
      <div
        className="pointer-events-none absolute -top-64 -right-32 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25"
        style={{ background: "radial-gradient(circle, hsl(24 94% 55%) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-64 -left-32 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20"
        style={{ background: "radial-gradient(circle, hsl(217 91% 55%) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center"
        >
          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left relative z-10">
            {/* Kicker */}
            <motion.div variants={fadeInUp} className="animate-kicker-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-background/40 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-primary uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-semibold">
                  Edición 2026 · Lista de espera abierta
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground text-[2rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
              style={serif}
            >
              Gestiona tu negocio en Amazon KDP como una{" "}
              <span className="text-primary italic">gran editorial.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light"
            >
              Sin parches, sin improvisación. El primer Sistema Operativo Editorial diseñado para
              escalar de publisher a CEO.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-fit">
                <Button
                  onClick={openDialog}
                  size="lg"
                  className="btn-shine w-full sm:w-auto h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-sm shadow-[0_0_30px_hsl(24_94%_55%/0.35)] group"
                >
                  Únete a la lista de espera
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Button>
              </motion.div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest">
                Acceso cerrado temporalmente · Te avisamos cuando volvamos a abrir
              </p>
              <WaitlistDialog open={open} onOpenChange={setOpen} source="hero" />
            </motion.div>

            {/* Process index */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-4 gap-2 sm:gap-4 pt-8 sm:pt-10 border-t border-border/60"
            >
              {steps.map((step, i) => (
                <div key={step} className="space-y-1 sm:space-y-1.5">
                  <span
                    className={`block text-xs sm:text-sm font-bold ${
                      i === 0 ? "text-primary not-italic" : "text-foreground/40 italic"
                    }`}
                    style={i === 0 ? sans : serif}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-muted-foreground">
                    {step}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Protagonist */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-6 relative flex justify-center items-center h-[440px] sm:h-[540px] lg:h-[620px]"
          >
            {/* Real WebGL scene: floating editorial books + glass prism */}
            <div className="absolute inset-0">
              <HeroScene3D />
            </div>

            {/* Orbital rings */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-primary/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-accent/15 rounded-full animate-[spin_60s_linear_infinite_reverse]" />

            {/* Tilted CSS 3D dashboard stack */}
            <div
              className="relative w-full max-w-md aspect-[4/5] hidden sm:block"
              style={{ perspective: "2000px" }}
            >
              <div
                ref={tiltRef}
                className="relative w-full h-full transition-transform duration-500 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${tilt.y}deg) rotateX(${tilt.x}deg) rotateZ(${tilt.z}deg)`,
                }}
              >
                {/* Main dashboard card */}
                <div className="absolute inset-0 bg-background/50 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                  <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
                    <span className="ml-3 h-3 w-32 bg-foreground/10 rounded" />
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Editorial · Q2</span>
                      <span className="text-[10px] uppercase tracking-widest text-primary">En vivo</span>
                    </div>
                    <div className="h-24 w-full rounded-xl border border-border/60 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-end p-3 gap-1">
                      {[40, 65, 50, 80, 62, 90, 72].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: i % 2 ? "hsl(24 94% 55% / 0.9)" : "hsl(217 91% 60% / 0.7)",
                          }}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 rounded-lg border border-border/60 bg-foreground/[0.03] p-2">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Regalías</div>
                        <div className="text-sm font-semibold text-foreground mt-1" style={serif}>€ 12.480</div>
                      </div>
                      <div className="h-16 rounded-lg border border-border/60 bg-foreground/[0.03] p-2">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Libros activos</div>
                        <div className="text-sm font-semibold text-foreground mt-1" style={serif}>48</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-foreground/5 rounded" />
                      <div className="h-2 w-5/6 bg-foreground/5 rounded" />
                      <div className="h-2 w-4/6 bg-foreground/5 rounded" />
                    </div>
                  </div>
                </div>

                {/* Floating Widget: audience */}
                <div
                  className="absolute -right-10 top-16 w-48 rounded-xl border border-border/70 bg-background/85 backdrop-blur-2xl shadow-2xl p-4"
                  style={{ transform: "translateZ(90px)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center">
                      <TrendingUp size={14} className="text-accent" />
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">Lectores</div>
                  </div>
                  <div className="text-xl font-semibold text-foreground" style={serif}>1.284</div>
                  <div className="mt-2 h-1 w-full bg-foreground/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "68%" }} />
                  </div>
                  <div className="text-[9px] text-primary mt-1 font-semibold">+24% vs mes anterior</div>
                </div>

                {/* Floating Widget: revenue */}
                <div
                  className="absolute -left-12 bottom-20 w-56 rounded-xl border border-border/70 bg-background/85 backdrop-blur-2xl shadow-2xl p-4"
                  style={{ transform: "translateZ(130px)" }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                      <DollarSign size={16} className="text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Regalías 30d</div>
                      <div className="text-base font-bold text-emerald-500" style={serif}>+€ 3.420</div>
                    </div>
                  </div>
                  <div className="flex items-end gap-0.5 h-8">
                    {[30, 45, 38, 55, 48, 62, 58, 70, 65, 80, 72, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/70 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating tag: system status */}
                <div
                  className="absolute -bottom-4 right-8 flex items-center gap-2 px-3 py-2 rounded-md border border-border/70 bg-background/90 backdrop-blur-xl shadow-xl"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <Sparkles size={12} className="text-primary" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground">
                    Sistema activo
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-only compact mock */}
            <div className="sm:hidden relative w-full max-w-xs mx-auto rounded-2xl border border-border/60 bg-background/60 backdrop-blur-xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]/70" />
              </div>
              <div className="h-20 rounded-lg bg-gradient-to-br from-primary/20 to-transparent border border-border/60 flex items-end p-2 gap-1">
                {[40, 65, 50, 80, 62, 90, 72].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background: i % 2 ? "hsl(24 94% 55% / 0.9)" : "hsl(217 91% 60% / 0.7)",
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-md border border-border/60 p-2">
                  <div className="text-[9px] uppercase text-muted-foreground">Regalías</div>
                  <div className="text-sm font-semibold" style={serif}>€ 12.480</div>
                </div>
                <div className="rounded-md border border-border/60 p-2">
                  <div className="text-[9px] uppercase text-muted-foreground">Libros</div>
                  <div className="text-sm font-semibold" style={serif}>48</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
