
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
  ResponsiveContainer,
  Legend,
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
      
      <div className="mt-4 h-72">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              barSize={60}
            >
              <XAxis 
                dataKey="name" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
              <Legend verticalAlign="bottom" height={36} />
              <Bar dataKey="value" name="Cantidad">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
