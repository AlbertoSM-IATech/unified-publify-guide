import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const WaitlistFormSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: "Rellena todos los campos", variant: "destructive" });
      return;
    }
    setLoading(true);
    // TODO: connect to backend
    setTimeout(() => {
      toast({ title: "¡Te has unido a la waitlist!", description: "Te avisaremos cuando abramos plazas." });
      setName("");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-36 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Entra en la waitlist <span className="text-primary">(Early Adopters)</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Apúntate ahora y recibe invitación cuando abramos plazas.
          </p>
        </motion.div>

        {/* Condiciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-10 text-sm"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <span>Gratis apuntarse</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Acceso progresivo desde el 1 de abril</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>Cupo: 20–30 plazas</span>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="p-8 bg-card border border-border rounded-2xl shadow-lg space-y-5">
            <div className="space-y-2">
              <Label htmlFor="waitlist-name">Nombre</Label>
              <Input
                id="waitlist-name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-email">Email</Label>
              <Input
                id="waitlist-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6" disabled={loading}>
                {loading ? "Enviando..." : "Unirme a la waitlist"}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground text-center">
              Recibirás emails operativos sobre lista, invitación y activación. Sin spam.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
