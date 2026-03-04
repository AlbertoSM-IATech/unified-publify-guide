import { motion } from "framer-motion";
import { Check, X, Database, Eye, BookOpen } from "lucide-react";

const notIs = [
"El panel de KDP Reports ni herramienta para automatizar procesos de Amazon",
"Helium10 / spy tool",
"Un gestor nativo de Amazon Ads",
"Software de escritura, maquetación o diseño",
"Contabilidad fiscal completa"];


const yesIs = [
"La capa cognitiva y operativa de tu negocio",
"El sistema donde operas tu editorial con orden, foco y centralización",
"La estructura que conecta tu operativa diaria alrededor del libro",
"La capa que convierte datos sueltos en decisiones con contexto"];


const pillars = [
{
  icon: Database,
  title: "Fuente de verdad por libro",
  desc: "Datos, versiones finales sin duplicados, menos \"¿dónde estaba esto?\""
},
{
  icon: Eye,
  title: "Control operativo",
  desc: "Claridad de qué toca hacer y qué está bloqueado, sin depender de memoria"
},
{
  icon: BookOpen,
  title: "Visión del negocio",
  desc: "Por libro y global, de lo macro a lo micro, sin dolores de cabeza"
}];


export const WhatIsPublifySection = () => {
  return (
    <section id="que-es-publify" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8">
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Publify no es otra herramienta.{" "}
            <span className="text-primary">Es el sistema.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Publify centraliza tu operativa editorial para que trabajes con{" "}
            <strong className="text-foreground">una sola fuente de verdad</strong> y con el{" "}
            <strong className="text-foreground">libro como unidad operativa</strong>.
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
              <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
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
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Misión y Visión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-2xl">
          
          <p className="text-xl md:text-2xl text-foreground font-bold mb-8 text-center">
            <span className="text-primary">Publify pone orden y control</span> donde solo había caos. 
            Creado por y para publishers de Amazon KDP.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">Nuestra Misión</h3>
              <p className="text-muted-foreground">
                Centralizar la gestión editorial, financiera y de marketing en un solo sistema, 
                eliminando el caos de herramientas dispersas y permitiendo que los publishers 
                gestionen sus catálogos de forma profesional.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">Nuestra Visión</h3>
              <p className="text-muted-foreground">
                Convertirnos en la plataforma estándar para publishers de Amazon KDP en el mundo hispanohablante, aportando orden, foco y escalabilidad al sector editorial independiente.
              
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};