
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SocialProofSection } from "./components/SocialProofSection";
import { NewProblemSolutionSection } from "./components/NewProblemSolutionSection";
import { ThreePillarsSection } from "./components/ThreePillarsSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { KeyBenefitsSection } from "./components/KeyBenefitsSection";
import { MainCtaSection } from "./components/MainCtaSection";
import { FaqSection } from "./components/FaqSection";
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
      <SocialProofSection />
      <NewProblemSolutionSection />
      <ThreePillarsSection />
      <HowItWorksSection />
      <TargetAudienceSection />
      <KeyBenefitsSection />
      <MainCtaSection />
      <FaqSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
