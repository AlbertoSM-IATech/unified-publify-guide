import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/dashboard/StatsCard";
import ContentCategoryCard from "@/components/dashboard/ContentCategoryCard";
import PieChartCard from "@/components/dashboard/PieChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import BookCard from "@/components/dashboard/BookCard";
import LineChartCard from "@/components/dashboard/LineChartCard";
import { 
  CHART_CONFIG, 
  getStatsData, 
  getContentCategoriesData, 
  getPieChartData, 
  getBarChartData 
} from "@/components/dashboard/dashboardData";
import { getLineChartData } from "@/components/dashboard/lineChartData";
import { 
  BarChart3, 
  BookOpen, 
  LineChart, 
  PieChart, 
  BookText, 
  BookMarked, 
  BookType 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { librosSimulados } from "../Biblioteca/Libros/utils/librosUtils";

const Dashboard = () => {
  // Use state to hold dashboard data
  const [stats, setStats] = useState(getStatsData());
  const [contentCategories, setContentCategories] = useState(getContentCategoriesData());
  const [pieChartData, setPieChartData] = useState(getPieChartData());
  const [barChartData, setBarChartData] = useState(getBarChartData());
  const [lineChartData, setLineChartData] = useState(getLineChartData());
  const [libros, setLibros] = useState(librosSimulados);

  // Update dashboard data based on current library
  useEffect(() => {
    // Update stats with actual book count
    const updatedStats = [...stats];
    updatedStats[0].value = libros.length.toString();
    setStats(updatedStats);

    // Count books by content category
    const altoContenido = libros.filter(libro => libro.contenido === "Alto Contenido").length;
    const medioContenido = libros.filter(libro => libro.contenido === "Medio Contenido").length;
    const bajoContenido = libros.filter(libro => libro.contenido === "Bajo Contenido").length;

    // Count books by status
    const publicados = libros.filter(libro => libro.estado === "Publicado").length;
    const enRevision = libros.filter(libro => libro.estado === "En revisión").length;
    const borradores = libros.filter(libro => libro.estado === "Borrador").length;
    const archivados = libros.filter(libro => libro.estado === "Archivado").length;
    
    // Update content categories with actual counts
    const updatedContentCategories = [...contentCategories];
    
    // Update Alto Contenido
    updatedContentCategories[0].count = altoContenido;
    updatedContentCategories[0].statusData = [
      { 
        label: "Publicados", 
        count: libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Publicado").length,
        percentage: altoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Publicado").length / altoContenido * 100)
          : 0
      },
      { 
        label: "En revisión", 
        count: libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "En revisión").length,
        percentage: altoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "En revisión").length / altoContenido * 100)
          : 0
      },
      { 
        label: "Borradores", 
        count: libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Borrador").length,
        percentage: altoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Borrador").length / altoContenido * 100)
          : 0
      },
      { 
        label: "Sin empezar", 
        count: libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Archivado").length,
        percentage: altoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Alto Contenido" && libro.estado === "Archivado").length / altoContenido * 100)
          : 0
      }
    ];
    
    // Update Medio Contenido
    updatedContentCategories[1].count = medioContenido;
    updatedContentCategories[1].statusData = [
      { 
        label: "Publicados", 
        count: libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Publicado").length,
        percentage: medioContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Publicado").length / medioContenido * 100)
          : 0
      },
      { 
        label: "En revisión", 
        count: libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "En revisión").length,
        percentage: medioContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "En revisión").length / medioContenido * 100)
          : 0
      },
      { 
        label: "Borradores", 
        count: libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Borrador").length,
        percentage: medioContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Borrador").length / medioContenido * 100)
          : 0
      },
      { 
        label: "Sin empezar", 
        count: libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Archivado").length,
        percentage: medioContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Medio Contenido" && libro.estado === "Archivado").length / medioContenido * 100)
          : 0
      }
    ];
    
    // Update Bajo Contenido
    updatedContentCategories[2].count = bajoContenido;
    updatedContentCategories[2].statusData = [
      { 
        label: "Publicados", 
        count: libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Publicado").length,
        percentage: bajoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Publicado").length / bajoContenido * 100)
          : 0
      },
      { 
        label: "En revisión", 
        count: libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "En revisión").length,
        percentage: bajoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "En revisión").length / bajoContenido * 100)
          : 0
      },
      { 
        label: "Borradores", 
        count: libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Borrador").length,
        percentage: bajoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Borrador").length / bajoContenido * 100)
          : 0
      },
      { 
        label: "Sin empezar", 
        count: libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Archivado").length,
        percentage: bajoContenido > 0 
          ? Math.round(libros.filter(libro => libro.contenido === "Bajo Contenido" && libro.estado === "Archivado").length / bajoContenido * 100)
          : 0
      }
    ];
    
    setContentCategories(updatedContentCategories);
    
    // Update pie chart data with actual counts
    const updatedPieChartData = [
      { name: "Publicados", value: publicados, color: "#10b981" },
      { name: "En revisión", value: enRevision, color: "#f59e0b" },
      { name: "Borradores", value: borradores, color: "#6366f1" },
      { name: "Archivados", value: archivados, color: "#ef4444" }
    ];
    setPieChartData(updatedPieChartData);
    
    // Update bar chart data with actual counts
    const updatedBarChartData = [
      { name: "Alto Contenido", value: altoContenido, color: "#3b82f6" },
      { name: "Medio Contenido", value: medioContenido, color: "#f97316" },
      { name: "Bajo Contenido", value: bajoContenido, color: "#10b981" }
    ];
    setBarChartData(updatedBarChartData);
    
  }, [libros]);

  return (
    <div className="p-4 animate-fade-in space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </div>

      {/* Stats Cards - 4 columnas en desktop, 2 en tablet, 1 en móvil */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <StatsCard 
              key={index} 
              title={stat.title} 
              value={stat.value} 
              icon={<Icon size={20} />} 
              change={stat.change} 
            />
          );
        })}
      </div>

      {/* Content Categories - 3 columnas en desktop, 1 en móvil */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <ContentCategoryCard 
          title="Alto Contenido" 
          description="Libros con más de 100 páginas" 
          color="bg-blue-500" 
          icon={<BookText size={20} className="text-white" />} 
          count={contentCategories[0].count} 
          statusData={contentCategories[0].statusData} 
        />
        <ContentCategoryCard 
          title="Medio Contenido" 
          description="Libros entre 30-100 páginas" 
          color="bg-orange-500" 
          icon={<BookMarked size={20} className="text-white" />} 
          count={contentCategories[1].count} 
          statusData={contentCategories[1].statusData} 
        />
        <ContentCategoryCard 
          title="Bajo Contenido" 
          description="Libros con menos de 30 páginas" 
          color="bg-green-500" 
          icon={<BookType size={20} className="text-white" />} 
          count={contentCategories[2].count} 
          statusData={contentCategories[2].statusData} 
        />
      </div>

      {/* Line Chart - Ancho completo */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-900">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <LineChart size={20} className="text-primary" />
              Balance Mensual
            </CardTitle>
            <CardDescription>
              Seguimiento de ingresos y gastos mensuales
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-4 bg-gray-800">
          <div className="h-[350px]">
            <LineChartCard 
              title="Balance Mensual" 
              description="Seguimiento de balance mensual" 
              data={lineChartData} 
              chartConfig={CHART_CONFIG} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts section - 2 columnas en desktop, 1 en móvil */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-900">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <PieChart size={20} className="text-green-500" />
                Distribución por Estado
              </CardTitle>
              <CardDescription>
                Proporción de libros según su estado de publicación
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-4 bg-zinc-900">
            <div className="h-[350px]">
              <PieChartCard 
                title="Distribución por Estado" 
                description="Proporción de libros según su estado de publicación" 
                data={pieChartData} 
                chartConfig={CHART_CONFIG} 
                totalLabel="Total libros" 
                totalValue={libros.length} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-900">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-500" />
                Distribución por Contenido
              </CardTitle>
              <CardDescription>
                Libros distribuidos por longitud de contenido
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-4 bg-zinc-900 py-[18px] px-0 my-0 mx-0">
            <div className="h-[350px]">
              <BarChartCard 
                title="Distribución por Contenido" 
                description="Libros distribuidos por longitud de contenido" 
                data={barChartData} 
                chartConfig={CHART_CONFIG} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Books - 2 columnas en desktop, 2 en tablet, 1 en móvil */}
      <Card>
        <CardHeader className="pb-3 bg-gray-900">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            Libros Recientes
          </CardTitle>
          <CardDescription>
            Los últimos libros añadidos a tu biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent className="my-[31px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Display the 6 most recent books */}
            {libros
              .sort((a, b) => {
                // Sort by most recent (by id for now, should use date in real app)
                return b.id - a.id;
              })
              .slice(0, 6)
              .map((libro, index) => (
                <Link to={`/biblioteca/libros/${libro.id}`} key={libro.id}>
                  <BookCard 
                    index={index + 1}
                    title={libro.titulo}
                    author={libro.autor}
                    contentLevel={libro.contenido}
                    status={libro.estado}
                    coverUrl={libro.imageUrl}
                  />
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
