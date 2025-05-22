
import { ApexOptions } from 'apexcharts';
import { ChartItem } from '../ApexPieChart'; // Asumiremos que ChartItem se exportará desde ApexPieChart o un archivo de tipos común

export const getApexPieChartOptions = (
  isDarkMode: boolean,
  colors: string[],
  labels: string[],
  totalLabel: string | undefined,
  totalValue: number | undefined,
  validData: ChartItem[], // Necesario para el formateador del total si no hay datos
  showLegend: boolean
): ApexOptions => {
  return {
    chart: {
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
      fontFamily: 'Poppins, sans-serif',
      foreColor: isDarkMode ? 'rgba(233, 233, 233, 0.9)' : 'rgba(60, 60, 60, 0.9)',
      background: 'transparent',
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
              color: undefined, // ApexCharts lo manejará
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
                if (totalValue !== undefined) {
                  return validData.length === 1 && validData[0]?.name === 'No data' && validData[0]?.value === 1
                    ? '0'
                    : totalValue.toString();
                }
                // Si totalValue no se proporciona, ApexCharts calcula la suma.
                // Si los datos eran [{ name: 'No data', value: 1, color: '#ccc' }], la suma es 1, pero queremos mostrar 0.
                const seriesTotals = w.globals.seriesTotals as number[];
                if (seriesTotals.reduce((a, b) => a + b, 0) === 1 && validData.length === 1 && validData[0]?.name === 'No data') {
                  return '0';
                }
                return seriesTotals.reduce((a, b) => a + b, 0).toString();
              },
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
      show: showLegend,
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      enabled: true,
      custom: undefined,
      fixed: {
        enabled: false
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300 // Ajustar según sea necesario
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
};

