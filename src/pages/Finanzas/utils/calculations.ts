
import { FinancialRecord } from '../types/dataTypes';

export const calcularCambios = (resumenesMensuales: FinancialRecord[]) => {
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
