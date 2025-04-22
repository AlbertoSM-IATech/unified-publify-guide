
import { useState, useCallback, useEffect } from "react";
import { useFinanceData } from "@/data/financesData";
import { getCurrentMonth } from "../../utils/dateUtils";
import { CurrentMonthSummary } from "./summary/CurrentMonthSummary";
import { GeneralStats } from "./summary/GeneralStats";
import { FinancialEvolutionChart } from "./summary/FinancialEvolutionChart";
import { MonthlySummaryTable } from "./summary/MonthlySummaryTable";

interface ResumenTabProps {
  periodView: string;
  onPeriodChange: (period: string) => void;
}

export const ResumenTab = ({ periodView, onPeriodChange }: ResumenTabProps) => {
  const { 
    resumenesMensuales, 
    lineChartData,
    ingresosTotales,
    gastosTotales,
    beneficioNeto,
    cambioIngresos,
    cambioGastos,
    cambioBeneficio,
    costesFijos,
    ingresosFijos,
    getFilteredChartData
  } = useFinanceData();

  // Calculate fixed monthly costs
  const costesFijosMensuales = costesFijos.reduce((total, coste) => {
    if (coste.frecuencia === "Mensual") return total + coste.coste;
    if (coste.frecuencia === "Trimestral") return total + (coste.coste / 3);
    if (coste.frecuencia === "Anual") return total + (coste.coste / 12);
    return total;
  }, 0);

  // Calculate fixed monthly income
  const ingresosFijosMensuales = ingresosFijos.reduce((total, ingreso) => {
    if (ingreso.frecuencia === "Mensual") return total + ingreso.cantidad;
    if (ingreso.frecuencia === "Trimestral") return total + (ingreso.cantidad / 3);
    if (ingreso.frecuencia === "Anual") return total + (ingreso.cantidad / 12);
    return total;
  }, 0);

  // Filter current month records
  const currentMonthName = getCurrentMonth();
  const currentMonthRecord = resumenesMensuales.find(record => record.mes === currentMonthName);
  
  // Calculate current month values
  const currentMonthIngresos = (currentMonthRecord?.ingresos || 0) + ingresosFijosMensuales;
  const currentMonthGastos = (currentMonthRecord?.gastos || 0) + costesFijosMensuales;
  const currentMonthBeneficio = currentMonthIngresos - currentMonthGastos;

  // Handle period change using useCallback to prevent recreation on each render
  const handlePeriodChange = useCallback((period: string) => {
    onPeriodChange(period);
  }, [onPeriodChange]);

  // Memoized chart data to prevent unnecessary re-renders
  const filteredChartData = useCallback(() => {
    return getFilteredChartData(periodView);
  }, [getFilteredChartData, periodView])();

  return (
    <div className="space-y-6">
      <CurrentMonthSummary
        currentMonthName={currentMonthName}
        currentMonthIngresos={currentMonthIngresos}
        currentMonthGastos={currentMonthGastos}
        currentMonthBeneficio={currentMonthBeneficio}
        ingresosFijosMensuales={ingresosFijosMensuales}
        costesFijosMensuales={costesFijosMensuales}
      />

      <GeneralStats
        ingresosTotales={ingresosTotales}
        gastosTotales={gastosTotales}
        beneficioNeto={beneficioNeto}
        cambioIngresos={cambioIngresos}
        cambioGastos={cambioGastos}
        cambioBeneficio={cambioBeneficio}
        ingresosFijosMensuales={ingresosFijosMensuales}
        costesFijosMensuales={costesFijosMensuales}
        resumenesMensualesLength={resumenesMensuales.length}
      />

      <FinancialEvolutionChart 
        lineChartData={filteredChartData} 
        periodView={periodView}
        onPeriodChange={handlePeriodChange}
      />

      <MonthlySummaryTable resumenesMensuales={resumenesMensuales} />
    </div>
  );
};
