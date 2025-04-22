
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatTransactionDate = (date: Date | string | null): string => {
  if (!date) return "Fecha no disponible";
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  try {
    return format(dateObj, 'dd/MM/yyyy', { locale: es });
  } catch (error) {
    console.error("Error formatting date:", error, date);
    return "Error en fecha";
  }
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'MMMM', { locale: es });
};

export const isCurrentMonth = (month: string): boolean => {
  const currentMonth = getCurrentMonth().toLowerCase();
  return month.toLowerCase() === currentMonth;
};

export const formatDate = (date: Date | string | null): string => {
  if (!date) return "Fecha no disponible";
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  try {
    return format(dateObj, 'dd MMMM yyyy', { locale: es });
  } catch (error) {
    console.error("Error formatting date:", error, date);
    return "Error en fecha";
  }
};

// Additional date utility functions for time-based views
export const getDatesByPeriod = (period: string, fullYear = false): Date[] => {
  const today = new Date();
  const dates: Date[] = [];
  const currentYear = today.getFullYear();

  switch (period) {
    case 'diario':
      if (fullYear) {
        // From January 1st to current date
        const startDate = new Date(currentYear, 0, 1);
        const daysToGenerate = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        for (let i = 0; i < daysToGenerate; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          dates.push(date);
        }
      } else {
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          dates.push(date);
        }
      }
      break;

    case 'semanal':
      if (fullYear) {
        // From first week of year to current week
        const startDate = new Date(currentYear, 0, 1);
        // Adjust to first day of week
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);
        
        let currentWeekStart = new Date(startDate);
        const currentDate = new Date();
        
        while (currentWeekStart <= currentDate) {
          dates.push(new Date(currentWeekStart));
          currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        }
      } else {
        // Last 4 weeks
        for (let i = 3; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - (i * 7));
          dates.push(date);
        }
      }
      break;

    case 'mensual':
      if (fullYear) {
        // All months of current year up to current month
        for (let i = 0; i <= today.getMonth(); i++) {
          const date = new Date(currentYear, i, 1);
          dates.push(date);
        }
      } else {
        // Last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(today.getMonth() - i);
          date.setDate(1);
          dates.push(date);
        }
      }
      break;

    case 'anual':
      if (fullYear) {
        // Last 5 years including current
        for (let i = 4; i >= 0; i--) {
          const date = new Date(currentYear - i, 0, 1);
          dates.push(date);
        }
      } else {
        // Last 5 years
        for (let i = 4; i >= 0; i--) {
          const date = new Date();
          date.setFullYear(today.getFullYear() - i);
          date.setMonth(0);
          date.setDate(1);
          dates.push(date);
        }
      }
      break;

    default:
      // Default to monthly
      if (fullYear) {
        // All months of current year up to current month
        for (let i = 0; i <= today.getMonth(); i++) {
          const date = new Date(currentYear, i, 1);
          dates.push(date);
        }
      } else {
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(today.getMonth() - i);
          date.setDate(1);
          dates.push(date);
        }
      }
  }

  return dates;
};

export const formatPeriodDate = (date: Date, period: string): string => {
  switch (period) {
    case 'diario':
      return format(date, 'dd MMM', { locale: es });
    case 'semanal':
      return `Sem ${format(date, 'w', { locale: es })}`;
    case 'mensual':
      return format(date, 'MMM yyyy', { locale: es });
    case 'anual':
      return format(date, 'yyyy', { locale: es });
    default:
      return format(date, 'MMM yyyy', { locale: es });
  }
};
