
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ChaosSection } from "./components/ChaosSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { BenefitsSection } from "./components/BenefitsSection";
import { FinanceSection } from "./components/FinanceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { VisualsSection } from "./components/VisualsSection";
import { CtaSection } from "./components/CtaSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";

// Animation variants for page sections
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const LandingPage = () => {
  return (
    <motion.div 
      className="flex min-h-screen flex-col bg-background font-sans"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <Header />
      <Hero />
      <ChaosSection />
      <FeaturesSection />
      <FeaturesGrid />
      <BenefitsSection />
      <TestimonialsSection />
      <VisualsSection />
      <FinanceSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
