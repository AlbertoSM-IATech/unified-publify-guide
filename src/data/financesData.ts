
import { useSyncedData } from '@/hooks/useSyncedData';
import { useState } from 'react';

export interface FinancialRecord {
  id: number;
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
}

export interface CosteFijo {
  id: number;
  concepto: string;
  coste: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

// Datos iniciales simulados para finanzas
const initialMonthlySummaries: FinancialRecord[] = [
  { id: 1, mes: "Enero", ingresos: 2430, gastos: 1890, beneficio: 540 },
  { id: 2, mes: "Febrero", ingresos: 2870, gastos: 2100, beneficio: 770 },
  { id: 3, mes: "Marzo", ingresos: 3150, gastos: 2350, beneficio: 800 },
  { id: 4, mes: "Abril", ingresos: 2920, gastos: 2180, beneficio: 740 },
  { id: 5, mes: "Mayo", ingresos: 3450, gastos: 2400, beneficio: 1050 },
  { id: 6, mes: "Junio", ingresos: 3720, gastos: 2650, beneficio: 1070 }
];

// Datos iniciales de costes fijos
const initialFixedCosts: CosteFijo[] = [
  { id: 1, concepto: "Alquiler Oficina", coste: 850, frecuencia: "Mensual" },
  { id: 2, concepto: "Servicios Web", coste: 120, frecuencia: "Mensual" },
  { id: 3, concepto: "Software Editorial", coste: 350, frecuencia: "Mensual" },
  { id: 4, concepto: "Seguro Profesional", coste: 420, frecuencia: "Trimestral" },
  { id: 5, concepto: "Asesoría Contable", coste: 200, frecuencia: "Mensual" }
];

export const useFinanceData = () => {
  const [resumenesMensuales, setResumenesMensuales] = useSyncedData<FinancialRecord[]>(
    initialMonthlySummaries, 
    "monthly_summaries"
  );
  const [costesFijos, setCostesFijos] = useSyncedData<CosteFijo[]>(
    initialFixedCosts, 
    "fixed_costs"
  );

  // Cálculo de totales
  const ingresosTotales = resumenesMensuales.reduce((total, item) => total + item.ingresos, 0);
  const gastosTotales = resumenesMensuales.reduce((total, item) => total + item.gastos, 0);
  const beneficioNeto = ingresosTotales - gastosTotales;
  
  // Preparar datos para el gráfico de líneas múltiples
  const lineChartData = resumenesMensuales.map(item => ({
    name: item.mes.substring(0, 3),
    ingresos: item.ingresos,
    gastos: item.gastos,
    beneficio: item.beneficio
  }));
  
  // Cálculo de porcentajes de cambio (comparando con el mes anterior)
  const calcularCambios = () => {
    if (resumenesMensuales.length < 2) return { 
      cambioIngresos: "0", 
      cambioGastos: "0", 
      cambioBeneficio: "0" 
    };
    
    const ultimoMes = resumenesMensuales[resumenesMensuales.length - 1];
    const penultimoMes = resumenesMensuales[resumenesMensuales.length - 2];
    
    const cambioIngresos = ((ultimoMes.ingresos - penultimoMes.ingresos) / penultimoMes.ingresos * 100).toFixed(0);
    const cambioGastos = ((ultimoMes.gastos - penultimoMes.gastos) / penultimoMes.gastos * 100).toFixed(0);
    const cambioBeneficio = ((ultimoMes.beneficio - penultimoMes.beneficio) / penultimoMes.beneficio * 100).toFixed(0);
    
    return { cambioIngresos, cambioGastos, cambioBeneficio };
  };
  
  // Funciones para agregar/editar registros
  const agregarRegistroFinanciero = (nuevoRegistro: { mes: string, ingresos: number, gastos: number }) => {
    const nuevoId = Math.max(0, ...resumenesMensuales.map(item => item.id)) + 1;
    const beneficio = nuevoRegistro.ingresos - nuevoRegistro.gastos;
    
    // Ahora creamos un objeto que se ajusta a la interfaz FinancialRecord
    const registroCompleto: FinancialRecord = {
      id: nuevoId,
      mes: nuevoRegistro.mes,
      ingresos: nuevoRegistro.ingresos,
      gastos: nuevoRegistro.gastos,
      beneficio: beneficio
    };
    
    setResumenesMensuales([...resumenesMensuales, registroCompleto]);
  };
  
  const editarCosteFijo = (id: number, datos: Partial<CosteFijo>) => {
    setCostesFijos(
      costesFijos.map(coste => 
        coste.id === id ? { ...coste, ...datos } : coste
      )
    );
  };
  
  const agregarCosteFijo = (nuevoCosto: Omit<CosteFijo, 'id'>) => {
    const nuevoId = Math.max(0, ...costesFijos.map(item => item.id)) + 1;
    setCostesFijos([...costesFijos, { ...nuevoCosto, id: nuevoId }]);
  };
  
  const eliminarCosteFijo = (id: number) => {
    setCostesFijos(costesFijos.filter(coste => coste.id !== id));
  };

  return {
    resumenesMensuales,
    costesFijos,
    lineChartData,
    ingresosTotales,
    gastosTotales,
    beneficioNeto,
    ...calcularCambios(),
    agregarRegistroFinanciero,
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo
  };
};
