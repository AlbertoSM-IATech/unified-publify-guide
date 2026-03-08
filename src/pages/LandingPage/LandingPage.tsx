import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { PreventaSection } from "./components/PreventaSection";
import { Footer } from "./components/Footer";
import { TechBackground } from "@/components/motion/TechBackground";
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
      <TechBackground />
      <Header />
      <Hero />
      <ProblemSolutionSection />
      <PreventaSection />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
