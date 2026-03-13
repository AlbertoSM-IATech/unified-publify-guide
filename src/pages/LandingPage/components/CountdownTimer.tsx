import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const TARGET_DATE = new Date("2026-04-01T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calcTimeLeft = (): TimeLeft => {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

interface Props {
  compact?: boolean;
}

export const CountdownTimer = ({ compact = false }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "días", value: timeLeft.days },
    { label: "horas", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "seg", value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm text-accent font-semibold">
        <Clock className="w-4 h-4" />
        <span>La preventa empieza en {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex flex-col items-center gap-3 p-5 bg-accent/5 border border-accent/20 rounded-2xl"
    >
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-accent" />
        <span className="text-sm text-accent font-semibold tracking-wide uppercase">La preventa empieza en</span>
      </div>
      <div className="flex gap-3">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-accent tabular-nums leading-none bg-accent/10 border border-accent/20 rounded-xl px-3 py-2.5 min-w-[52px] md:min-w-[60px] text-center shadow-sm">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-accent/70 font-medium mt-1.5 uppercase tracking-wider">{u.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
