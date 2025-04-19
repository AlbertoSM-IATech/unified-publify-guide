
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
  ResponsiveContainer,
  ReferenceLine,
  Legend,
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
  // Encontrar valores mínimos y máximos para mejor visualización
  const minValue = Math.min(...data.map(item => item.balance)) - 500;
  const maxValue = Math.max(...data.map(item => item.balance)) + 500;

  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#606060" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              stroke="#858585" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              dy={10}
            />
            <YAxis
              stroke="#858585"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
              width={80}
              domain={[minValue, maxValue]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <ReferenceLine y={0} stroke="#606060" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              name="Balance"
              dot={{ stroke: '#6366f1', strokeWidth: 2, r: 4, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default LineChartCard;
