
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getApexPieChartOptions } from './pie/apexPieChartOptions';
import PieChartNoData from './pie/PieChartNoData';
import CustomPieChartLegend from './pie/CustomPieChartLegend';
import { cn } from '@/lib/utils';

export interface ChartItem { // Exportando ChartItem
  name: string;
  value: number;
  color: string;
}

interface ApexPieChartProps {
  title: string;
  description: string;
  data: ChartItem[];
  height?: number | string; // Permitir string para "100%"
  className?: string;
  totalLabel?: string;
  totalValue?: number;
  showLegend?: boolean;
  onError?: () => void;
}

const ApexPieChart = ({
  title,
  description,
  data,
  height = 350, // Default height, can be overridden by "100%" if className implies h-full
  className,
  totalLabel,
  totalValue,
  showLegend = true,
  onError
}: ApexPieChartProps) => {
  const { isDarkMode } = useTheme();

  const validData = Array.isArray(data) && data.length > 0
    ? data
    : [{ name: 'No data', value: 1, color: '#ccc' }];

  const series = validData.map(item => item.value);
  const labels = validData.map(item => item.name);
  const colors = validData.map(item => item.color);

  const options = getApexPieChartOptions(
    isDarkMode,
    colors,
    labels,
    totalLabel,
    totalValue,
    validData, 
    showLegend
  );

  if (!Array.isArray(data) || data.length === 0) {
    return <PieChartNoData title={title} description={description} className={className} />;
  }

  // Si className incluye h-full, entonces el gráfico debería intentar usar 100% de altura.
  const chartHeight = className?.includes('h-full') ? '100%' : height;

  return (
    <Card className={cn("overflow-hidden flex flex-col", className)}> {/* Added flex flex-col */}
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <PieChartIcon size={20} className="text-green-500" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className={cn("pb-4 flex flex-col flex-grow", { "justify-center": !className?.includes('h-full') })}> {/* Added flex flex-col flex-grow and conditional justify-center */}
        <MotionWrapper
          className="flex-grow min-h-[300px] w-full" // Changed from h-[350px]
          type="fadeUp"
          duration={0.7}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={chartHeight} // Use dynamic chartHeight
            width="100%"
          />
        </MotionWrapper>

        {!showLegend && <CustomPieChartLegend data={validData} />}
      </CardContent>
    </Card>
  );
};

export default ApexPieChart;
