import { motion } from "framer-motion";
import { Check, X, Database, Eye, BookOpen } from "lucide-react";

const notIs = [
"El panel de KDP Reports ni herramienta para automatizar procesos de Amazon",
"Herramientas de Investigación de mercado, Palabras Clave y SEO Helium10 / Bookbeamestigación de mercado, Palabras Clave y SEO Helium10 / Bookbeam",
"Un gestor nativo de Amazon Ads",
"Software de escritura, maquetación o diseño",
"Contabilidad fiscal completa"];


const yesIs = [
  "El sistema donde cada libro tiene costes, ingresos, assets y flujo de creación en un solo lugar",
  "La capa operativa que conecta tu biblioteca, producción, finanzas y mas adelante el Marketing.",
  "La estructura que te permite saber si un libro es rentable antes y después de publicarlo",
  "La visión de negocio que convierte datos sueltos en decisiones con contexto"];


const pillars = [
  {
    icon: Database,
    title: "Una única fuente de verdad ",
    desc: "Costes, ingresos, assets, producción y rendimiento. Todo vinculado al libro como unidad de negocio."
  },
  {
    icon: Eye,
    title: "Control operativo",
    desc: "Sabes qué toca hacer, qué está bloqueado y qué decisiones tomar. Sin depender de memoria."
  },
  {
    icon: BookOpen,
    title: "Visión financiera",
    desc: "Rentabilidad por libro y global. De lo micro a lo macro. "
  }];


export const WhatIsPublifySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8">
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
            El centro de tu negocio son tus libros
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Publify centraliza tu operativa editorial para que trabajes con{" "}
            <strong className="text-primary">una sola fuente de verdad</strong> y con el{" "}
            <strong className="text-primary">libro como unidad central operativa</strong>.
          </p>
        </motion.div>

        {/* 3 Pilares */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors text-center">
            
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <pillar.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.desc}</p>
            </motion.div>
          )}
        </div>

        {/* NO es / SÍ es */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border bg-card">
            
            <h3 className="font-heading text-lg font-bold mb-4 text-muted-foreground">
              Publify <span className="text-primary">NO</span> es:
            </h3>
            <ul className="space-y-3">
              {notIs.map((item, i) =>
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-accent/20 bg-accent/5">
            
            <h3 className="font-heading text-lg font-bold mb-4 text-accent">
              Publify <span className="font-bold">SÍ</span> es:
            </h3>
            <ul className="space-y-3">
              {yesIs.map((item, i) =>
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-lime-500 font-medium" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>);

};