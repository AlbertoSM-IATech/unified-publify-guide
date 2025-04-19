
import { motion } from "framer-motion";
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
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
              stroke="rgba(133, 133, 133, 0.7)"
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={40}
              domain={[0, 'dataMax + 1']}
              tickCount={5}
              stroke="rgba(133, 133, 133, 0.7)"
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent className="bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700" />
              } 
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <Bar 
              dataKey="value" 
              name="Cantidad"
              animationDuration={1200}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default BarChartCard;
