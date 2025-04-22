
import { useEffect } from 'react';
import StatsCard from "@/components/dashboard/StatsCard";
import { StatItem } from "@/components/dashboard/dashboardData";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { useFinanceData } from "@/data/financesData";

interface DashboardStatsProps {
  stats: StatItem[];
  setStats: (stats: StatItem[]) => void;
  librosCount: number;
}

export const DashboardStats = ({ stats, setStats, librosCount }: DashboardStatsProps) => {
  const { ingresosTotales, gastosTotales, cambioIngresos, cambioGastos } = useFinanceData();

  useEffect(() => {
    const updatedStats = [...stats];
    updatedStats[0].value = librosCount.toString();
    updatedStats[2].value = `€${ingresosTotales.toLocaleString()}`;
    updatedStats[2].change = `${Number(cambioIngresos) >= 0 ? '+' : ''}${cambioIngresos}%`;
    updatedStats[3].value = `€${gastosTotales.toLocaleString()}`;
    updatedStats[3].change = `${Number(cambioGastos) >= 0 ? '+' : ''}${cambioGastos}%`;
    setStats(updatedStats);
  }, [librosCount, ingresosTotales, gastosTotales, cambioIngresos, cambioGastos]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <MotionWrapper key={index} delay={0.1 * index} type="fadeUp">
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
  );
};
