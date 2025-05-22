
import React, { useState, useCallback } from "react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { ApexPieChart, ApexBarChart } from "@/components/charts";
import { ChartItem } from "@/components/dashboard/dashboardData";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardChartsProps {
  pieChartData: ChartItem[];
  barChartData: ChartItem[];
  librosCount: number;
}

export const DashboardCharts = ({ pieChartData, barChartData }: DashboardChartsProps) => {
  const [chartErrors, setChartErrors] = useState({
    pie: false,
    bar: false
  });

  // Error handler function for charts
  const handleChartError = useCallback((chartType: 'pie' | 'bar') => {
    setChartErrors(prev => ({ ...prev, [chartType]: true }));
    console.error(`Error rendering ${chartType} chart`);
  }, []);

  // Calculate the actual values from the pieChartData array to display correct totals
  const totalBooks = pieChartData.reduce((sum, item) => sum + item.value, 0);
  
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
      {/* Line chart has been moved to Dashboard.tsx */}
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
              totalValue={totalBooks}
              showLegend={false}
              onError={() => handleChartError('pie')}
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
              onError={() => handleChartError('bar')}
            />
          )}
        </MotionWrapper>
      </div>
    </>
  );
};

