
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FinancialRecord } from '../types/dataTypes';
import { getDatesByPeriod, formatPeriodDate } from '../utils/dateUtils';

export const useChartData = (resumenesMensuales: FinancialRecord[]) => {
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState('mensual');

  // Create line chart data for financial evolution
  const lineChartData = useMemo(() => {
    if (!resumenesMensuales.length) {
      const dates = getDatesByPeriod(currentPeriod);
      return dates.map(date => ({
        date,
        name: formatPeriodDate(date, currentPeriod),
        ingresos: 0,
        gastos: 0,
        beneficio: 0
      }));
    }

    // For the monthly view, we use the actual data
    if (currentPeriod === 'mensual') {
      return resumenesMensuales.map(record => ({
        name: record.mes,
        ingresos: record.ingresos,
        gastos: record.gastos,
        beneficio: record.beneficio
      }));
    }

    // For other views, we generate dates and aggregate data
    const dates = getDatesByPeriod(currentPeriod);
    
    return dates.map(date => {
      // Find records that fall within this period
      const recordsInPeriod = resumenesMensuales.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (currentPeriod === 'diario') {
          // Same day
          return recordDate.toDateString() === date.toDateString();
        } else if (currentPeriod === 'semanal') {
          // Same week
          const diffTime = Math.abs(date.getTime() - recordDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        } else if (currentPeriod === 'anual') {
          // Same year
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          // Default to monthly
          return (
            recordDate.getMonth() === date.getMonth() && 
            recordDate.getFullYear() === date.getFullYear()
          );
        }
      });
      
      // Sum up the values
      const ingresos = recordsInPeriod.reduce((sum, record) => sum + record.ingresos, 0);
      const gastos = recordsInPeriod.reduce((sum, record) => sum + record.gastos, 0);
      const beneficio = ingresos - gastos;
      
      return {
        date,
        name: formatPeriodDate(date, currentPeriod),
        ingresos,
        gastos,
        beneficio
      };
    });
  }, [resumenesMensuales, currentPeriod]);

  // Generate data for a specific period - memoize to prevent recreation on each render
  const generateDataForPeriod = useCallback((records: FinancialRecord[], period: string) => {
    const dates = getDatesByPeriod(period);
    
    return dates.map(date => {
      // Find records that fall within this period
      const recordsInPeriod = records.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (period === 'diario') {
          // Same day
          return recordDate.toDateString() === date.toDateString();
        } else if (period === 'semanal') {
          // Same week
          const diffTime = Math.abs(date.getTime() - recordDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        } else if (period === 'anual') {
          // Same year
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          // Default to monthly
          return (
            recordDate.getMonth() === date.getMonth() && 
            recordDate.getFullYear() === date.getFullYear()
          );
        }
      });
      
      // Sum up the values
      const ingresos = recordsInPeriod.reduce((sum, record) => sum + record.ingresos, 0);
      const gastos = recordsInPeriod.reduce((sum, record) => sum + record.gastos, 0);
      const beneficio = ingresos - gastos;
      
      return {
        date,
        name: formatPeriodDate(date, period),
        ingresos,
        gastos,
        beneficio
      };
    });
  }, []);

  // Use useCallback to prevent function recreation on each render
  const getFilteredChartData = useCallback((period: string) => {
    // Only update if period actually changed
    if (period !== currentPeriod) {
      setCurrentPeriod(period);
      const data = generateDataForPeriod(resumenesMensuales, period);
      setFilteredChartData(data);
      return data;
    }
    return filteredChartData;
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
