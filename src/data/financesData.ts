
import { useSyncedData } from '@/hooks/useSyncedData';
import { FinancialRecord } from '@/pages/Finanzas/types/dataTypes';
import { initialMonthlySummaries } from '@/pages/Finanzas/data/mockData';
import { useFixedFinances } from '@/pages/Finanzas/hooks/useFixedFinances';
import { useChartData } from '@/pages/Finanzas/hooks/useChartData';
import { calcularCambios } from '@/pages/Finanzas/utils/calculations';

export const useFinanceData = () => {
  const [resumenesMensuales, setResumenesMensuales] = useSyncedData<FinancialRecord[]>(
    initialMonthlySummaries, 
    "monthly_summaries"
  );

  const { 
    costesFijos, 
    ingresosFijos, 
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo,
    editarIngresoFijo,
    agregarIngresoFijo,
    eliminarIngresoFijo 
  } = useFixedFinances();

  const { getFilteredChartData, lineChartData } = useChartData(resumenesMensuales);

  // Cálculo de totales
  const ingresosTotales = resumenesMensuales.reduce((total, item) => total + item.ingresos, 0);
  const gastosTotales = resumenesMensuales.reduce((total, item) => total + item.gastos, 0);
  const beneficioNeto = ingresosTotales - gastosTotales;

  const agregarRegistroFinanciero = (nuevoRegistro: { 
    mes: string, 
    ingresos: number, 
    gastos: number,
    concepto?: string,
    observaciones?: string
  }) => {
    const nuevoId = Math.max(0, ...resumenesMensuales.map(item => item.id)) + 1;
    const beneficio = nuevoRegistro.ingresos - nuevoRegistro.gastos;
    
    const registroCompleto: FinancialRecord = {
      id: nuevoId,
      mes: nuevoRegistro.mes,
      ingresos: nuevoRegistro.ingresos,
      gastos: nuevoRegistro.gastos,
      beneficio: beneficio,
      concepto: nuevoRegistro.concepto,
      observaciones: nuevoRegistro.observaciones
    };
    
    setResumenesMensuales([...resumenesMensuales, registroCompleto]);
  };

  const updateResumenesMensuales = (updatedRecords: FinancialRecord[]) => {
    setResumenesMensuales(updatedRecords);
  };

  return {
    resumenesMensuales,
    costesFijos,
    ingresosFijos,
    lineChartData,
    ingresosTotales,
    gastosTotales,
    beneficioNeto,
    getFilteredChartData,
    updateResumenesMensuales,
    ...calcularCambios(resumenesMensuales),
    agregarRegistroFinanciero,
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo,
    editarIngresoFijo,
    agregarIngresoFijo,
    eliminarIngresoFijo
  };
};
