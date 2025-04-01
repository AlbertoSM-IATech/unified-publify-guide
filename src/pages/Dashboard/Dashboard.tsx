import { 
  BookOpen, Users, TrendingUp, Calendar, 
  BarChart3, TrendingDown, BarChart4
} from "lucide-react";

import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PieChart as LucidePieChart, LineChart } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Libros", value: "12", icon: <BookOpen size={20} />, change: "+2" },
    { title: "Colecciones", value: "4", icon: <Users size={20} />, change: "+1" },
    { title: "Ingresos", value: "€2,430", icon: <TrendingUp size={20} />, change: "+15%" },
    { title: "Gastos", value: "€1,890", icon: <TrendingDown size={20} />, change: "-5%" },
  ];

  const contentCategories = [
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

  const pieChartData = [
    { name: "Publicados", value: 1, color: "#10b981" },
    { name: "En revisión", value: 1, color: "#f59e0b" },
    { name: "Borradores", value: 0, color: "#6366f1" },
    { name: "Sin empezar", value: 0, color: "#ef4444" },
  ];

  const barChartData = [
    { name: "Alto Contenido", value: 1, color: "#3b82f6" },
    { name: "Medio Contenido", value: 1, color: "#f97316" },
    { name: "Bajo Contenido", value: 0, color: "#6b7280" },
  ];

  const CHART_CONFIG = {
    altoContenido: { theme: { light: "#3b82f6", dark: "#3b82f6" } },
    medioContenido: { theme: { light: "#f97316", dark: "#f97316" } },
    bajoContenido: { theme: { light: "#6b7280", dark: "#6b7280" } },
    publicados: { theme: { light: "#10b981", dark: "#10b981" } },
    enRevision: { theme: { light: "#f59e0b", dark: "#f59e0b" } },
    borradores: { theme: { light: "#6366f1", dark: "#6366f1" } },
    sinEmpezar: { theme: { light: "#ef4444", dark: "#ef4444" } },
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card-hover rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">
              <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {stat.change}
              </span>
              <span className="ml-1 text-muted-foreground">desde el mes pasado</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {contentCategories.map((category, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center">
              <div className={`mr-2 rounded ${category.color} p-1 text-white`}>
                {category.icon}
              </div>
              <div>
                <h3 className="font-heading font-medium">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
              <div className="ml-auto text-2xl font-bold">{category.count}</div>
            </div>
            
            <div className="space-y-3">
              {category.statusData.map((status, statusIndex) => (
                <div key={statusIndex}>
                  <div className="flex justify-between text-xs">
                    <span>{status.label}</span>
                    <span>{status.count} · {status.percentage}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${category.color}`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="font-heading text-lg font-medium">📊 Distribución por Estado</h2>
          <p className="text-xs text-muted-foreground">Proporción de libros según su estado de publicación</p>
          
          <div className="mt-4 h-64">
            <ChartContainer config={CHART_CONFIG}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name}: ${Math.round(percent * 100)}%`
                  }
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
              </PieChart>
            </ChartContainer>
          </div>
          
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {pieChartData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="mr-1 h-3 w-3 rounded-sm" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm">
            <span className="font-medium">2</span> Total libros
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="font-heading text-lg font-medium">📚 Distribución por Contenido</h2>
          <p className="text-xs text-muted-foreground">Libros distribuidos por longitud de contenido</p>
          
          <div className="mt-4 h-64">
            <ChartContainer config={CHART_CONFIG}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Bar dataKey="value">
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-heading text-lg font-medium">Libros Recientes</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="card-hover rounded-lg border bg-card shadow-sm"
            >
              <div className="relative pb-[160%] rounded-t-lg bg-muted overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={50} className="text-muted-foreground/50" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">Título del Libro {index}</h3>
                <p className="text-xs text-muted-foreground">
                  {index === 1 ? "Alto Contenido" : "Medio Contenido"}
                </p>
                <div className="mt-2 flex justify-between text-xs">
                  <span>Estado: {index === 1 ? "Publicado" : "En revisión"}</span>
                  <span className="text-primary">Ver detalles</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
