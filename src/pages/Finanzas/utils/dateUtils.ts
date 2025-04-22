
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
export const getDatesByPeriod = (period: string): Date[] => {
  const today = new Date();
  const dates: Date[] = [];

  switch (period) {
    case 'diario':
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        dates.push(date);
      }
      break;
    case 'semanal':
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - (i * 7));
        dates.push(date);
      }
      break;
    case 'mensual':
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        date.setDate(1);
        dates.push(date);
      }
      break;
    case 'anual':
      // Last 5 years
      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setFullYear(today.getFullYear() - i);
        date.setMonth(0);
        date.setDate(1);
        dates.push(date);
      }
      break;
    default:
      // Default to monthly
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        date.setDate(1);
        dates.push(date);
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
