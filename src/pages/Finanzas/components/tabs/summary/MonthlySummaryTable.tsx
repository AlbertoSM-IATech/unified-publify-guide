
import { FinancialRecord } from "../../../types/dataTypes";
import { isCurrentMonth } from "../../../utils/dateUtils";

interface MonthlySummaryTableProps {
  resumenesMensuales: FinancialRecord[];
}

export const MonthlySummaryTable = ({ resumenesMensuales }: MonthlySummaryTableProps) => (
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
