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
  return <div className="rounded-lg border p-4 shadow-sm bg-orange-200">
      <div className="mb-2 flex items-center">
        
        <div>
          <h3 className="font-heading font-medium text-lg text-center">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="ml-auto text-2xl font-bold bg-inherit">{count}</div>
      </div>
      
      <div className="space-y-3">
        {statusData.map((status, statusIndex) => <div key={statusIndex}>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                {status.label === "Publicados"}
                {status.label === "En revisión"}
                {status.label === "Borradores"}
                {status.label === "Sin empezar"}
                {status.label}
              </span>
              <span>{status.count} · {status.percentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className={`h-full ${color}`} style={{
            width: `${status.percentage}%`
          }}></div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default ContentCategoryCard;