
import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">Contacto directo</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <a 
            href="mailto:contacto@publifyai.com"
            className="text-primary hover:underline"
          >
            contacto@publifyai.com
          </a>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
