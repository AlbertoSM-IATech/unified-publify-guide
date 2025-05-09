
import { FinancialRecordForm } from "../FinancialRecordForm";
import { TransactionsList } from "../TransactionsList";
import { Transaction } from "../../types/finanzasTypes";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { useFinancialForm } from "../../hooks/useFinancialForm";
import { FinancialRecord } from "../../types/dataTypes";
import { useMemo } from "react";

interface TransactionsTabContentProps {
  title: string;
  type: "ingresos" | "gastos";
  records: Transaction[];
  filteredChartData: any[];
  onEdit: (id: number, data: Partial<Transaction>) => void;
  onDelete: (id: number) => void;
  agregarRegistroFinanciero: (registro: any) => void;
}

export const TransactionsTabContent = ({
  title,
  type,
  records,
  filteredChartData,
  onEdit,
  onDelete,
  agregarRegistroFinanciero
}: TransactionsTabContentProps) => {
  const {
    nuevoRegistro,
    handleInputChange,
    handleDateChange,
    handleSubmitRegistro
  } = useFinancialForm(agregarRegistroFinanciero);

  // Filtrar los datos del gráfico para mostrar solo el tipo de transacción actual
  const chartData = useMemo(() => {
    return filteredChartData.map(item => ({
      ...item,
      // Solo mantener la serie que corresponde al tipo actual (ingresos o gastos)
      // y poner a cero el otro tipo
      ingresos: type === "ingresos" ? item.ingresos : 0,
      gastos: type === "gastos" ? item.gastos : 0,
      // Establecer el beneficio basado en el tipo actual
      beneficio: type === "ingresos" ? item.ingresos : -item.gastos
    }));
  }, [filteredChartData, type]);

  return (
    <div className="space-y-6">
      <FinancialRecordForm
        title={title}
        record={type === "gastos" ? { ...nuevoRegistro, ingresos: 0 } : { ...nuevoRegistro, gastos: 0 }}
        onChange={handleInputChange}
        onDateChange={handleDateChange}
        onSubmit={handleSubmitRegistro}
      />

      <MotionWrapper type="fadeUp" delay={0.2}>
        <ApexLineChart
          title={`Evolución de ${type === "ingresos" ? "Ingresos" : "Gastos"}`}
          description={`Seguimiento de ${type} ${type === "ingresos" || type === "gastos" ? "(incluye fijos)" : ""}`}
          data={chartData}
          series={[
            {
              name: type === "ingresos" ? "Ingresos" : "Gastos",
              key: type,
              color: type === "ingresos" ? "#10B981" : "#EF4444"
            }
          ]}
          height={350}
        />
      </MotionWrapper>

      <MotionWrapper type="fadeUp" delay={0.3}>
        <TransactionsList 
          transactions={records}
          title={`Historial de ${type === "ingresos" ? "Ingresos" : "Gastos"}`}
          type={type}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </MotionWrapper>
    </div>
  );
};
