import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";
import { getPromotionState, PromotionState } from "../utils/pricingTiers";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calcTimeLeft = (target: Date | null): TimeLeft => {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1000 * 60 * 60) % 24),
    minutes: Math.floor(diff / (1000 * 60) % 60),
    seconds: Math.floor(diff / 1000 % 60),
  };
};

interface Props {
  compact?: boolean;
}

export const CountdownTimer = ({ compact = false }: Props) => {
  const [promo, setPromo] = useState<PromotionState>(() => getPromotionState());
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(promo.countdownTarget));

  useEffect(() => {
    const id = setInterval(() => {
      const newPromo = getPromotionState();
      setPromo(newPromo);
      setTimeLeft(calcTimeLeft(newPromo.countdownTarget));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "días", value: timeLeft.days },
    { label: "hrs", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "seg", value: timeLeft.seconds },
  ];

  // Determine label text
  const getLabel = () => {
    if (promo.isExpired) return "La preventa ha finalizado";
    const now = Date.now();
    const firstStart = promo.tiers[0].tier.start.getTime();
    if (now < firstStart) return "La preventa empieza en:";
    
    const activeTier = promo.activeTierIndex >= 0 ? promo.tiers[promo.activeTierIndex] : null;
    if (activeTier) {
      return `Precio actual ${activeTier.tier.price}€/mes — sube en:`;
    }
    return "La preventa ha finalizado";
  };

  if (promo.isExpired) {
    if (compact) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <AlertCircle className="w-3 h-3" />
          <span>Preventa finalizada</span>
        </div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground font-medium text-sm">La preventa ha finalizado</span>
      </motion.div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
        <Clock className="w-3 h-3" />
        <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <Clock className="w-4 h-4 text-accent flex-shrink-0" />
      <span className="text-muted-foreground font-medium text-sm">{getLabel()}</span>
      <div className="flex gap-1.5">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="font-bold tabular-nums leading-none bg-accent/10 rounded px-1.5 py-1 min-w-[28px] text-center text-2xl text-primary">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5">{u.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
