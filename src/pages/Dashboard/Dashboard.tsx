
import { useEffect, useState, useCallback } from "react";
import { getStatsData, getContentCategoriesData } from "@/components/dashboard/dashboardData";
import { librosSimulados } from "../Biblioteca/Libros/utils/librosUtils";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { DashboardStats } from "./components/DashboardStats";
import { ContentCategories } from "./components/ContentCategories";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentBooks } from "./components/RecentBooks";
import { getContentCategory, getEstadoCategory } from "@/pages/Dashboard/utils/dashboardUtils";
import { useFinanceData } from "@/data/financesData";
import { ChartItem } from "@/components/dashboard/dashboardData";

export const Dashboard = () => {
  const { ingresosTotales, gastosTotales, beneficioNeto, cambioIngresos, cambioGastos, cambioBeneficio } = useFinanceData();
  const [stats, setStats] = useState(getStatsData());
  const [contentCategories, setContentCategories] = useState(getContentCategoriesData());
  const [pieChartData, setPieChartData] = useState<ChartItem[]>([]);
  const [barChartData, setBarChartData] = useState<ChartItem[]>([]);
  const [libros, setLibros] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  
  // Function to load the latest book data from localStorage
  const loadLatestBooks = useCallback(() => {
    try {
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        setLibros(parsedBooks);
        console.info('[Dashboard] Books loaded from localStorage:', parsedBooks.length);
        return parsedBooks;
      } else {
        // Fallback to simulated data if nothing in localStorage
        setLibros(librosSimulados);
        console.info('[Dashboard] Using mock book data');
        return librosSimulados;
      }
    } catch (error) {
      console.error('Error loading books in dashboard:', error);
      setLibros(librosSimulados);
      return librosSimulados;
    }
  }, []);

  // Load books on mount and set up a refresh interval
  useEffect(() => {
    loadLatestBooks();
    
    // Set up periodic check for book data changes
    const refreshInterval = setInterval(() => {
      loadLatestBooks();
      setLastUpdated(Date.now());
    }, 5000);
    
    return () => clearInterval(refreshInterval);
  }, [loadLatestBooks]);
  
  // Update dashboard data when books or other stats change
  useEffect(() => {
    const currentBooks = libros;
    
    // Update stats with real financial and book data
    const updatedStats = [...stats];
    updatedStats[0] = {
      ...updatedStats[0], 
      value: `${currentBooks.length}`,
      change: `+${currentBooks.length > 0 ? Math.min(currentBooks.length, 7) : 0}`
    };
    
    updatedStats[2] = {
      ...updatedStats[2],
      value: `€${ingresosTotales}`,
      change: `${cambioIngresos}%`
    };
    
    updatedStats[3] = {
      ...updatedStats[3],
      value: `€${gastosTotales}`,
      change: `${cambioGastos}%`
    };
    
    setStats(updatedStats);
    
    // Calculate statistics based on books data
    const altoContenido = currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido").length;
    const medioContenido = currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido").length;
    const bajoContenido = currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido").length;
    const publicados = currentBooks.filter(libro => getEstadoCategory(libro.estado) === "Publicado").length;
    const enRevision = currentBooks.filter(libro => getEstadoCategory(libro.estado) === "En revisión").length;
    const borradores = currentBooks.filter(libro => getEstadoCategory(libro.estado) === "Borrador").length;
    const archivados = currentBooks.filter(libro => getEstadoCategory(libro.estado) === "Archivado").length;

    const updatedContentCategories = [...contentCategories];
    
    updatedContentCategories[0].count = altoContenido;
    updatedContentCategories[0].statusData = [{
      label: "Publicados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: altoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / altoContenido * 100) : 0
    }, {
      label: "En revisión",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: altoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / altoContenido * 100) : 0
    }, {
      label: "Borradores",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: altoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / altoContenido * 100) : 0
    }, {
      label: "Archivados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: altoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / altoContenido * 100) : 0
    }];
    
    updatedContentCategories[1].count = medioContenido;
    updatedContentCategories[1].statusData = [{
      label: "Publicados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: medioContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / medioContenido * 100) : 0
    }, {
      label: "En revisión",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: medioContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / medioContenido * 100) : 0
    }, {
      label: "Borradores",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: medioContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / medioContenido * 100) : 0
    }, {
      label: "Archivados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: medioContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / medioContenido * 100) : 0
    }];
    
    updatedContentCategories[2].count = bajoContenido;
    updatedContentCategories[2].statusData = [{
      label: "Publicados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
      percentage: bajoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / bajoContenido * 100) : 0
    }, {
      label: "En revisión",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
      percentage: bajoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / bajoContenido * 100) : 0
    }, {
      label: "Borradores",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
      percentage: bajoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / bajoContenido * 100) : 0
    }, {
      label: "Archivados",
      count: currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: bajoContenido > 0 ? Math.round(currentBooks.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / bajoContenido * 100) : 0
    }];
    
    setContentCategories(updatedContentCategories);

    // Update chart data with accurate counts
    const updatedPieChartData = [
      { name: "Publicados", value: publicados, color: "#10b981" },
      { name: "En revisión", value: enRevision, color: "#f59e0b" },
      { name: "Borradores", value: borradores, color: "#6366f1" },
      { name: "Archivados", value: archivados, color: "#ef4444" }
    ];
    setPieChartData(updatedPieChartData);

    const updatedBarChartData = [
      { name: "Alto Contenido", value: altoContenido, color: "#3b82f6" },
      { name: "Medio Contenido", value: medioContenido, color: "#fb923c" },
      { name: "Bajo Contenido", value: bajoContenido, color: "#22c55e" }
    ];
    setBarChartData(updatedBarChartData);
  }, [libros, ingresosTotales, gastosTotales, beneficioNeto, cambioIngresos, cambioGastos, cambioBeneficio, contentCategories, stats, lastUpdated]);

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
        librosCount={libros.length} 
      />

      <ContentCategories contentCategories={contentCategories} />

      <DashboardCharts 
        pieChartData={pieChartData}
        barChartData={barChartData}
        librosCount={libros.length}
      />

      <RecentBooks libros={libros} />
    </div>
  );
};

export default Dashboard;
