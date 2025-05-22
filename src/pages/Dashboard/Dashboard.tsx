import { useEffect, useState, useCallback, useMemo } from "react";
import { getStatsData, getContentCategoriesData as getInitialContentCategoriesData } from "@/components/dashboard/dashboardData";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { DashboardStats } from "./components/DashboardStats";
import { ContentCategories } from "./components/ContentCategories";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentBooks } from "./components/RecentBooks";
import { getContentCategory, getEstadoCategory } from "@/pages/Dashboard/utils/dashboardUtils";
import { useFinanceData } from "@/data/financesData";
import { ChartItem } from "@/components/dashboard/dashboardData";
import { useBookData } from "@/hooks/useBookData";
import { ApexLineChart } from "@/components/charts";
import { formatPeriodDate } from "@/pages/Finanzas/utils/dateUtils";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ChartErrorFallback = ({ title }: { title: string }) => (
  <Card className="w-full h-[350px] flex items-center justify-center">
    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Error al cargar gráfico</h3>
      <p className="text-muted-foreground">
        No se pudo cargar el gráfico {title}. Intente recargar la página.
      </p>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { 
    ingresosTotales, 
    gastosTotales, 
    beneficioNeto, 
    cambioIngresos, 
    cambioGastos, 
    cambioBeneficio,
    getFilteredChartData
  } = useFinanceData();
  const { books: libros } = useBookData();
  const [stats, setStats] = useState(getStatsData());
  const [lineChartError, setLineChartError] = useState(false);

  const initialContentCategories = useMemo(() => getInitialContentCategoriesData(), []);

  const contentCategories = useMemo(() => {
    if (!libros || libros.length === 0) return initialContentCategories;

    const altoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido").length;
    const medioContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido").length;
    const bajoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido").length;

    const updatedCategories = initialContentCategories.map(category => ({ ...category, statusData: [...(category.statusData || [])] }));

    updatedCategories[0].count = altoContenido;
    updatedCategories[0].statusData = [{
      label: "Publicados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / altoContenido * 100) : 0
    }, {
      label: "En revisión",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / altoContenido * 100) : 0
    }, {
      label: "Borradores",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / altoContenido * 100) : 0
    }, {
      label: "Archivados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / altoContenido * 100) : 0
    }];
    
    updatedCategories[1].count = medioContenido;
    updatedCategories[1].statusData = [{
      label: "Publicados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / medioContenido * 100) : 0
    }, {
      label: "En revisión",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / medioContenido * 100) : 0
    }, {
      label: "Borradores",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / medioContenido * 100) : 0
    }, {
      label: "Archivados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / medioContenido * 100) : 0
    }];
    
    updatedCategories[2].count = bajoContenido;
    updatedCategories[2].statusData = [{
      label: "Publicados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / bajoContenido * 100) : 0
    }, {
      label: "En revisión",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / bajoContenido * 100) : 0
    }, {
      label: "Borradores",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / bajoContenido * 100) : 0
    }, {
      label: "Archivados",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / bajoContenido * 100) : 0
    }];
    
    return updatedCategories;
  }, [libros, initialContentCategories]);

  const pieChartData = useMemo<ChartItem[]>(() => {
    if (!libros || libros.length === 0) return [];
    const publicados = libros.filter(libro => getEstadoCategory(libro.estado) === "Publicado").length;
    const enRevision = libros.filter(libro => getEstadoCategory(libro.estado) === "En revisión").length;
    const borradores = libros.filter(libro => getEstadoCategory(libro.estado) === "Borrador").length;
    const archivados = libros.filter(libro => getEstadoCategory(libro.estado) === "Archivado").length;

    return [
      { name: "Publicados", value: publicados, color: "#10b981" },
      { name: "En revisión", value: enRevision, color: "#f59e0b" },
      { name: "Borradores", value: borradores, color: "#6366f1" },
      { name: "Archivados", value: archivados, color: "#ef4444" }
    ];
  }, [libros]);

  const barChartData = useMemo<ChartItem[]>(() => {
    if (!libros || libros.length === 0) return [];
    const altoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido").length;
    const medioContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido").length;
    const bajoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido").length;
    
    return [
      { name: "Alto Contenido", value: altoContenido, color: "#3b82f6" },
      { name: "Medio Contenido", value: medioContenido, color: "#fb923c" },
      { name: "Bajo Contenido", value: bajoContenido, color: "#22c55e" }
    ];
  }, [libros]);
  
  const validLineChartData = useMemo(() => {
    const chartData = getFilteredChartData('mensual');
    return Array.isArray(chartData) && chartData.length > 0 
      ? chartData.map(item => ({
          ...item,
          name: typeof item.name === 'string' ? item.name : 
            formatPeriodDate(new Date(item.date || Date.now()), 'mensual')
        }))
      : [{ name: 'Sin datos', ingresos: 0, gastos: 0, beneficio: 0 }];
  }, [getFilteredChartData]);

  const handleLineChartError = useCallback(() => {
    setLineChartError(true);
    console.error("Error rendering Line chart (Balance Mensual)");
  }, []);

  return (
    <div className="p-4 animate-fade-in space-y-8">
      <MotionWrapper type="fadeDown" duration={0.5} className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </MotionWrapper>

      <DashboardStats 
        stats={stats} 
        setStats={setStats} 
        librosCount={libros?.length || 0} 
      />

      <ContentCategories contentCategories={contentCategories} />

      <DashboardCharts 
        pieChartData={pieChartData}
        barChartData={barChartData}
        librosCount={libros?.length || 0}
      />

      <RecentBooks />

      <MotionWrapper type="fadeUp" delay={0.2}>
        {lineChartError ? (
          <ChartErrorFallback title="Balance Mensual" />
        ) : (
          <ApexLineChart
            title="Balance Mensual"
            description="Seguimiento de ingresos y gastos mensuales (incluye fijos)"
            data={validLineChartData}
            series={[
              { name: "Ingresos", key: "ingresos", color: "#10B981" },
              { name: "Gastos", key: "gastos", color: "#EF4444" },
              { name: "Beneficio", key: "beneficio", color: "#3B82F6" }
            ]}
            height={350}
            onError={handleLineChartError}
          />
        )}
      </MotionWrapper>
    </div>
  );
};

export default Dashboard;
