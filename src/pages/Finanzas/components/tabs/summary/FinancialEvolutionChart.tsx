
import { useEffect, useState, useCallback } from "react";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { Button } from "@/components/ui/button";
import { formatPeriodDate } from "../../../utils/dateUtils";

interface FinancialEvolutionChartProps {
  lineChartData: any[];
  periodView?: string;
  onPeriodChange?: (period: string) => void;
}

export const FinancialEvolutionChart = ({ 
  lineChartData, 
  periodView = "mensual",
  onPeriodChange
}: FinancialEvolutionChartProps) => {
  const [activePeriod, setActivePeriod] = useState(periodView);
  
  useEffect(() => {
    setActivePeriod(periodView);
  }, [periodView]);

  // Use useCallback to prevent recreation on every render
  const handlePeriodChange = useCallback((period: string) => {
    setActivePeriod(period);
    if (onPeriodChange) {
      onPeriodChange(period);
    }
  }, [onPeriodChange]);

  return (
    <MotionWrapper type="fadeUp" delay={0.2}>
      <div className="rounded-lg border bg-card">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium mb-2 sm:mb-0">Evolución Financiera</h3>
          <div className="flex space-x-2">
            <Button 
              variant={activePeriod === "diario" ? "default" : "outline"} 
              size="sm"
              onClick={() => handlePeriodChange("diario")}
            >
              Diario
            </Button>
            <Button 
              variant={activePeriod === "semanal" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("semanal")}
            >
              Semanal
            </Button>
            <Button 
              variant={activePeriod === "mensual" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("mensual")}
            >
              Mensual
            </Button>
            <Button 
              variant={activePeriod === "anual" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("anual")}
            >
              Anual
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <ApexLineChart
            title=""
            description="Seguimiento de ingresos, gastos y beneficios"
            data={lineChartData.map(item => ({
              ...item,
              name: typeof item.name === 'string' ? item.name : formatPeriodDate(new Date(item.date || item.fecha || Date.now()), activePeriod)
            }))}
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
        </div>
      </div>
    </MotionWrapper>
  );
};
