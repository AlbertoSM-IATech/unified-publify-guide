
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import MotionWrapper from '../motion/MotionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getChartTheme } from './chartTheme';
import { useTheme } from '@/hooks/useTheme';

interface ChartItem {
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
}

const ApexPieChart = ({ 
  title, 
  description, 
  data, 
  height = 350, 
  className,
  totalLabel,
  totalValue
}: ApexPieChartProps) => {
  const { isDarkMode } = useTheme();
  const themeOptions = getChartTheme(isDarkMode);
  
  // Preparar datos para ApexCharts
  const series = data.map(item => item.value);
  const labels = data.map(item => item.name);
  const colors = data.map(item => item.color);

  const options: ApexOptions = {
    ...themeOptions,
    chart: {
      ...themeOptions.chart,
      type: 'donut',
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
    colors: colors,
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: isDarkMode ? '#d5d5d5' : '#606060',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 600,
              color: undefined,
              offsetY: 0,
            },
            total: {
              show: true,
              showAlways: true,
              label: totalLabel || 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: isDarkMode ? '#d5d5d5' : '#606060',
              formatter: function (w) {
                return totalValue?.toString() || w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
              }
            }
          }
        },
        startAngle: 0,
        endAngle: 360,
      }
    },
    stroke: {
      width: 2,
      colors: ['transparent']
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toString();
        }
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
            <PieChart size={20} className="text-green-500" />
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
            type="donut" 
            height={height}
          />
        </MotionWrapper>

        {data.length > 0 && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default ApexPieChart;
