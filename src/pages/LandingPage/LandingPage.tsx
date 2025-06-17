
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { EarlySocialProofSection } from "./components/EarlySocialProofSection";
import { KeyFeaturesSection } from "./components/KeyFeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { MockupsShowcaseSection } from "./components/MockupsShowcaseSection";
import { SecondaryBenefitsSection } from "./components/SecondaryBenefitsSection";
import { StrategicFaqSection } from "./components/StrategicFaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";

// Animation variants for page sections
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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
      <ProblemSolutionSection />
      <EarlySocialProofSection />
      <KeyFeaturesSection />
      <PricingSection />
      <MockupsShowcaseSection />
      <SecondaryBenefitsSection />
      <StrategicFaqSection />
      <FinalCtaSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
