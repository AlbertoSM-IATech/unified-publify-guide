import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SocialIcons } from "@/components/common/SocialIcons";
import { useTheme } from "@/hooks/useTheme";
import logoDark from "@/assets/publify-logo-dark.png";
import logoLight from "@/assets/publify-logo-light.png";

export const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="border-t border-border bg-card px-4 py-12">
      <motion.div 
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <img 
              src={theme === "dark" ? logoLight : logoDark} 
              alt="Publify - Sistema Operativo Editorial" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Sistema Operativo Editorial para publishers de Amazon KDP.
            </p>
            <div className="mt-4">
              <SocialIcons variant="footer" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 sm:flex-row">
            <div>
              <h4 className="font-heading text-sm font-medium mb-3 text-center sm:text-left">Enlaces</h4>
              <ul className="space-y-2">
                <li><a href="#problema" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Problema</a></li>
                <li><a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a></li>
                <li><a href="#early-adopters" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Early Adopters</a></li>
                <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                <li><Link to="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-medium mb-3 text-center sm:text-left">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Términos y condiciones</Link></li>
                <li><Link to="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Publify. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
