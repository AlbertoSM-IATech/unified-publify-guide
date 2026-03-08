import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "Acceso antes del lanzamiento",
  "Precio más bajo que existirá (se mantiene para siempre)",
  "Participar en la evolución del producto",
  "Onboarding y soporte personalizado",
];

const pricingTiers = [
  { dates: "1–10 abril", price: "15", highlight: true },
  { dates: "11–20 abril", price: "20", highlight: false },
  { dates: "21–30 abril", price: "25", highlight: false },
];

export const PreventaSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: "Introduce tu email", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({ title: "¡Te has unido a la waitlist!", description: "Te avisaremos cuando abramos plazas." });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-36 bg-background relative overflow-hidden">
      {/* Parallax background layer */}
      <div data-gsap="parallax-bg" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl px-0 relative z-10">
        {/* Header */}
        <div data-gsap="section-header" className="text-center mb-16 px-0 mx-0">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles size={16} />
            Plazas limitadas: 20–30 early adopters
          </div>
          <h2
            data-gsap="text-reveal"
            className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold mb-6"
            style={{ perspective: "600px" }}
          >
            Publify todavía no está abierto al público.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Consigue acceso prioritario al MVP, bloquea el mejor precio para siempre y ayuda a definir el producto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits + Pricing */}
          <div className="space-y-8">
            <div className="p-8 bg-card border border-border rounded-xl">
              <h3 className="font-heading text-lg font-bold mb-4">¿Por qué entrar ahora?</h3>
              <ul className="space-y-3">
                {benefits.map((item, i) =>
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="p-8 bg-card border border-primary/20 rounded-xl">
              <h3 className="font-heading text-lg font-bold mb-4">Precio escalonado (abril — Plan Plus)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Cuanto antes entres, menos pagas. El precio se mantiene <strong className="text-foreground">para siempre</strong> mientras mantengas tu suscripción activa.
              </p>
              <div className="space-y-2 mb-4">
                {pricingTiers.map((tier, i) =>
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      tier.highlight
                        ? "bg-primary/10 border-primary/30"
                        : "bg-background border-border"
                    }`}
                  >
                    <span className="font-medium text-sm">{tier.dates}</span>
                    <span className={`text-xl font-bold ${tier.highlight ? "text-primary" : ""}`}>
                      {tier.price} €<span className="text-xs font-normal text-muted-foreground">/mes</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong className="text-foreground">Desde mayo:</strong> 29 €/mes Básico | 49 €/mes Plus</p>
                <p>Si cancelas, al volver pagarás el precio vigente sin descuento.</p>
                <p>Precios sin IVA.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              data-gsap="preventa-card"
              className="p-8 bg-card border border-border rounded-2xl shadow-lg space-y-6 sticky top-28"
            >
              <div className="text-center">
                <h3 className="font-heading text-2xl font-bold mb-2">Reservar mi acceso prioritario</h3>
                <p className="text-sm text-muted-foreground">
                  Apuntarte es gratis. Te avisaremos cuando abramos acceso.
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="h-12 text-base"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6" disabled={loading}>
                  {loading ? "Enviando..." : "Reservar mi acceso prioritario"}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground text-center">
                Solo tu email. Te avisaremos cuando abramos acceso.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
