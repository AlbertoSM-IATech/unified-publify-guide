
import { FinancialRecord, FixedCost, FixedIncome } from '../types/dataTypes';

export const initialMonthlySummaries: FinancialRecord[] = [
  { id: 1, mes: "Enero", ingresos: 2430, gastos: 1890, beneficio: 540, concepto: "Ventas mensuales", observaciones: "Primer mes del año" },
  { id: 2, mes: "Febrero", ingresos: 2870, gastos: 2100, beneficio: 770, concepto: "Ventas de libros", observaciones: "Lanzamiento nuevo producto" },
  { id: 3, mes: "Marzo", ingresos: 3150, gastos: 2350, beneficio: 800, concepto: "Servicios editoriales", observaciones: "Contrato importante firmado" },
  { id: 4, mes: "Abril", ingresos: 2920, gastos: 2180, beneficio: 740, concepto: "Ventas generales", observaciones: "Promoción primavera" },
  { id: 5, mes: "Mayo", ingresos: 3450, gastos: 2400, beneficio: 1050, concepto: "Servicios de consultoría", observaciones: "Nuevo cliente importante" },
  { id: 6, mes: "Junio", ingresos: 3720, gastos: 2650, beneficio: 1070, concepto: "Ventas de temporada", observaciones: "Campaña verano exitosa" }
];

export const initialDailyData = [
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

export const initialWeeklyData = [
  { id: 1001, mes: "Enero", semana: "1", ingresos: 545, gastos: 395, beneficio: 150, concepto: "Semana 1", observaciones: "Primera semana del año" },
  { id: 1002, mes: "Enero", semana: "2", ingresos: 590, gastos: 460, beneficio: 130, concepto: "Semana 2", observaciones: "" },
  { id: 1003, mes: "Enero", semana: "3", ingresos: 635, gastos: 480, beneficio: 155, concepto: "Semana 3", observaciones: "Evento promocional" },
  { id: 1004, mes: "Enero", semana: "4", ingresos: 660, gastos: 555, beneficio: 105, concepto: "Semana 4", observaciones: "" },
  { id: 2001, mes: "Febrero", semana: "1", ingresos: 670, gastos: 510, beneficio: 160, concepto: "Semana 1", observaciones: "Nuevo producto" },
  // ... más datos simulados
];

export const initialYearlyData = [
  { id: 10001, ano: "2022", ingresos: 32500, gastos: 24800, beneficio: 7700, concepto: "Total 2022", observaciones: "Año anterior" },
  { id: 10002, ano: "2023", ingresos: 36900, gastos: 27200, beneficio: 9700, concepto: "Total 2023", observaciones: "Año actual" },
  { id: 10003, ano: "2024", ingresos: 18500, gastos: 13650, beneficio: 4850, concepto: "Total 2024 (parcial)", observaciones: "Año en curso" },
];

export const initialFixedCosts: FixedCost[] = [
  { id: 1, concepto: "Alquiler Oficina", coste: 850, frecuencia: "Mensual", fechaInicio: "2023-01-01" },
  { id: 2, concepto: "Servicios Web", coste: 120, frecuencia: "Mensual", fechaInicio: "2023-01-15" },
  { id: 3, concepto: "Software Editorial", coste: 350, frecuencia: "Mensual", fechaInicio: "2023-02-01" },
  { id: 4, concepto: "Seguro Profesional", coste: 420, frecuencia: "Trimestral", fechaInicio: "2023-03-01" },
  { id: 5, concepto: "Asesoría Contable", coste: 200, frecuencia: "Mensual", fechaInicio: "2023-01-10" }
];

export const initialFixedIncomes: FixedIncome[] = [
  { id: 1, concepto: "Suscripciones Premium", cantidad: 350, frecuencia: "Mensual", fechaInicio: "2023-01-05" },
  { id: 2, concepto: "Licencias Corporativas", cantidad: 1200, frecuencia: "Mensual", fechaInicio: "2023-02-01" },
  { id: 3, concepto: "Servicios de Edición", cantidad: 750, frecuencia: "Mensual", fechaInicio: "2023-01-15" },
  { id: 4, concepto: "Royalties Trimestrales", cantidad: 2400, frecuencia: "Trimestral", fechaInicio: "2023-03-01" },
];
