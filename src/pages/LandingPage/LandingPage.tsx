import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TaglineSection } from "./components/TaglineSection";
import { ControlSection } from "./components/ControlSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { WhatIsPublifySection } from "./components/WhatIsPublifySection";
import { PillarCardsSection } from "./components/PillarCardsSection";
import { NewHowItWorksSection } from "./components/NewHowItWorksSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { WhyPublifySection } from "./components/WhyPublifySection";
import { EarlyAdoptersSection } from "./components/EarlyAdoptersSection";
import { PreventaSection } from "./components/PreventaSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";

import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const LandingPage = () => {
  useScrollAnimations();
  return (
    <motion.div 
      className="relative flex min-h-screen flex-col font-sans"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      
      <Header />
      <Hero />
      <TaglineSection />
      <PillarCardsSection />
      <WhyPublifySection />
      <TargetAudienceSection />
      <ControlSection />
      <NewHowItWorksSection />
      <WhatIsPublifySection />
      <ComparisonSection />
      <EarlyAdoptersSection />
      <PreventaSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
      <StickyMobileCTA />
    </motion.div>
  );
};

export default LandingPage;
