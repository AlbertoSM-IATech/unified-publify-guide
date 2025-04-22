
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { useFinanceData } from "@/data/financesData";
import { Card } from "@/components/ui/card";
import { isCurrentMonth, getCurrentMonth } from "../../utils/dateUtils";

export const ResumenTab = () => {
  const { 
    resumenesMensuales, 
    lineChartData,
    ingresosTotales,
    gastosTotales,
    beneficioNeto,
    cambioIngresos,
    cambioGastos,
    cambioBeneficio,
    costesFijos,
    ingresosFijos
  } = useFinanceData();

  // Calculate fixed monthly costs
  const costesFijosMensuales = costesFijos.reduce((total, coste) => {
    if (coste.frecuencia === "Mensual") return total + coste.coste;
    if (coste.frecuencia === "Trimestral") return total + (coste.coste / 3);
    if (coste.frecuencia === "Anual") return total + (coste.coste / 12);
    return total;
  }, 0);

  // Calculate fixed monthly income
  const ingresosFijosMensuales = ingresosFijos.reduce((total, ingreso) => {
    if (ingreso.frecuencia === "Mensual") return total + ingreso.cantidad;
    if (ingreso.frecuencia === "Trimestral") return total + (ingreso.cantidad / 3);
    if (ingreso.frecuencia === "Anual") return total + (ingreso.cantidad / 12);
    return total;
  }, 0);

  // Filter current month records
  const currentMonthName = getCurrentMonth();
  const currentMonthRecord = resumenesMensuales.find(record => record.mes === currentMonthName);
  
  // Calculate current month values
  const currentMonthIngresos = (currentMonthRecord?.ingresos || 0) + ingresosFijosMensuales;
  const currentMonthGastos = (currentMonthRecord?.gastos || 0) + costesFijosMensuales;
  const currentMonthBeneficio = currentMonthIngresos - currentMonthGastos;

  return (
    <div className="space-y-6">
      {/* Current Month Summary */}
      <div className="rounded-md border bg-card">
        <div className="flex items-center gap-2 p-4 border-b">
          <Calendar size={18} />
          <h3 className="text-lg font-medium">Resumen del Mes Actual ({currentMonthName})</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="rounded-lg bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Ingresos</h4>
              <div className="rounded-full bg-green-500 bg-opacity-10 p-2 text-green-500">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">€{currentMonthIngresos.toFixed(2)}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="mr-1 text-green-500">+{ingresosFijosMensuales.toFixed(2)}€</span>
              <span className="text-muted-foreground">ingresos fijos</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Gastos</h4>
              <div className="rounded-full bg-red-500 bg-opacity-10 p-2 text-red-500">
                <TrendingDown size={16} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">€{currentMonthGastos.toFixed(2)}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="mr-1 text-red-500">+{costesFijosMensuales.toFixed(2)}€</span>
              <span className="text-muted-foreground">costes fijos</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Balance</h4>
              <div className="rounded-full bg-blue-500 bg-opacity-10 p-2 text-blue-500">
                <DollarSign size={16} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold">€{currentMonthBeneficio.toFixed(2)}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className={currentMonthBeneficio >= 0 ? "text-green-500" : "text-red-500"}>
                {currentMonthBeneficio >= 0 ? "Beneficio" : "Pérdida"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* General Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { 
            title: "Ingresos Totales", 
            value: `€${(ingresosTotales + ingresosFijosMensuales * resumenesMensuales.length).toLocaleString()}`, 
            change: `${Number(cambioIngresos) >= 0 ? '+' : ''}${cambioIngresos}%`, 
            icon: <TrendingUp size={20} />,
            color: "text-green-500"
          },
          { 
            title: "Gastos Totales", 
            value: `€${(gastosTotales + costesFijosMensuales * resumenesMensuales.length).toLocaleString()}`, 
            change: `${Number(cambioGastos) >= 0 ? '+' : ''}${cambioGastos}%`, 
            icon: <TrendingDown size={20} />,
            color: "text-red-500"
          },
          { 
            title: "Beneficio Neto", 
            value: `€${(beneficioNeto + (ingresosFijosMensuales - costesFijosMensuales) * resumenesMensuales.length).toLocaleString()}`, 
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
            <tr key={index} className={`hover:bg-muted/50 ${isCurrentMonth(resumen.mes) ? 'bg-primary/5' : ''}`}>
              <td className="whitespace-nowrap px-4 py-4 font-medium">
                {resumen.mes} {isCurrentMonth(resumen.mes) && <span className="text-xs text-muted-foreground">(Actual)</span>}
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
