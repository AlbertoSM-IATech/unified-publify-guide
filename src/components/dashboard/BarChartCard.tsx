
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartItem {
  name: string;
  value: number;
  color: string;
}

interface BarChartCardProps {
  title: string;
  description: string;
  data: BarChartItem[];
  chartConfig: any;
}

const BarChartCard = ({ 
  title, 
  description, 
  data, 
  chartConfig 
}: BarChartCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
      
      <div className="mt-4 h-64">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
