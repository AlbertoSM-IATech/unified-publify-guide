
import { useState, useCallback, useMemo } from "react";
import { useFinanceData } from "@/data/financesData";
import { formatPeriodDate } from "@/pages/Finanzas/utils/dateUtils";

interface LineChartDataItem {
  name: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  date?: string | number | Date; 
}

export const useFinancialLineChart = () => {
  const { getFilteredChartData } = useFinanceData();
  const [lineChartError, setLineChartError] = useState(false);

  const lineChartData = useMemo<LineChartDataItem[]>(() => {
    const chartData = getFilteredChartData('mensual');
    // Ensure chartData is an array before mapping
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return [{ name: 'Sin datos', ingresos: 0, gastos: 0, beneficio: 0 }];
    }
    return chartData.map(item => ({
      ...item,
      name: typeof item.name === 'string' ? item.name : 
        formatPeriodDate(new Date(item.date || Date.now()), 'mensual')
    }));
  }, [getFilteredChartData]);

  const handleLineChartError = useCallback(() => {
    setLineChartError(true);
    console.error("Error rendering Line chart (Balance Mensual)");
  }, []);

  const resetLineChartError = useCallback(() => {
    setLineChartError(false);
  }, []);

  return {
    lineChartData,
    lineChartError,
    handleLineChartError,
    resetLineChartError, // if you want to allow retrying or re-rendering
  };
};
