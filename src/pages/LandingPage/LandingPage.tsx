import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ChaosSection } from "./components/ChaosSection";
import { WhatIsPublifySection } from "./components/WhatIsPublifySection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { WaitlistFormSection } from "./components/WaitlistFormSection";
import { EarlyAdoptersSection } from "./components/EarlyAdoptersSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { TechBackground } from "@/components/motion/TechBackground";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const LandingPage = () => {
  return (
    <motion.div 
      className="relative flex min-h-screen flex-col font-sans"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <TechBackground />
      <Header />
      <Hero />
      <ChaosSection />
      <WhatIsPublifySection />
      <HowItWorksSection />
      <WaitlistFormSection />
      <EarlyAdoptersSection />
      <TargetAudienceSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
