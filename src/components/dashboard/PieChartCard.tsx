
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
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
  // Calculate colors for the legend
  const renderColorfulLegendText = (value: string, entry: any) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
      
      <div className="mt-4 h-72 relative">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="60%"
                innerRadius={70}
                outerRadius={90}
                startAngle={180}
                endAngle={0}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="none"
                  />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                align="center"
                layout="horizontal"
                wrapperStyle={{ bottom: 0, left: 0, right: 0, paddingTop: 20 }}
                formatter={renderColorfulLegendText}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Total value in center of semicircle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
          <span className="text-2xl font-bold">{totalValue}</span>
          <p className="text-xs text-muted-foreground mt-1">{totalLabel}</p>
        </div>
      </div>
      
      <div className="mt-2 grid grid-cols-4 gap-2">
        {data.map((entry, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div 
                className="h-3 w-3 rounded-sm" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-xs font-medium">{entry.name}</span>
            </div>
            <span className="text-sm font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartCard;
