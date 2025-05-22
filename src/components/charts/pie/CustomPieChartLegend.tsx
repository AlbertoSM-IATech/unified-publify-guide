
import React from 'react';
import { motion } from 'framer-motion';
import { ChartItem } from '../ApexPieChart'; // Asumiremos que ChartItem se exportará

interface CustomPieChartLegendProps {
  data: ChartItem[];
}

const CustomPieChartLegend: React.FC<CustomPieChartLegendProps> = ({ data }) => {
  // Asegúrate de que no se muestre la leyenda si el único dato es 'No data'
  if (data.length === 0 || (data.length === 1 && data[0]?.name === 'No data')) {
    return null;
  }

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {data.map((entry, index) => (
        <motion.div
          key={index}
          className="text-center py-1"
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
  );
};

export default CustomPieChartLegend;

