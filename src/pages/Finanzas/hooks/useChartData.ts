import { useState, useEffect, useMemo, useCallback } from 'react';
import { FinancialRecord, FixedCost, FixedIncome } from '../types/dataTypes';
import { getDatesByPeriod, formatPeriodDate } from '../utils/dateUtils';
import { useFixedFinances } from './useFixedFinances';

export const useChartData = (resumenesMensuales: FinancialRecord[]) => {
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState('mensual');
  const { costesFijos, ingresosFijos } = useFixedFinances();

  // Función para calcular costes fijos para una fecha específica
  const calcularCostesFijos = (fecha: Date) => {
    return costesFijos.reduce((total, coste) => {
      const fechaInicio = new Date(coste.fechaInicio);
      // Solo incluir si la fecha es posterior o igual a la fecha de inicio
      // y no es una fecha futura
      if (fecha >= fechaInicio && fecha <= new Date()) {
        if (coste.frecuencia === "Mensual") return total + coste.coste;
        if (coste.frecuencia === "Trimestral") return total + (coste.coste / 3);
        if (coste.frecuencia === "Anual") return total + (coste.coste / 12);
      }
      return total;
    }, 0);
  };

  // Función para calcular ingresos fijos para una fecha específica
  const calcularIngresosFijos = (fecha: Date) => {
    return ingresosFijos.reduce((total, ingreso) => {
      const fechaInicio = new Date(ingreso.fechaInicio);
      // Solo incluir si la fecha es posterior o igual a la fecha de inicio
      // y no es una fecha futura
      if (fecha >= fechaInicio && fecha <= new Date()) {
        if (ingreso.frecuencia === "Mensual") return total + ingreso.cantidad;
        if (ingreso.frecuencia === "Trimestral") return total + (ingreso.cantidad / 3);
        if (ingreso.frecuencia === "Anual") return total + (ingreso.cantidad / 12);
      }
      return total;
    }, 0);
  };

  // Create line chart data for financial evolution
  const lineChartData = useMemo(() => {
    // Generate dates based on period but only up to current date
    const dates = getDatesByPeriod(currentPeriod, true).filter(date => date <= new Date());
    
    if (!resumenesMensuales.length) {
      return dates.map(date => {
        const costesFijosMes = calcularCostesFijos(date);
        const ingresosFijosMes = calcularIngresosFijos(date);
        return {
          date,
          name: formatPeriodDate(date, currentPeriod),
          ingresos: ingresosFijosMes,
          gastos: costesFijosMes,
          beneficio: ingresosFijosMes - costesFijosMes
        };
      });
    }

    return dates.map(date => {
      // Find records that fall within this period
      const recordsInPeriod = resumenesMensuales.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (currentPeriod === 'diario') {
          return recordDate.toDateString() === date.toDateString();
        } else if (currentPeriod === 'semanal') {
          const recordWeekStart = new Date(recordDate);
          recordWeekStart.setDate(recordDate.getDate() - recordDate.getDay());
          const dateWeekStart = new Date(date);
          dateWeekStart.setDate(date.getDate() - date.getDay());
          return recordWeekStart.toDateString() === dateWeekStart.toDateString();
        } else if (currentPeriod === 'anual') {
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          return (
            recordDate.getMonth() === date.getMonth() && 
            recordDate.getFullYear() === date.getFullYear()
          );
        }
      });
      
      // Calcular ingresos y gastos fijos para este período
      const costesFijosMes = calcularCostesFijos(date);
      const ingresosFijosMes = calcularIngresosFijos(date);
      
      // Sum up the values including fixed incomes and costs
      const ingresos = recordsInPeriod.reduce((sum, record) => sum + record.ingresos, 0) + ingresosFijosMes;
      const gastos = recordsInPeriod.reduce((sum, record) => sum + record.gastos, 0) + costesFijosMes;
      const beneficio = ingresos - gastos;
      
      return {
        date,
        name: formatPeriodDate(date, currentPeriod),
        ingresos,
        gastos,
        beneficio
      };
    });
  }, [resumenesMensuales, currentPeriod, costesFijos, ingresosFijos]);

  // Generate data for a specific period
  const generateDataForPeriod = useCallback((records: FinancialRecord[], period: string) => {
    const dates = getDatesByPeriod(period, true).filter(date => date <= new Date());
    
    return dates.map(date => {
      const recordsInPeriod = records.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (period === 'diario') {
          return recordDate.toDateString() === date.toDateString();
        } else if (period === 'semanal') {
          const recordWeekStart = new Date(recordDate);
          recordWeekStart.setDate(recordDate.getDate() - recordDate.getDay());
          const dateWeekStart = new Date(date);
          dateWeekStart.setDate(date.getDate() - date.getDay());
          return recordWeekStart.toDateString() === dateWeekStart.toDateString();
        } else if (period === 'anual') {
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          return (
            recordDate.getMonth() === date.getMonth() && 
            recordDate.getFullYear() === date.getFullYear()
          );
        }
      });
      
      // Calcular ingresos y gastos fijos para este período
      const costesFijosMes = calcularCostesFijos(date);
      const ingresosFijosMes = calcularIngresosFijos(date);
      
      // Sum up the values including fixed incomes and costs
      const ingresos = recordsInPeriod.reduce((sum, record) => sum + record.ingresos, 0) + ingresosFijosMes;
      const gastos = recordsInPeriod.reduce((sum, record) => sum + record.gastos, 0) + costesFijosMes;
      const beneficio = ingresos - gastos;
      
      return {
        date,
        name: formatPeriodDate(date, period),
        ingresos,
        gastos,
        beneficio
      };
    });
  }, [costesFijos, ingresosFijos]);

  // Use useCallback to prevent function recreation on each render
  const getFilteredChartData = useCallback((period: string) => {
    // Only update if period actually changed
    if (period !== currentPeriod) {
      setCurrentPeriod(period);
      const data = generateDataForPeriod(resumenesMensuales, period);
      setFilteredChartData(data);
      return data;
    }
    return filteredChartData.length > 0 ? filteredChartData : generateDataForPeriod(resumenesMensuales, period);
  }, [resumenesMensuales, generateDataForPeriod, currentPeriod, filteredChartData]);

  // Initialize filtered data only once on mount or when dependencies change
  useEffect(() => {
    setFilteredChartData(lineChartData);
  }, [lineChartData]);

  return {
    lineChartData,
    filteredChartData,
    getFilteredChartData,
    currentPeriod
  };
};
