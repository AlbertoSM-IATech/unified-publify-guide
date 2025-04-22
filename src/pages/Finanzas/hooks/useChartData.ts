
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FinancialRecord } from '../types/dataTypes';
import { getDatesByPeriod, formatPeriodDate } from '../utils/dateUtils';

export const useChartData = (resumenesMensuales: FinancialRecord[]) => {
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState('mensual');

  // Create line chart data for financial evolution
  const lineChartData = useMemo(() => {
    // Generate dates based on period and ensure we cover the whole year or appropriate time range
    const dates = getDatesByPeriod(currentPeriod, true); // Added parameter to get full year
    
    if (!resumenesMensuales.length) {
      return dates.map(date => ({
        date,
        name: formatPeriodDate(date, currentPeriod),
        ingresos: 0,
        gastos: 0,
        beneficio: 0
      }));
    }

    return dates.map(date => {
      // Find records that fall within this period
      const recordsInPeriod = resumenesMensuales.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (currentPeriod === 'diario') {
          // Same day
          return recordDate.toDateString() === date.toDateString();
        } else if (currentPeriod === 'semanal') {
          // Same week - first day of week to last day of week
          const recordWeekStart = new Date(recordDate);
          recordWeekStart.setDate(recordDate.getDate() - recordDate.getDay());
          const dateWeekStart = new Date(date);
          dateWeekStart.setDate(date.getDate() - date.getDay());
          return recordWeekStart.toDateString() === dateWeekStart.toDateString();
        } else if (currentPeriod === 'anual') {
          // Same year
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          // Monthly - same month and year
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
    const dates = getDatesByPeriod(period, true); // Added parameter to get full year
    
    return dates.map(date => {
      // Find records that fall within this period
      const recordsInPeriod = records.filter(record => {
        const recordDate = new Date(record.fecha || `1 ${record.mes} 2024`);
        
        if (period === 'diario') {
          // Same day
          return recordDate.toDateString() === date.toDateString();
        } else if (period === 'semanal') {
          // Same week - align by start of week
          const recordWeekStart = new Date(recordDate);
          recordWeekStart.setDate(recordDate.getDate() - recordDate.getDay());
          const dateWeekStart = new Date(date);
          dateWeekStart.setDate(date.getDate() - date.getDay());
          return recordWeekStart.toDateString() === dateWeekStart.toDateString();
        } else if (period === 'anual') {
          // Same year
          return recordDate.getFullYear() === date.getFullYear();
        } else {
          // Monthly - same month and year
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
