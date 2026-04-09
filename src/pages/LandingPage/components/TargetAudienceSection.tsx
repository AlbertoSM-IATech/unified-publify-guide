import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const isFor = [
"Si eres un Publisher activo en Amazon KDP (aunque sea con pocos libros)",
"Si quieres profesionalizar tu operativa editorial",
"Gestionas un catálogo y necesitas trazabilidad y control"];


const isNotFor = [
"Buscas dinero rápido con la autopublicación",
"Esperas una herramienta que venda por ti",
"Quieres promesas milagro o automatizaciones mágicas"];


export const TargetAudienceSection = () => {
  return (
    <section id="para-quien" className="py-36 bg-background">
      <div className="container mx-auto max-w-4xl px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Para publishers que quieren operar{" "}
            <span className="text-primary">como CEO's editoriales.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            "Publicar es fácil. Gestionar una editorial, no, pero con Publify es más fácil"
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Es para */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-accent/20 bg-accent/5">
            
            <h3 className="font-heading text-lg font-bold mb-6 text-accent">Publify Es para ti si…</h3>
            <ul className="space-y-4">
              {isFor.map((item, i) =>
              <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* No es para */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-border bg-card">
            
            <h3 className="font-heading text-lg font-bold mb-6 text-destructive">No es para ti si…</h3>
            <ul className="space-y-4">
              {isNotFor.map((item, i) =>
              <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>);

};