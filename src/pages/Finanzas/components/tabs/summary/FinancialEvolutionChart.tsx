
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";

interface FinancialEvolutionChartProps {
  lineChartData: any[];
}

export const FinancialEvolutionChart = ({ lineChartData }: FinancialEvolutionChartProps) => {
  return (
    <MotionWrapper type="fadeUp" delay={0.2}>
      <ApexLineChart
        title="Evolución Financiera"
        description="Seguimiento de ingresos, gastos y beneficios mensuales"
        data={lineChartData}
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
  );
};
