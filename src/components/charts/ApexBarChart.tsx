import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { getChartTheme } from './chartTheme';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface ApexBarChartProps {
  title: string;
  description: string;
  data: ChartItem[];
  height?: number | string; // Permitir string para "100%"
  className?: string;
  horizontal?: boolean;
  onError?: () => void;
}

const ApexBarChart = ({ 
  title, 
  description, 
  data, 
  height = 350, // Default height
  className,
  horizontal = false,
}: ApexBarChartProps) => {
  const { isDarkMode } = useTheme();
  const themeOptions = getChartTheme(isDarkMode);
  
  const validData = Array.isArray(data) && data.length > 0 ? data : [{ name: 'No data', value: 0, color: '#ccc' }];
  
  const series = [{
    name: "Cantidad",
    data: validData.map(item => item.value),
  }];

  const categories = validData.map(item => item.name);
  const colors = validData.map(item => item.color);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
      },
      fontFamily: 'Poppins, sans-serif',
      foreColor: isDarkMode ? 'rgba(233, 233, 233, 0.9)' : 'rgba(60, 60, 60, 0.9)',
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        columnWidth: '60%',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
        distributed: true,
      },
    },
    colors: colors,
    dataLabels: {
      enabled: window.innerWidth > 768,
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: '600',
        colors: [isDarkMode ? "#ffffff" : "#333333"]
      },
      formatter: function(val) {
        return val ? val.toString() : "0";
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      }
    },
    tooltip: {
      enabled: true,
      intersect: false,
      shared: false,
      y: {
        formatter: function(val) {
          return val.toString();
        }
      },
      theme: isDarkMode ? 'dark' : 'light',
    },
    legend: {
      show: false,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        plotOptions: {
          bar: {
            horizontal: horizontal,
            columnWidth: '80%',
          }
        },
        dataLabels: {
          enabled: false,
        },
      }
    }]
  };

  // Si className incluye h-full, entonces el gráfico debería intentar usar 100% de altura.
  const chartHeight = className?.includes('h-full') ? '100%' : height;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className={cn("flex flex-col", className)}> {/* Added flex flex-col */}
        <CardHeader className="pb-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-500" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className={cn("py-10 text-center text-muted-foreground flex-grow flex items-center justify-center", { "justify-center": !className?.includes('h-full') })}> {/* Added flex-grow items-center justify-center */}
          No data available to display chart
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden flex flex-col", className)}> {/* Added flex flex-col */}
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-500" />
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
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
            type="bar" 
            height={chartHeight} // Use dynamic chartHeight
            width="100%"
          />
        </MotionWrapper>
      </CardContent>
    </Card>
  );
};

export default ApexBarChart;
