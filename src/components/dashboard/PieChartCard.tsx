
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

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
    <motion.div 
      className="w-full h-full relative py-0 my-[30px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40
          }}>
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={100} 
              startAngle={180} 
              endAngle={0} 
              paddingAngle={3} 
              dataKey="value" 
              labelLine={false}
              animationBegin={300}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="none" 
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              layout="horizontal" 
              wrapperStyle={{
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: 20
              }}
              formatter={(value: string) => <span className="text-sm font-medium">{value}</span>}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent className="bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700" />
              } 
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      {/* Total value in center of semicircle */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span 
          className="text-3xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
        >
          {totalValue}
        </motion.span>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{totalLabel}</p>
      </motion.div>
      
      <div className="mt-4 grid grid-cols-4 gap-2">
        {data.map((entry, index) => (
          <motion.div 
            key={index} 
            className="text-center py-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <motion.div 
                className="h-3 w-3 rounded-sm" 
                style={{ backgroundColor: entry.color }}
                whileHover={{ scale: 1.2 }}
              />
              <span className="text-xs font-medium">{entry.name}</span>
            </div>
            <motion.span 
              className="text-sm font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              {entry.value}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PieChartCard;
