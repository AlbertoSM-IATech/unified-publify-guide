
import { ApexOptions } from 'apexcharts';

// Define los estilos base para las gráficas según el tema
export const getChartTheme = (isDarkMode: boolean): Partial<ApexOptions> => {
  const baseTextColor = isDarkMode ? 'rgba(233, 233, 233, 0.9)' : 'rgba(60, 60, 60, 0.9)';
  const gridColor = isDarkMode ? 'rgba(150, 150, 150, 0.1)' : 'rgba(96, 96, 96, 0.1)';
  const borderColor = isDarkMode ? 'rgba(150, 150, 150, 0.2)' : 'rgba(96, 96, 96, 0.2)';

  return {
    chart: {
      background: 'transparent',
      fontFamily: 'Poppins, sans-serif',
      foreColor: baseTextColor,
    },
    grid: {
      borderColor: borderColor,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
      }
    },
    legend: {
      labels: {
        colors: baseTextColor
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken'
        }
      },
      active: {
        filter: {
          type: 'darken'
        }
      }
    }
  };
};

// Paleta de colores para los tipos de contenido
export const contentColors = {
  "Alto Contenido": "#3B82F6", // Azul
  "Medio Contenido": "#FB923C", // Naranja
  "Bajo Contenido": "#22C55E"   // Verde
};

// Paleta de colores para los estados
export const statusColors = {
  "Publicado": "#10B981",      // Verde
  "En revisión": "#F59E0B",    // Ámbar
  "Borrador": "#6366F1",       // Índigo
  "Archivado": "#EF4444"       // Rojo
};
