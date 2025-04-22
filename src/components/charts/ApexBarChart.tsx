
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { getChartTheme } from './chartTheme';
import { useTheme } from '@/hooks/useTheme';

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface ApexBarChartProps {
  title: string;
  description: string;
  data: ChartItem[];
  height?: number;
  className?: string;
  horizontal?: boolean;
}

const ApexBarChart = ({ 
  title, 
  description, 
  data, 
  height = 350, 
  className,
  horizontal = false
}: ApexBarChartProps) => {
  const { isDarkMode } = useTheme();
  const themeOptions = getChartTheme(isDarkMode);
  
  // Making sure the data is valid to prevent rendering issues
  const validData = Array.isArray(data) && data.length > 0 ? data : [{ name: 'No data', value: 0, color: '#ccc' }];
  
  // Preparar datos para ApexCharts
  const series = [{
    name: "Cantidad",
    data: validData.map(item => item.value),
  }];

  const categories = validData.map(item => item.name);
  const colors = validData.map(item => item.color);

  const options: ApexOptions = {
    ...themeOptions,
    chart: {
      ...themeOptions.chart,
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
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 3,
        left: 3,
        blur: 6,
        opacity: 0.1
      },
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
      y: {
        formatter: function (value) {
          return value.toString();
        }
      },
      // Using custom render to avoid issues with undefined resolver
      custom: undefined
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

  // Prevent rendering chart if no valid data is available
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-500" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="py-10 text-center text-muted-foreground">
          No data available to display chart
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
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
      <CardContent className="pb-4">
        <MotionWrapper 
          className="h-[350px]"
          type="fadeUp"
          duration={0.7}
        >
          <ReactApexChart 
            options={options} 
            series={series} 
            type="bar" 
            height={height}
          />
        </MotionWrapper>
      </CardContent>
    </Card>
  );
};

export default ApexBarChart;
