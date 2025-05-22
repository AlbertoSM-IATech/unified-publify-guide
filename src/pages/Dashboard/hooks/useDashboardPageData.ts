
import { useMemo } from "react";
import { useBookData } from "@/hooks/useBookData";
import { ChartItem, ContentCategory, getInitialContentCategoriesData } from "@/components/dashboard/dashboardData";
import { getContentCategory, getEstadoCategory } from "@/pages/Dashboard/utils/dashboardUtils";

export const useDashboardPageData = () => {
  const { books: libros } = useBookData();
  const initialContentCategories = useMemo(() => getInitialContentCategoriesData(), []);

  const contentCategories = useMemo<ContentCategory[]>(() => {
    if (!libros || libros.length === 0) return initialContentCategories;

    const altoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido").length;
    const medioContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido").length;
    const bajoContenido = libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido").length;

    const updatedCategories = initialContentCategories.map(category => ({ ...category, statusData: [...(category.statusData || [])] }));

    // Alto Contenido
    updatedCategories[0].count = altoContenido;
    updatedCategories[0].statusData = [
      {
        label: "Publicados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
        percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / altoContenido * 100) : 0
      },
      // ... (otros estados para Alto Contenido)
      {
        label: "En revisión",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
        percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / altoContenido * 100) : 0
      },
      {
        label: "Borradores",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
        percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / altoContenido * 100) : 0
      },
      {
        label: "Archivados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
        percentage: altoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Alto Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / altoContenido * 100) : 0
      }
    ];
    
    // Medio Contenido
    updatedCategories[1].count = medioContenido;
    updatedCategories[1].statusData = [
      {
        label: "Publicados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
        percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / medioContenido * 100) : 0
      },
      // ... (otros estados para Medio Contenido)
        {
        label: "En revisión",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
        percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / medioContenido * 100) : 0
      },
      {
        label: "Borradores",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
        percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / medioContenido * 100) : 0
      },
      {
        label: "Archivados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
        percentage: medioContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Medio Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / medioContenido * 100) : 0
      }
    ];
    
    // Bajo Contenido
    updatedCategories[2].count = bajoContenido;
    updatedCategories[2].statusData = [
      {
        label: "Publicados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length,
        percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Publicado").length / bajoContenido * 100) : 0
      },
      // ... (otros estados para Bajo Contenido)
      {
        label: "En revisión",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length,
        percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "En revisión").length / bajoContenido * 100) : 0
      },
      {
        label: "Borradores",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length,
        percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Borrador").length / bajoContenido * 100) : 0
      },
      {
        label: "Archivados",
        count: libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length,
        percentage: bajoContenido > 0 ? Math.round(libros.filter(libro => getContentCategory(libro.contenido) === "Bajo Contenido" && getEstadoCategory(libro.estado) === "Archivado").length / bajoContenido * 100) : 0
      }
    ];
    
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

  return {
    librosCount: libros?.length || 0,
    contentCategories,
    pieChartData,
    barChartData,
  };
};
