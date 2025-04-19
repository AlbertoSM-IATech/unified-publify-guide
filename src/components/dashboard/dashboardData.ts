
import { LucideIcon } from "lucide-react";
import { BookOpen, Users, TrendingUp, TrendingDown } from "lucide-react";

// Chart configuration with consistent colors
export const CHART_CONFIG = {
  altoContenido: { theme: { light: "#3B82F6", dark: "#3B82F6" } }, // Blue
  medioContenido: { theme: { light: "#FB923C", dark: "#FB923C" } }, // Coral Orange
  bajoContenido: { theme: { light: "#22C55E", dark: "#22C55E" } }, // Green (updated)
  publicados: { theme: { light: "#10B981", dark: "#10B981" } }, // Green
  enRevision: { theme: { light: "#F59E0B", dark: "#F59E0B" } }, // Amber
  borradores: { theme: { light: "#6366F1", dark: "#6366F1" } }, // Indigo
  sinEmpezar: { theme: { light: "#EF4444", dark: "#EF4444" } }, // Red
  balance: { theme: { light: "#6366F1", dark: "#6366F1" } }, // Indigo for balance
};

// Stats data structure
export interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

// Content category data structure
export interface StatusData {
  label: string;
  count: number;
  percentage: number;
}

export interface ContentCategory {
  title: string;
  description: string;
  color: string;
  icon?: LucideIcon; // Ahora es opcional ya que se definen directamente en Dashboard.tsx
  count: number;
  statusData: StatusData[];
}

// Chart data structure
export interface ChartItem {
  name: string;
  value: number;
  color: string;
}

// Stats data
export const getStatsData = (): StatItem[] => [
  { title: "Libros", value: "12", icon: BookOpen, change: "+2" },
  { title: "Colecciones", value: "4", icon: Users, change: "+1" },
  { title: "Ingresos", value: "€2,430", icon: TrendingUp, change: "+15%" },
  { title: "Gastos", value: "€1,890", icon: TrendingDown, change: "-5%" },
];

// Content categories data
export const getContentCategoriesData = (): ContentCategory[] => [
  {
    title: "Alto Contenido",
    description: "Libros con más de 100 páginas",
    color: "bg-blue-500",
    count: 1,
    statusData: [
      { label: "Publicados", count: 1, percentage: 100 },
      { label: "En revisión", count: 0, percentage: 0 },
      { label: "Borradores", count: 0, percentage: 0 },
      { label: "Sin empezar", count: 0, percentage: 0 },
    ]
  },
  {
    title: "Medio Contenido",
    description: "Libros entre 30-100 páginas",
    color: "bg-orange-500",
    count: 1,
    statusData: [
      { label: "Publicados", count: 0, percentage: 0 },
      { label: "En revisión", count: 1, percentage: 100 },
      { label: "Borradores", count: 0, percentage: 0 },
      { label: "Sin empezar", count: 0, percentage: 0 },
    ]
  },
  {
    title: "Bajo Contenido",
    description: "Libros con menos de 30 páginas",
    color: "bg-green-500",
    count: 0,
    statusData: [
      { label: "Publicados", count: 0, percentage: 0 },
      { label: "En revisión", count: 0, percentage: 0 },
      { label: "Borradores", count: 0, percentage: 0 },
      { label: "Sin empezar", count: 0, percentage: 0 },
    ]
  }
];

// Pie chart data
export const getPieChartData = (): ChartItem[] => [
  { name: "Publicados", value: 1, color: "#10b981" },
  { name: "En revisión", value: 1, color: "#f59e0b" },
  { name: "Borradores", value: 0, color: "#6366f1" },
  { name: "Sin empezar", value: 0, color: "#ef4444" },
];

// Bar chart data
export const getBarChartData = (): ChartItem[] => [
  { name: "Alto Contenido", value: 1, color: "#3b82f6" },
  { name: "Medio Contenido", value: 1, color: "#fb923c" },
  { name: "Bajo Contenido", value: 0, color: "#22c55e" }, // Updated to new green
];
