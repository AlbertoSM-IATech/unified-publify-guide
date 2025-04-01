
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartCardProps {
  title: string;
  description: string;
  data: any[];
  chartConfig: any;
}

const LineChartCard = ({ 
  title, 
  description, 
  data, 
  chartConfig 
}: LineChartCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
      
      <div className="mt-4 h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `€${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#10b981"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                name="Ingresos"
              />
              <Line
                type="monotone"
                dataKey="gastos"
                stroke="#ef4444"
                strokeWidth={2}
                name="Gastos"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
