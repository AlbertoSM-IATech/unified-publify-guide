
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import { getChartTheme } from './chartTheme';
import { useTheme } from '@/hooks/useTheme';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface Series {
  name: string;
  key: string;
  color: string;
}

interface ApexLineChartProps {
  title: string;
  description: string;
  data: DataPoint[];
  series?: Series[];
  height?: number;
  className?: string;
}

const ApexLineChart = ({ 
  title, 
  description, 
  data, 
  series = [], 
  height = 350, 
  className 
}: ApexLineChartProps) => {
  const { isDarkMode } = useTheme();
  const themeOptions = getChartTheme(isDarkMode);
  
  // Making sure the data is valid to prevent rendering issues
  const validData = Array.isArray(data) && data.length > 0 
    ? data 
    : [{ name: 'No data', balance: 0 }];
  
  // Preparar datos para ApexCharts
  const chartSeries = series.length > 0 
    ? series.map(s => ({
        name: s.name,
        data: validData.map(item => Number(item[s.key] || 0)),
      }))
    : [{
        name: 'Balance',
        data: validData.map(item => Number(item.balance || 0)),
      }];

  const categories = validData.map(item => item.name);
  const colors = series.length > 0 ? series.map(s => s.color) : ['#FB923C'];

  // Simplified options to avoid any resolve reference issues
  const options: ApexOptions = {
    chart: {
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
      fontFamily: 'Poppins, sans-serif',
      foreColor: isDarkMode ? 'rgba(233, 233, 233, 0.9)' : 'rgba(60, 60, 60, 0.9)',
      background: 'transparent',
      dropShadow: {
        enabled: true,
        color: colors[0],
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 6,
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
      enabled: true,
      shared: true,
      intersect: false,
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: function(val) {
          return `€${val.toFixed(2)}`;
        }
      }
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

  // Prevent rendering chart if no valid data is available
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <LineChart size={20} className="text-[#FB923C]" />
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
            series={chartSeries} 
            type="line" 
            height={height}
          />
        </MotionWrapper>
      </CardContent>
    </Card>
  );
};

export default ApexLineChart;
