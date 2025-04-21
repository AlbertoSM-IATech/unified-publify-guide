import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/dashboard/StatsCard";
import ContentCategoryCard from "@/components/dashboard/ContentCategoryCard";
import BookCard from "@/components/dashboard/BookCard";
import { CHART_CONFIG, getStatsData, getContentCategoriesData, getPieChartData, getBarChartData } from "@/components/dashboard/dashboardData";
import { getLineChartData, useFinanceChartData } from "@/components/dashboard/lineChartData";
import { BarChart3, BookOpen, LineChart, PieChart, BookText, BookMarked, BookType } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { librosSimulados } from "../Biblioteca/Libros/utils/librosUtils";
import { ApexLineChart, ApexBarChart, ApexPieChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { useFinanceData } from "@/data/financesData";

const contentTypeMap = {
  "hardcover": "Alto Contenido",
  "paperback": "Medio Contenido",
  "ebook": "Bajo Contenido"
};

const estadoMap = {
  "publicado": "Publicado",
  "en_edicion": "En revisión",
  "borrador": "Borrador",
  "pausado": "Archivado"
};

const getContentCategory = (contentType: string) => {
  if (contentType === "hardcover") return "Alto Contenido";
  if (contentType === "paperback") return "Medio Contenido";
  if (contentType === "ebook") return "Bajo Contenido";
  return contentType;
};

const getEstadoCategory = (estado: string) => {
  if (estado === "publicado") return "Publicado";
  if (estado === "en_edicion") return "En revisión";
  if (estado === "borrador") return "Borrador";
  if (estado === "pausado") return "Archivado";
  return estado;
};

export const Dashboard = () => {
  const [stats, setStats] = useState(getStatsData());
  const [contentCategories, setContentCategories] = useState(getContentCategoriesData());
  const [pieChartData, setPieChartData] = useState(getPieChartData());
  const [barChartData, setBarChartData] = useState(getBarChartData());
  const [libros, setLibros] = useState(librosSimulados);
  
  const { 
    lineChartData: financeData, 
    ingresosTotales, 
    gastosTotales, 
    beneficioNeto,
    cambioIngresos,
    cambioGastos 
  } = useFinanceData();

  useEffect(() => {
    const updatedStats = [...stats];
    updatedStats[0].value = libros.length.toString();
    
    updatedStats[2].value = `€${ingresosTotales.toLocaleString()}`;
    updatedStats[2].change = `${Number(cambioIngresos) >= 0 ? '+' : ''}${cambioIngresos}%`;
    
    updatedStats[3].value = `€${gastosTotales.toLocaleString()}`;
    updatedStats[3].change = `${Number(cambioGastos) >= 0 ? '+' : ''}${cambioGastos}%`;
    
    setStats(updatedStats);

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

    const updatedPieChartData = [{
      name: "Publicados",
      value: publicados,
      color: statusColors["Publicado"]
    }, {
      name: "En revisión",
      value: enRevision,
      color: statusColors["En revisión"]
    }, {
      name: "Borradores",
      value: borradores,
      color: statusColors["Borrador"]
    }, {
      name: "Archivados",
      value: archivados,
      color: statusColors["Archivado"]
    }];
    setPieChartData(updatedPieChartData);

    const updatedBarChartData = [{
      name: "Alto Contenido",
      value: altoContenido,
      color: contentColors["Alto Contenido"]
    }, {
      name: "Medio Contenido",
      value: medioContenido,
      color: contentColors["Medio Contenido"]
    }, {
      name: "Bajo Contenido",
      value: bajoContenido,
      color: contentColors["Bajo Contenido"]
    }];
    setBarChartData(updatedBarChartData);
  }, [libros, ingresosTotales, gastosTotales, cambioIngresos, cambioGastos]);

  return (
    <div className="p-4 animate-fade-in space-y-8">
      <MotionWrapper 
        type="fadeDown" 
        duration={0.5}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <MotionWrapper 
              key={index} 
              delay={0.1 * index}
              type="fadeUp"
            >
              <StatsCard 
                title={stat.title} 
                value={stat.value} 
                icon={<Icon size={20} />} 
                change={stat.change} 
              />
            </MotionWrapper>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <MotionWrapper delay={0.1} type="fadeLeft">
          <ContentCategoryCard 
            title="Alto Contenido" 
            description="Libros con más de 100 páginas" 
            color="bg-blue-500" 
            icon={<BookText size={20} className="text-white" />} 
            count={contentCategories[0].count} 
            statusData={contentCategories[0].statusData} 
          />
        </MotionWrapper>
        <MotionWrapper delay={0.2} type="fadeUp">
          <ContentCategoryCard 
            title="Medio Contenido" 
            description="Libros entre 30-100 páginas" 
            color="bg-orange-500" 
            icon={<BookMarked size={20} className="text-white" />} 
            count={contentCategories[1].count} 
            statusData={contentCategories[1].statusData} 
          />
        </MotionWrapper>
        <MotionWrapper delay={0.3} type="fadeRight">
          <ContentCategoryCard 
            title="Bajo Contenido" 
            description="Libros con menos de 30 páginas" 
            color="bg-green-500" 
            icon={<BookType size={20} className="text-white" />} 
            count={contentCategories[2].count} 
            statusData={contentCategories[2].statusData} 
          />
        </MotionWrapper>
      </div>

      <MotionWrapper type="fadeUp" delay={0.2}>
        <ApexLineChart
          title="Balance Mensual"
          description="Seguimiento de ingresos y gastos mensuales"
          data={financeData}
          series={[
            {
              name: "Ingresos",
              key: "ingresos",
              color: "#10B981"
            },
            {
              name: "Gastos",
              key: "gastos",
              color: "#EF4444"
            },
            {
              name: "Beneficio",
              key: "beneficio",
              color: "#3B82F6"
            }
          ]}
          height={350}
        />
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MotionWrapper type="fadeLeft" delay={0.2}>
          <ApexPieChart
            title="Distribución por Estado"
            description="Proporción de libros según su estado de publicación"
            data={pieChartData}
            totalLabel="Total libros"
            totalValue={libros.length}
          />
        </MotionWrapper>

        <MotionWrapper type="fadeRight" delay={0.3}>
          <ApexBarChart
            title="Distribución por Contenido"
            description="Libros distribuidos por longitud de contenido"
            data={barChartData}
          />
        </MotionWrapper>
      </div>

      <MotionWrapper type="fadeUp" delay={0.4}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BookOpen size={20} className="text-orange-500" />
              Libros Recientes
            </CardTitle>
            <CardDescription>
              Los últimos libros añadidos a tu biblioteca
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {libros.sort((a, b) => {
                return b.id - a.id;
              }).slice(0, 6).map((libro, index) => (
                <MotionWrapper 
                  key={libro.id} 
                  delay={0.1 * index}
                  type="scale"
                >
                  <BookCard 
                    index={index + 1} 
                    title={libro.titulo} 
                    author={libro.autor} 
                    contentLevel={libro.contenido} 
                    status={libro.estado} 
                    coverUrl={libro.imageUrl || "/placeholders/default-book-cover.png"} 
                    id={libro.id}
                  />
                </MotionWrapper>
              ))}
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
};

export default Dashboard;
