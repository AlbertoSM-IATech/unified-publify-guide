import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SocialIcons } from "@/components/common/SocialIcons";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-4 py-12">
      <motion.div 
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-heading text-2xl font-bold mb-2">Publify</span>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              La plataforma todo-en-uno para autores y editoriales.
            </p>
            <div className="mt-4">
              <SocialIcons />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 sm:flex-row">
            <div>
              <h4 className="font-heading text-sm font-medium mb-3">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#caracteristicas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link 
                    to="/contacto" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-sm font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/terminos-y-condiciones" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/politica-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Publify. Todos los derechos reservados.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
