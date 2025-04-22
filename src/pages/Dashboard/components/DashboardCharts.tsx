
import React, { useState, useCallback, useMemo } from "react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { ApexLineChart, ApexPieChart, ApexBarChart } from "@/components/charts";
import { useFinanceData } from "@/data/financesData";
import { ChartItem } from "@/components/dashboard/dashboardData";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatPeriodDate } from "@/pages/Finanzas/utils/dateUtils";

interface DashboardChartsProps {
  pieChartData: ChartItem[];
  barChartData: ChartItem[];
  librosCount: number;
}

export const DashboardCharts = ({ pieChartData, barChartData, librosCount }: DashboardChartsProps) => {
  const { getFilteredChartData } = useFinanceData();
  const [chartErrors, setChartErrors] = useState({
    line: false,
    pie: false,
    bar: false
  });

  // Get chart data for the monthly view by default
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

  // Error handler function for charts
  const handleChartError = useCallback((chartType: 'line' | 'pie' | 'bar') => {
    setChartErrors(prev => ({ ...prev, [chartType]: true }));
    console.error(`Error rendering ${chartType} chart`);
  }, []);

  // Fallback component for chart errors
  const ErrorFallback = ({ title }: { title: string }) => (
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

  return (
    <>
      <MotionWrapper type="fadeUp" delay={0.2}>
        {chartErrors.line ? (
          <ErrorFallback title="Balance Mensual" />
        ) : (
          <ApexLineChart
            title="Balance Mensual"
            description="Seguimiento de ingresos y gastos mensuales"
            data={validLineChartData}
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
        )}
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MotionWrapper type="fadeLeft" delay={0.2}>
          {chartErrors.pie ? (
            <ErrorFallback title="Distribución por Estado" />
          ) : (
            <ApexPieChart
              title="Distribución por Estado"
              description="Proporción de libros según su estado de publicación"
              data={pieChartData}
              totalLabel="Total libros"
              totalValue={librosCount}
              showLegend={false}
            />
          )}
        </MotionWrapper>

        <MotionWrapper type="fadeRight" delay={0.3}>
          {chartErrors.bar ? (
            <ErrorFallback title="Distribución por Contenido" />
          ) : (
            <ApexBarChart
              title="Distribución por Contenido"
              description="Libros distribuidos por longitud de contenido"
              data={barChartData}
            />
          )}
        </MotionWrapper>
      </div>
    </>
  );
};
