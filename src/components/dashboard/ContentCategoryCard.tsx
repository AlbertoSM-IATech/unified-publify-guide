
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatusData {
  label: string;
  count: number;
  percentage: number;
}

interface ContentCategoryCardProps {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  count: number;
  statusData: StatusData[];
}

const ContentCategoryCard = ({
  title,
  description,
  color,
  icon,
  count,
  statusData
}: ContentCategoryCardProps) => {
  return (
    <motion.div 
      className="rounded-lg border p-4 shadow-md glass-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.2), 0 8px 10px -6px rgba(251, 146, 60, 0.2)",
        borderColor: "rgba(251, 146, 60, 0.5)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <div className="mb-2 flex items-center">
        <motion.div 
          className={`${color} p-2 rounded-full mr-2`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="font-heading font-medium">{title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <motion.div 
          className="ml-auto text-2xl font-bold"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {count}
        </motion.div>
      </div>
      
      <div className="space-y-3">
        {statusData.map((status, statusIndex) => (
          <motion.div 
            key={statusIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + statusIndex * 0.1, duration: 0.3 }}
          >
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                {status.label}
              </span>
              <span>{status.count} · {status.percentage}%</span>
            </div>
            <motion.div 
              className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2 + statusIndex * 0.1, duration: 0.4 }}
            >
              <motion.div 
                className={`h-full ${color}`} 
                style={{ width: `${status.percentage}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${status.percentage}%` }}
                transition={{ delay: 0.3 + statusIndex * 0.1, duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContentCategoryCard;
