
/**
 * Returns the current month name in Spanish
 */
export function getCurrentMonth(): string {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const currentMonth = new Date().getMonth();
  return months[currentMonth];
}

/**
 * Checks if a month string matches the current month
 */
export function isCurrentMonth(month: string): boolean {
  return month === getCurrentMonth();
}
