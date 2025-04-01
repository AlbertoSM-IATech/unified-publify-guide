
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Cell,
  Pie,
  PieChart,
} from "recharts";

interface PieChartItem {
  name: string;
  value: number;
  color: string;
}

interface PieChartCardProps {
  title: string;
  description: string;
  data: PieChartItem[];
  chartConfig: any;
  totalLabel: string;
  totalValue: number;
}

const PieChartCard = ({ 
  title, 
  description, 
  data, 
  chartConfig, 
  totalLabel, 
  totalValue 
}: PieChartCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
      
      <div className="mt-4 h-64 relative">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />
          </PieChart>
        </ChartContainer>
        
        {/* Total value in center of semicircle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center">
          <span className="text-2xl font-bold">{totalValue}</span>
          <p className="text-xs text-muted-foreground">{totalLabel}</p>
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="mr-1 h-3 w-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-xs">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartCard;
