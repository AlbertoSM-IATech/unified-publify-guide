
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
      className="card-hover rounded-lg border p-4 shadow-sm bg-card dark:border-slate-800"
      whileHover={{
        y: -3,
        boxShadow: "0 8px 20px -5px rgba(251, 146, 60, 0.2), 0 4px 10px -4px rgba(251, 146, 60, 0.2)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-2 text-xs font-medium">
        <span className={change.startsWith("+") ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}>
          {change}
        </span>
        <span className="ml-1 text-muted-foreground">desde el mes pasado</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
