
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useFinanceData } from "@/data/financesData";
import { Card } from "@/components/ui/card";

export const ResumenTab = () => {
  const { 
    resumenesMensuales, 
    lineChartData,
    ingresosTotales,
    gastosTotales,
    beneficioNeto,
    cambioIngresos,
    cambioGastos,
    cambioBeneficio
  } = useFinanceData();

  return (
    <div className="space-y-6">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { 
            title: "Ingresos Totales", 
            value: `€${ingresosTotales.toLocaleString()}`, 
            change: `${Number(cambioIngresos) >= 0 ? '+' : ''}${cambioIngresos}%`, 
            icon: <TrendingUp size={20} />,
            color: "text-green-500"
          },
          { 
            title: "Gastos Totales", 
            value: `€${gastosTotales.toLocaleString()}`, 
            change: `${Number(cambioGastos) >= 0 ? '+' : ''}${cambioGastos}%`, 
            icon: <TrendingDown size={20} />,
            color: "text-red-500"
          },
          { 
            title: "Beneficio Neto", 
            value: `€${beneficioNeto.toLocaleString()}`, 
            change: `${Number(cambioBeneficio) >= 0 ? '+' : ''}${cambioBeneficio}%`, 
            icon: <DollarSign size={20} />,
            color: "text-blue-500"
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="card-hover rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full bg-opacity-10 p-2 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">
              <span className={stat.color}>{stat.change}</span>
              <span className="ml-1 text-muted-foreground">desde el período anterior</span>
            </div>
          </div>
        ))}
      </div>

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

      <MonthlySummaryTable resumenesMensuales={resumenesMensuales} />
    </div>
  );
};

const MonthlySummaryTable = ({ resumenesMensuales }) => (
  <div className="rounded-lg border bg-card shadow-sm">
    <div className="p-4">
      <h2 className="font-heading text-lg font-medium">Resumen Mensual</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Mes
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Ingresos
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Gastos
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Beneficio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {resumenesMensuales.map((resumen, index) => (
            <tr key={index} className="hover:bg-muted/50">
              <td className="whitespace-nowrap px-4 py-4 font-medium">
                {resumen.mes}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-green-500">
                €{resumen.ingresos.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-red-500">
                €{resumen.gastos.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-blue-500">
                €{resumen.beneficio.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
