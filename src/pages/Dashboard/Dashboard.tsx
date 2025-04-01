
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
  PieChart
} from "lucide-react";

const Dashboard = () => {
  const stats = getStatsData();
  const contentCategories = getContentCategoriesData();
  const pieChartData = getPieChartData();
  const barChartData = getBarChartData();
  const lineChartData = getLineChartData();

  return (
    <div className="p-4 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {contentCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <ContentCategoryCard
              key={index}
              title={category.title}
              description={category.description}
              color={category.color}
              icon={<Icon size={20} className={`text-${category.color.replace('bg-', '')}`} />}
              count={category.count}
              statusData={category.statusData}
            />
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <LineChart size={20} className="text-primary" />
          <h2 className="font-heading text-lg font-medium">Balance Mensual</h2>
        </div>
        <LineChartCard
          title="Balance Mensual"
          description="Seguimiento de ingresos y gastos mensuales"
          data={lineChartData}
          chartConfig={CHART_CONFIG}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PieChart size={20} className="text-green-500" />
            <h2 className="font-heading text-lg font-medium">Distribución por Estado</h2>
          </div>
          <PieChartCard
            title="Distribución por Estado"
            description="Proporción de libros según su estado de publicación"
            data={pieChartData}
            chartConfig={CHART_CONFIG}
            totalLabel="Total libros"
            totalValue={2}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={20} className="text-blue-500" />
            <h2 className="font-heading text-lg font-medium">Distribución por Contenido</h2>
          </div>
          <BarChartCard
            title="Distribución por Contenido"
            description="Libros distribuidos por longitud de contenido"
            data={barChartData}
            chartConfig={CHART_CONFIG}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-orange-500" />
          <h2 className="font-heading text-lg font-medium">Libros Recientes</h2>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2].map((index) => (
            <BookCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
