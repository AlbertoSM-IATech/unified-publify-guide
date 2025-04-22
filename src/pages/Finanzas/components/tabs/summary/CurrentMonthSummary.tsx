
import { Calendar } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CurrentMonthSummaryProps {
  currentMonthName: string;
  currentMonthIngresos: number;
  currentMonthGastos: number;
  currentMonthBeneficio: number;
  ingresosFijosMensuales: number;
  costesFijosMensuales: number;
}

export const CurrentMonthSummary = ({
  currentMonthName,
  currentMonthIngresos,
  currentMonthGastos,
  currentMonthBeneficio,
  ingresosFijosMensuales,
  costesFijosMensuales
}: CurrentMonthSummaryProps) => {
  return (
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
              <TrendingDown size={16} />
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
  );
};
