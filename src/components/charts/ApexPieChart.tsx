
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getApexPieChartOptions } from './pie/apexPieChartOptions';
import PieChartNoData from './pie/PieChartNoData';
import CustomPieChartLegend from './pie/CustomPieChartLegend';

export interface ChartItem { // Exportando ChartItem
  name: string;
  value: number;
  color: string;
}

interface ApexPieChartProps {
  title: string;
  description: string;
  data: ChartItem[];
  height?: number;
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
  height = 350,
  className,
  totalLabel,
  totalValue,
  showLegend = true,
  onError // Aunque no se usa explícitamente, lo mantenemos por consistencia de la interfaz
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
    validData, // Pasamos validData para el formateador del total
    showLegend
  );

  if (!Array.isArray(data) || data.length === 0) {
    return <PieChartNoData title={title} description={description} className={className} />;
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <PieChartIcon size={20} className="text-green-500" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <MotionWrapper
          className="h-[350px]" // La altura del MotionWrapper debería coincidir o ser adaptable a la del gráfico
          type="fadeUp"
          duration={0.7}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={height}
          />
        </MotionWrapper>

        {!showLegend && <CustomPieChartLegend data={validData} />}
      </CardContent>
    </Card>
  );
};

export default ApexPieChart;

