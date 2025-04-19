
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import { getChartTheme } from './chartTheme';
import { useTheme } from '@/hooks/useTheme';

interface ApexLineChartProps {
  title: string;
  description: string;
  data: { name: string; balance: number }[];
  height?: number;
  className?: string;
}

const ApexLineChart = ({ title, description, data, height = 350, className }: ApexLineChartProps) => {
  const { isDarkMode } = useTheme();
  const themeOptions = getChartTheme(isDarkMode);
  
  // Preparar datos para ApexCharts
  const series = [{
    name: 'Balance',
    data: data.map(item => item.balance),
  }];

  const categories = data.map(item => item.name);

  const options: ApexOptions = {
    ...themeOptions,
    chart: {
      ...themeOptions.chart,
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
      dropShadow: {
        enabled: true,
        color: '#FB923C',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
    },
    colors: ['#FB923C'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 6,
      colors: ['#FB923C'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8,
      }
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
    yaxis: {
      labels: {
        formatter: function (value) {
          return `€${value}`;
        },
      },
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: function (value) {
          return `€${value}`;
        }
      },
      marker: {
        show: true,
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <LineChart size={20} className="text-[#FB923C]" />
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
            type="line" 
            height={height}
          />
        </MotionWrapper>
      </CardContent>
    </Card>
  );
};

export default ApexLineChart;
