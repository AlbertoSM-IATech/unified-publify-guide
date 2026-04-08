import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";
import { getPromotionState } from "../utils/pricingTiers";

export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const [promo] = useState(() => getPromotionState());
  const { open, setOpen, openDialog } = useWaitlistDialog();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (promo.isExpired) return null;

  const currentPrice = promo.activeTierIndex >= 0
    ? promo.tiers[promo.activeTierIndex].tier.price
    : "15";

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
          >
            <Button
              onClick={openDialog}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-sm"
            >
              Bloquear precio — desde {currentPrice}€/mes
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <WaitlistDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
