
import { useState } from "react";
import { getStatsData } from "@/components/dashboard/dashboardData";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { DashboardStats } from "./components/DashboardStats";
import { ContentCategories } from "./components/ContentCategories";
import { DashboardCharts } from "./components/DashboardCharts";
import { RecentBooks } from "./components/RecentBooks";
import { ApexLineChart } from "@/components/charts";
import { ChartErrorFallback } from "@/components/common/ChartErrorFallback"; // Import common fallback
import { useDashboardPageData } from "./hooks/useDashboardPageData";
import { useFinancialLineChart } from "./hooks/useFinancialLineChart";

export const Dashboard = () => {
  const [stats, setStats] = useState(getStatsData());
  
  const { 
    librosCount, 
    contentCategories, 
    pieChartData, 
    barChartData 
  } = useDashboardPageData();
  
  const { 
    lineChartData, 
    lineChartError, 
    handleLineChartError 
  } = useFinancialLineChart();

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
        librosCount={librosCount} 
      />

      <ContentCategories contentCategories={contentCategories} />

      <DashboardCharts 
        pieChartData={pieChartData}
        barChartData={barChartData}
        librosCount={librosCount}
      />

      <RecentBooks />

      <MotionWrapper type="fadeUp" delay={0.2}>
        {lineChartError ? (
          <ChartErrorFallback title="Balance Mensual" height="350px" />
        ) : (
          <ApexLineChart
            title="Balance Mensual"
            description="Seguimiento de ingresos y gastos mensuales (incluye fijos)"
            data={lineChartData}
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
