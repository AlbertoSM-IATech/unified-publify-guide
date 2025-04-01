
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
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center">
        <div className={`mr-2 rounded ${color} p-1 text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="font-heading font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="ml-auto text-2xl font-bold">{count}</div>
      </div>
      
      <div className="space-y-3">
        {statusData.map((status, statusIndex) => (
          <div key={statusIndex}>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                {status.label === "Publicados" && <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>}
                {status.label === "En revisión" && <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>}
                {status.label === "Borradores" && <span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span>}
                {status.label === "Sin empezar" && <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>}
                {status.label}
              </span>
              <span>{status.count} · {status.percentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full ${color}`}
                style={{ width: `${status.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCategoryCard;
