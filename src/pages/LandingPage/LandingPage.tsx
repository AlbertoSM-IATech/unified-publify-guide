import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TaglineSection } from "./components/TaglineSection";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { WhatIsPublifySection } from "./components/WhatIsPublifySection";
import { NewHowItWorksSection } from "./components/NewHowItWorksSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { EarlyAdoptersSection } from "./components/EarlyAdoptersSection";
import { PreventaSection } from "./components/PreventaSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { TechBackground } from "@/components/motion/TechBackground";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { WaitlistProvider, useWaitlistState } from "./hooks/useWaitlistForm";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const LandingContent = () => {
  useScrollAnimations();
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
      <TaglineSection />
      <ProblemSolutionSection />
      <WhatIsPublifySection />
      <NewHowItWorksSection />
      <TargetAudienceSection />
      <EarlyAdoptersSection />
      <PreventaSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
      <StickyMobileCTA />
    </motion.div>
  );
};

export const LandingPage = () => {
  const waitlistState = useWaitlistState();
  return (
    <WaitlistProvider value={waitlistState}>
      <LandingContent />
    </WaitlistProvider>
  );
};

export default LandingPage;
