
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="caracteristicas" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Dos Sistemas, Un Solo Panel</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Combina gestión editorial y marketing en una única plataforma
          </p>
        </motion.div>
        
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div 
            className="rounded-xl border bg-card p-8 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="mb-6 rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary">
              <BookOpen size={28} />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-bold">Gestión Editorial Inteligente</h3>
            <ul className="space-y-3">
              {[
                "Organiza libros, colecciones e investigaciones sin perderte.",
                "Accede a toda tu información en una vista clara y estructurada.",
                "Sincronización total y backups automáticos.",
                "Desde la idea hasta la venta, todo bajo control."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="mt-6"
              variant="outline"
              onClick={() => navigate("/biblioteca/libros")}
            >
              Explorar gestión editorial
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </motion.div>
          
          <motion.div 
            className="rounded-xl border bg-card p-8 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="mb-6 rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary">
              <Zap size={28} />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-bold">Marketing Automatizado y Sin Dolor</h3>
            <ul className="space-y-3">
              {[
                "Crea webs, formularios, campañas y embudos en minutos.",
                "Gestiona tus contactos y correos desde un solo CRM.",
                "Ahorra tiempo, gana lectores, fideliza clientes.",
                "Publify trabaja mientras tú creas."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="mt-6"
              variant="outline"
              onClick={() => navigate("/marketing")}
            >
              Descubrir marketing
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
