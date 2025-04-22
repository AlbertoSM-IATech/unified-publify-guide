import { useSyncedData } from '@/hooks/useSyncedData';
import { NuevoIngresoFijo, NuevoCosteFijo, Transaction } from '@/pages/Finanzas/types/finanzasTypes';

export interface FinancialRecord {
  id: number;
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  concepto?: string;
  observaciones?: string;
}

export interface CosteFijo {
  id: number;
  concepto: string;
  coste: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

export interface IngresoFijo {
  id: number;
  concepto: string;
  cantidad: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

// Datos iniciales simulados para finanzas
const initialMonthlySummaries: FinancialRecord[] = [
  { id: 1, mes: "Enero", ingresos: 2430, gastos: 1890, beneficio: 540, concepto: "Ventas mensuales", observaciones: "Primer mes del año" },
  { id: 2, mes: "Febrero", ingresos: 2870, gastos: 2100, beneficio: 770, concepto: "Ventas de libros", observaciones: "Lanzamiento nuevo producto" },
  { id: 3, mes: "Marzo", ingresos: 3150, gastos: 2350, beneficio: 800, concepto: "Servicios editoriales", observaciones: "Contrato importante firmado" },
  { id: 4, mes: "Abril", ingresos: 2920, gastos: 2180, beneficio: 740, concepto: "Ventas generales", observaciones: "Promoción primavera" },
  { id: 5, mes: "Mayo", ingresos: 3450, gastos: 2400, beneficio: 1050, concepto: "Servicios de consultoría", observaciones: "Nuevo cliente importante" },
  { id: 6, mes: "Junio", ingresos: 3720, gastos: 2650, beneficio: 1070, concepto: "Ventas de temporada", observaciones: "Campaña verano exitosa" }
];

// Datos iniciales con detalle diario
const initialDailyData: any[] = [
  // Semana 1 enero
  { id: 101, mes: "Enero", dia: "01", ingresos: 110, gastos: 80, beneficio: 30, concepto: "Inicio mes", observaciones: "Primer día laboral" },
  { id: 102, mes: "Enero", dia: "02", ingresos: 90, gastos: 70, beneficio: 20, concepto: "Ventas diarias", observaciones: "" },
  { id: 103, mes: "Enero", dia: "03", ingresos: 120, gastos: 85, beneficio: 35, concepto: "Consultoría", observaciones: "Cliente A" },
  { id: 104, mes: "Enero", dia: "04", ingresos: 95, gastos: 65, beneficio: 30, concepto: "Ventas online", observaciones: "" },
  { id: 105, mes: "Enero", dia: "05", ingresos: 130, gastos: 95, beneficio: 35, concepto: "Venta especial", observaciones: "Promoción fin de semana" },
  // Semana 1 febrero
  { id: 201, mes: "Febrero", dia: "01", ingresos: 130, gastos: 90, beneficio: 40, concepto: "Inicio mes", observaciones: "" },
  { id: 202, mes: "Febrero", dia: "02", ingresos: 110, gastos: 80, beneficio: 30, concepto: "Ventas diarias", observaciones: "" },
  // ... más datos simulados
];

// Datos iniciales semanales
const initialWeeklyData: any[] = [
  { id: 1001, mes: "Enero", semana: "1", ingresos: 545, gastos: 395, beneficio: 150, concepto: "Semana 1", observaciones: "Primera semana del año" },
  { id: 1002, mes: "Enero", semana: "2", ingresos: 590, gastos: 460, beneficio: 130, concepto: "Semana 2", observaciones: "" },
  { id: 1003, mes: "Enero", semana: "3", ingresos: 635, gastos: 480, beneficio: 155, concepto: "Semana 3", observaciones: "Evento promocional" },
  { id: 1004, mes: "Enero", semana: "4", ingresos: 660, gastos: 555, beneficio: 105, concepto: "Semana 4", observaciones: "" },
  { id: 2001, mes: "Febrero", semana: "1", ingresos: 670, gastos: 510, beneficio: 160, concepto: "Semana 1", observaciones: "Nuevo producto" },
  // ... más datos simulados
];

// Datos iniciales anuales
const initialYearlyData: any[] = [
  { id: 10001, ano: "2022", ingresos: 32500, gastos: 24800, beneficio: 7700, concepto: "Total 2022", observaciones: "Año anterior" },
  { id: 10002, ano: "2023", ingresos: 36900, gastos: 27200, beneficio: 9700, concepto: "Total 2023", observaciones: "Año actual" },
  { id: 10003, ano: "2024", ingresos: 18500, gastos: 13650, beneficio: 4850, concepto: "Total 2024 (parcial)", observaciones: "Año en curso" },
];

// Datos iniciales de costes fijos
const initialFixedCosts: CosteFijo[] = [
  { id: 1, concepto: "Alquiler Oficina", coste: 850, frecuencia: "Mensual" },
  { id: 2, concepto: "Servicios Web", coste: 120, frecuencia: "Mensual" },
  { id: 3, concepto: "Software Editorial", coste: 350, frecuencia: "Mensual" },
  { id: 4, concepto: "Seguro Profesional", coste: 420, frecuencia: "Trimestral" },
  { id: 5, concepto: "Asesoría Contable", coste: 200, frecuencia: "Mensual" }
];

// Datos iniciales de ingresos fijos
const initialFixedIncomes: IngresoFijo[] = [
  { id: 1, concepto: "Suscripciones Premium", cantidad: 350, frecuencia: "Mensual" },
  { id: 2, concepto: "Licencias Corporativas", cantidad: 1200, frecuencia: "Mensual" },
  { id: 3, concepto: "Servicios de Edición", cantidad: 750, frecuencia: "Mensual" },
  { id: 4, concepto: "Royalties Trimestrales", cantidad: 2400, frecuencia: "Trimestral" },
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
  const [ingresosFijos, setIngresosFijos] = useSyncedData<IngresoFijo[]>(
    initialFixedIncomes, 
    "fixed_incomes"
  );
  const [dailyData] = useSyncedData(initialDailyData, "daily_data");
  const [weeklyData] = useSyncedData(initialWeeklyData, "weekly_data");
  const [yearlyData] = useSyncedData(initialYearlyData, "yearly_data");

  // Cálculo de totales
  const ingresosTotales = resumenesMensuales.reduce((total, item) => total + item.ingresos, 0);
  const gastosTotales = resumenesMensuales.reduce((total, item) => total + item.gastos, 0);
  const beneficioNeto = ingresosTotales - gastosTotales;
  
  // Get filtered chart data based on period view
  const getFilteredChartData = (periodView: string) => {
    switch (periodView) {
      case 'diario':
        return dailyData.map(item => ({
          name: `${item.dia}/${item.mes.substring(0, 3)}`,
          ingresos: item.ingresos,
          gastos: item.gastos,
          beneficio: item.beneficio
        }));
      case 'semanal':
        return weeklyData.map(item => ({
          name: `S${item.semana}/${item.mes.substring(0, 3)}`,
          ingresos: item.ingresos,
          gastos: item.gastos,
          beneficio: item.beneficio
        }));
      case 'anual':
        return yearlyData.map(item => ({
          name: item.ano,
          ingresos: item.ingresos,
          gastos: item.gastos,
          beneficio: item.beneficio
        }));
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
  
  // Funciones para agregar/editar registros financieros
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
  
  // Funciones para gestionar costes fijos
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

  // Funciones para gestionar ingresos fijos
  const editarIngresoFijo = (id: number, datos: Partial<IngresoFijo>) => {
    setIngresosFijos(
      ingresosFijos.map(ingreso => 
        ingreso.id === id ? { ...ingreso, ...datos } : ingreso
      )
    );
  };
  
  const agregarIngresoFijo = (nuevoIngreso: Omit<IngresoFijo, 'id'>) => {
    const nuevoId = Math.max(0, ...ingresosFijos.map(item => item.id)) + 1;
    setIngresosFijos([...ingresosFijos, { ...nuevoIngreso, id: nuevoId }]);
  };
  
  const eliminarIngresoFijo = (id: number) => {
    setIngresosFijos(ingresosFijos.filter(ingreso => ingreso.id !== id));
  };

  // Add this function to expose updating resumenesMensuales
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
    ...calcularCambios(),
    agregarRegistroFinanciero,
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo,
    editarIngresoFijo,
    agregarIngresoFijo,
    eliminarIngresoFijo
  };
};
