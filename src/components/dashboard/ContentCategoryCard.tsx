
import { LucideIcon } from "lucide-react";

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
    <div className="rounded-lg border p-4 shadow-md bg-white/80 dark:bg-neutral-800/60 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
      <div className="mb-2 flex items-center">
        <div className={`${color} p-2 rounded-full mr-2`}>
          {icon}
        </div>
        <div>
          <h3 className="font-heading font-medium">{title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <div className="ml-auto text-2xl font-bold">{count}</div>
      </div>
      
      <div className="space-y-3">
        {statusData.map((status, statusIndex) => (
          <div key={statusIndex}>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                {status.label}
              </span>
              <span>{status.count} · {status.percentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div 
                className={`h-full ${color}`} 
                style={{
                  width: `${status.percentage}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCategoryCard;
