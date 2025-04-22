
import MotionWrapper from "@/components/motion/MotionWrapper";
import { ApexLineChart, ApexPieChart, ApexBarChart } from "@/components/charts";
import { useFinanceData } from "@/data/financesData";
import { ChartItem } from "@/components/dashboard/dashboardData";

interface DashboardChartsProps {
  pieChartData: ChartItem[];
  barChartData: ChartItem[];
  librosCount: number;
}

export const DashboardCharts = ({ pieChartData, barChartData, librosCount }: DashboardChartsProps) => {
  const { lineChartData } = useFinanceData();

  // Ensure lineChartData is valid
  const validLineChartData = Array.isArray(lineChartData) && lineChartData.length > 0 
    ? lineChartData 
    : [{ name: 'No data', ingresos: 0, gastos: 0, beneficio: 0 }];

  return (
    <>
      <MotionWrapper type="fadeUp" delay={0.2}>
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
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MotionWrapper type="fadeLeft" delay={0.2}>
          <ApexPieChart
            title="Distribución por Estado"
            description="Proporción de libros según su estado de publicación"
            data={pieChartData}
            totalLabel="Total libros"
            totalValue={librosCount}
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
    </>
  );
};
