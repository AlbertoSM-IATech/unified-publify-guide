
import { FinancialRecord } from '../types/dataTypes';

export const useChartData = (resumenesMensuales: FinancialRecord[]) => {
  const getFilteredChartData = (periodView: string) => {
    switch (periodView) {
      case 'diario':
        return [];  // Return daily data when implemented
      case 'semanal':
        return [];  // Return weekly data when implemented
      case 'anual':
        return [];  // Return yearly data when implemented
      case 'mensual':
      default:
        return resumenesMensuales.map(item => ({
          name: item.mes.substring(0, 3),
          ingresos: item.ingresos,
          gastos: item.gastos,
          beneficio: item.beneficio
        }));
    }
  };

  const lineChartData = resumenesMensuales.map(item => ({
    name: item.mes.substring(0, 3),
    ingresos: item.ingresos,
    gastos: item.gastos,
    beneficio: item.beneficio
  }));

  return {
    getFilteredChartData,
    lineChartData
  };
};
