
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ChaosSection } from "./components/ChaosSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { BenefitsSection } from "./components/BenefitsSection";
import { FinanceSection } from "./components/FinanceSection";
import { CtaSection } from "./components/CtaSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";

export const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <Hero />
      <ChaosSection />
      <FeaturesSection />
      <FeaturesGrid />
      <BenefitsSection />
      <FinanceSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
