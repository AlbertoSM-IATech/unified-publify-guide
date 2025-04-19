
import { motion } from "framer-motion";
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
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(96, 96, 96, 0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(133, 133, 133, 0.7)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              dy={10}
            />
            <YAxis
              stroke="rgba(133, 133, 133, 0.7)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
              width={80}
              domain={[minValue, maxValue]}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent className="bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700" />
              } 
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <ReferenceLine y={0} stroke="rgba(96, 96, 96, 0.5)" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#FB923C"
              activeDot={{ 
                r: 8, 
                stroke: '#FB923C', 
                strokeWidth: 2,
                fill: '#fff'
              }}
              strokeWidth={2}
              name="Balance"
              dot={{ 
                stroke: '#FB923C', 
                strokeWidth: 2, 
                r: 4, 
                fill: '#fff' 
              }}
              animationDuration={1500}
              animationBegin={300}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default LineChartCard;
