
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  change
}: StatsCardProps) => {
  return (
    <motion.div 
      className="rounded-lg border p-4 shadow-md glass-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.2), 0 8px 10px -6px rgba(251, 146, 60, 0.2)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
          <motion.p 
            className="mt-1 text-2xl font-bold text-foreground"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div 
          className="rounded-full bg-primary/10 p-2 text-primary"
          whileHover={{ rotate: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.div>
      </div>
      <div className="mt-2 text-xs font-medium">
        <span className={change.startsWith("+") ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}>
          {change}
        </span>
        <span className="ml-1 text-neutral-500 dark:text-neutral-400">desde el mes pasado</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
