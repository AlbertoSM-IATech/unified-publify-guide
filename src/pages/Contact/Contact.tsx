
import { motion } from "framer-motion";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";
import { ContactFaq } from "./components/ContactFaq";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ¿Tienes preguntas o quieres hablar con nosotros?
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nuestro equipo está aquí para ayudarte.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Info & FAQ */}
          <div className="space-y-12">
            <ContactInfo />
            <ContactFaq />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
