import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const MainCtaSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    acceptsMarketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa nombre y email.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "¡Perfecto!",
        description: "Te hemos añadido a la lista prioritaria. Revisa tu email.",
      });
      setFormData({ name: "", email: "", acceptsMarketing: false });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-primary/20 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ✅ Tu editorial KDP, sin humo ni caos
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground">
                Empieza gratis con el plan Starter. Activa Pro cuando lo necesites. Publify crece contigo.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-foreground">Acceso exclusivo</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-foreground">Soporte personalizado</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-foreground">Setup sin fricciones</p>
                </motion.div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="border-border focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.acceptsMarketing}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptsMarketing: checked as boolean }))
                    }
                  />
                  <Label htmlFor="marketing" className="text-sm text-muted-foreground leading-tight">
                    Acepto recibir comunicaciones sobre Publify y recursos para publishers.
                    Puedes darte de baja en cualquier momento.
                  </Label>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center"
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg group"
                  >
                    {isSubmitting ? "Enviando..." : "📆 Empezar ahora"}
                    {!isSubmitting && (
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Demo option */}
              <div className="text-center pt-6 border-t border-border">
                <p className="text-muted-foreground mb-4">
                  ¿Prefieres hablar antes de empezar?
                </p>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  📅 Agendar demo
                </Button>
              </div>

              {/* Legal links */}
              <div className="text-center text-sm text-muted-foreground">
                <a href="/legal/privacy" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
                {" • "}
                <a href="/legal/terms" className="hover:text-primary transition-colors">
                  Términos de Uso
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};