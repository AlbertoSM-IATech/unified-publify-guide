
import { BookOpen, Users, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import React from "react";

// Chart configuration
export const CHART_CONFIG = {
  altoContenido: { theme: { light: "#3b82f6", dark: "#3b82f6" } },
  medioContenido: { theme: { light: "#f97316", dark: "#f97316" } },
  bajoContenido: { theme: { light: "#6b7280", dark: "#6b7280" } },
  publicados: { theme: { light: "#10b981", dark: "#10b981" } },
  enRevision: { theme: { light: "#f59e0b", dark: "#f59e0b" } },
  borradores: { theme: { light: "#6366f1", dark: "#6366f1" } },
  sinEmpezar: { theme: { light: "#ef4444", dark: "#ef4444" } },
};

// Stats data
export const getStatsData = () => [
  { title: "Libros", value: "12", icon: <BookOpen size={20} />, change: "+2" },
  { title: "Colecciones", value: "4", icon: <Users size={20} />, change: "+1" },
  { title: "Ingresos", value: "€2,430", icon: <TrendingUp size={20} />, change: "+15%" },
  { title: "Gastos", value: "€1,890", icon: <TrendingDown size={20} />, change: "-5%" },
];

// Content categories data
export const getContentCategoriesData = () => [
  {
    title: "Alto Contenido",
    description: "Libros con más de 100 páginas",
    color: "bg-blue-500",
    icon: <BarChart3 size={20} className="text-blue-500" />,
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
    icon: <BarChart3 size={20} className="text-orange-500" />,
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
    color: "bg-gray-500",
    icon: <BarChart3 size={20} className="text-gray-500" />,
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
export const getPieChartData = () => [
  { name: "Publicados", value: 1, color: "#10b981" },
  { name: "En revisión", value: 1, color: "#f59e0b" },
  { name: "Borradores", value: 0, color: "#6366f1" },
  { name: "Sin empezar", value: 0, color: "#ef4444" },
];

// Bar chart data
export const getBarChartData = () => [
  { name: "Alto Contenido", value: 1, color: "#3b82f6" },
  { name: "Medio Contenido", value: 1, color: "#f97316" },
  { name: "Bajo Contenido", value: 0, color: "#6b7280" },
];
