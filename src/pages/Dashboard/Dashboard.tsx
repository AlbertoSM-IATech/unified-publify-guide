import { useEffect, useState } from "react";
import { getStatsData, getContentCategoriesData, getPieChartData, getBarChartData } from "@/components/dashboard/dashboardData";
import { librosSimulados } from "../Biblioteca/Libros/utils/librosUtils";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { DashboardStats } from "./components/DashboardStats";
import { ContentCategories } from "./components/ContentCategories";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentBooks } from "./components/RecentBooks";

export const Dashboard = () => {
  const [stats, setStats] = useState(getStatsData());
  const [contentCategories, setContentCategories] = useState(getContentCategoriesData());
  const [pieChartData, setPieChartData] = useState(getPieChartData());
  const [barChartData, setBarChartData] = useState(getBarChartData());
  const [libros, setLibros] = useState(librosSimulados);

  useEffect(() => {
    const altoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido").length;
    const medioContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido").length;
    const bajoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido").length;
    const publicados = libros.filter(libro => getEstadoCategory(libro.estado) === "Publicado").length;
    const enRevision = libros.filter(libro => getEstadoCategory(libro.estado) === "En revisión").length;
    const borradores = libros.filter(libro => getEstadoCategory(libro.estado) === "Borrador").length;
    const archivados = libros.filter(libro => getEstadoCategory(libro.estado) === "Archivado").length;

    const updatedContentCategories = [...contentCategories];
    const statusColors = {
      "Publicado": "#10B981",
      "En revisión": "#F59E0B",
      "Borrador": "#6366F1",
      "Archivado": "#EF4444"
    };
    const contentColors = {
      "Alto Contenido": "#3B82F6",
      "Medio Contenido": "#FB923C",
      "Bajo Contenido": "#10B981"
    };

    updatedContentCategories[0].count = altoContenido;
    updatedContentCategories[0].statusData = [{
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
      label: "Sin empezar",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / altoContenido * 100) : 0
    }];
    updatedContentCategories[1].count = medioContenido;
    updatedContentCategories[1].statusData = [{
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
      label: "Sin empezar",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / medioContenido * 100) : 0
    }];
    updatedContentCategories[2].count = bajoContenido;
    updatedContentCategories[2].statusData = [{
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
      label: "Sin empezar",
      count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
      percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / bajoContenido * 100) : 0
    }];
    setContentCategories(updatedContentCategories);

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
  }, [libros]);

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
