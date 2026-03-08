import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { EarlyAdoptersSection } from "./components/EarlyAdoptersSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PreventaSection } from "./components/PreventaSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { TechBackground } from "@/components/motion/TechBackground";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
      <Header />
      <Hero />
      <ProblemSolutionSection />
      <TargetAudienceSection />
      <EarlyAdoptersSection />
      <TestimonialsSection />
      <PreventaSection />
      <FinalCtaSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
