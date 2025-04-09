import { LucideIcon } from "lucide-react";
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
  return <div className="card-hover rounded-lg border p-4 shadow-sm bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-2 text-xs font-medium">
        <span className={change.startsWith("+") ? "text-green-500" : "text-red-500"}>
          {change}
        </span>
        <span className="ml-1 text-muted-foreground">desde el mes pasado</span>
      </div>
    </div>;
};
export default StatsCard;