
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
