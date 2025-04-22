
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface GeneralStatsProps {
  ingresosTotales: number;
  gastosTotales: number;
  beneficioNeto: number;
  cambioIngresos: string;
  cambioGastos: string;
  cambioBeneficio: string;
  ingresosFijosMensuales: number;
  costesFijosMensuales: number;
  resumenesMensualesLength: number;
}

export const GeneralStats = ({
  ingresosTotales,
  gastosTotales,
  beneficioNeto,
  cambioIngresos,
  cambioGastos,
  cambioBeneficio,
  ingresosFijosMensuales,
  costesFijosMensuales,
  resumenesMensualesLength
}: GeneralStatsProps) => {
  const stats = [
    { 
      title: "Ingresos Totales", 
      value: `€${(ingresosTotales + ingresosFijosMensuales * resumenesMensualesLength).toLocaleString()}`, 
      change: `${Number(cambioIngresos) >= 0 ? '+' : ''}${cambioIngresos}%`, 
      icon: <TrendingUp size={20} />,
      color: "text-green-500"
    },
    { 
      title: "Gastos Totales", 
      value: `€${(gastosTotales + costesFijosMensuales * resumenesMensualesLength).toLocaleString()}`, 
      change: `${Number(cambioGastos) >= 0 ? '+' : ''}${cambioGastos}%`, 
      icon: <TrendingDown size={20} />,
      color: "text-red-500"
    },
    { 
      title: "Beneficio Neto", 
      value: `€${(beneficioNeto + (ingresosFijosMensuales - costesFijosMensuales) * resumenesMensualesLength).toLocaleString()}`, 
      change: `${Number(cambioBeneficio) >= 0 ? '+' : ''}${cambioBeneficio}%`, 
      icon: <DollarSign size={20} />,
      color: "text-blue-500"
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
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
  );
};
