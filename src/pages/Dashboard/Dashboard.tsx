
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

const Dashboard = () => {
  const stats = getStatsData();
  const contentCategories = getContentCategoriesData();
  const pieChartData = getPieChartData();
  const barChartData = getBarChartData();
  const lineChartData = getLineChartData();

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
        <CardHeader className="flex flex-row items-center justify-between pb-2">
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
        <CardContent className="pb-4">
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
          <CardHeader className="flex flex-row items-center justify-between pb-2">
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
          <CardContent className="pb-4">
            <div className="h-[350px]">
              <PieChartCard
                title="Distribución por Estado"
                description="Proporción de libros según su estado de publicación"
                data={pieChartData}
                chartConfig={CHART_CONFIG}
                totalLabel="Total libros"
                totalValue={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
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
          <CardContent className="pb-4">
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

      {/* Recent Books - 4 columnas en desktop, 2 en tablet, 1 en móvil */}
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
        <CardContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2].map((index) => (
              <BookCard key={index} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
