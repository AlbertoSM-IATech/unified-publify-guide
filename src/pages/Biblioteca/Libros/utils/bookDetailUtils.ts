
import { BookFormat } from "../types/bookTypes";

// Calcular las regalías netas
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price || !format.royaltyPercentage) {
    return "0.00";
  }

  // Precio sin IVA - no aplicamos más transformaciones ya que asumimos que el precio que tenemos ya está sin IVA
  const price = parseFloat(format.price.toString());
  
  // Regalías brutas (precio × porcentaje)
  const royaltyPercentage = parseFloat(format.royaltyPercentage.toString());
  const royalties = price * royaltyPercentage;
  
  // Restar costo de impresión si existe
  const printingCost = format.printingCost !== undefined ? parseFloat(format.printingCost.toString()) : 0;
  const netRoyalties = royalties - printingCost;
  
  // Devolver con dos decimales
  return netRoyalties.toFixed(2);
};

// Otras funciones de utilidad para detalles de libros
export const getFormatAvailability = (format?: BookFormat): boolean => {
  return !!format && !!format.price;
};

// Función para generar un enlace a Amazon
export const generateAmazonLink = (asin?: string): string => {
  if (!asin) return "";
  
  return `https://amazon.com/dp/${asin}`;
};

// Convertir fecha a formato legible
export const formatDate = (date: string | null): string => {
  if (!date) return "No disponible";
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
