import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/data/financesData";
import { FinanzasTabs } from "./components/FinanzasTabs";
import { FinanzasToolbar } from "./components/FinanzasToolbar";
import { ResumenTab } from "./components/tabs/ResumenTab";
import { CostesFijosTab } from "./components/tabs/CostesFijosTab";
import { IngresosFijosTab } from "./components/tabs/IngresosFijosTab";
import { FinancialRecordForm } from "./components/FinancialRecordForm";
import { NuevoRegistro } from "./types/finanzasTypes";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { getCurrentMonth } from "./utils/dateUtils";
import { TransactionsList } from "./components/TransactionsList";
import { FinancialRecord } from "@/data/financesData";
import { Transaction } from "./types/finanzasTypes";

// Define a utility function to transform FinancialRecord to Transaction
const mapRecordsToTransactions = (records: FinancialRecord[]) => {
  return records.map(record => ({
    id: record.id,
    fecha: new Date(record.mes), // Assuming 'mes' can be parsed as a date
    concepto: record.concepto || "Sin concepto", // Ensure concepto is never undefined
    ingresos: record.ingresos,
    gastos: record.gastos,
    observaciones: record.observaciones
  }));
};

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const [periodView, setPeriodView] = useState("mensual");
  const { toast } = useToast();
  const { 
    resumenesMensuales,
    lineChartData,
    agregarRegistroFinanciero,
    getFilteredChartData,
    setResumenesMensuales
  } = useFinanceData();

  const [nuevoRegistro, setNuevoRegistro] = useState<NuevoRegistro>({
    fecha: new Date(),
    ingresos: 0,
    gastos: 0,
    concepto: "",
    observaciones: ""
  });

  // Get filtered chart data based on selected period
  const filteredChartData = getFilteredChartData(periodView);

  // Filter transactions for current month
  const currentMonthTransactions = resumenesMensuales.filter(
    record => record.mes === getCurrentMonth()
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<NuevoRegistro, 'fecha'>
  ) => {
    const value = field === "ingresos" || field === "gastos" 
      ? Number(e.target.value) 
      : e.target.value;
      
    setNuevoRegistro({ ...nuevoRegistro, [field]: value });
  };

  // Handle edit record
  const handleEditRecord = (id: number, data: Partial<Transaction>) => {
    const updatedRecords = resumenesMensuales.map(record => 
      record.id === id ? { ...record, ...data } : record
    );
    // Update records through useFinanceData hook
    setResumenesMensuales(updatedRecords);
  };

  // Handle delete record
  const handleDeleteRecord = (id: number) => {
    const filteredRecords = resumenesMensuales.filter(record => record.id !== id);
    // Update records through useFinanceData hook
    setResumenesMensuales(filteredRecords);
  };

  const handleDateChange = (date: Date) => {
    setNuevoRegistro(prev => ({ ...prev, fecha: date }));
  };

  const handleSelectChange = (field: keyof Omit<NuevoRegistro, 'fecha'>, value: string) => {
    setNuevoRegistro({ ...nuevoRegistro, [field]: value });
  };

  const handleSubmitRegistro = () => {
    if (!nuevoRegistro.fecha) {
      toast({ 
        title: "Error", 
        description: "La fecha es obligatoria", 
        variant: "destructive" 
      });
      return;
    }

    if (!nuevoRegistro.concepto) {
      toast({ 
        title: "Error", 
        description: "El concepto es obligatorio", 
        variant: "destructive" 
      });
      return;
    }

    agregarRegistroFinanciero({
      ...nuevoRegistro,
      mes: nuevoRegistro.fecha.toLocaleDateString()
    });
    
    setNuevoRegistro({ 
      fecha: new Date(),
      ingresos: 0, 
      gastos: 0,
      concepto: "",
      observaciones: ""
    });
    
    toast({
      title: "Registro guardado",
      description: `Se ha añadido el registro de ${nuevoRegistro.concepto} para ${nuevoRegistro.fecha.toLocaleDateString()}`,
    });
  };

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setPeriodView(period);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Finanzas</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tus ingresos, gastos y análisis financiero
        </p>
      </div>

      <FinanzasTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FinanzasToolbar 
        onNewRecordClick={() => {
          // Redirect to the tab corresponding to the type of record the user might want to add
          if (activeTab === "resumen") {
            setActiveTab("ingresos");
          }
        }}
        periodView={periodView}
        onPeriodChange={handlePeriodChange}
      />

      {activeTab === "resumen" && <ResumenTab />}

      {activeTab === "ingresos" && (
        <div className="space-y-6">
          <FinancialRecordForm
            title="Registrar Nuevo Ingreso"
            record={{ ...nuevoRegistro, gastos: 0 }}
            onChange={handleInputChange}
            onDateChange={handleDateChange}
            onSubmit={handleSubmitRegistro}
          />

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title={`Evolución de Ingresos (${periodView})`}
              description={`Seguimiento ${periodView} de ingresos`}
              data={filteredChartData}
              series={[
                {
                  name: "Ingresos",
                  key: "ingresos",
                  color: "#10B981"
                }
              ]}
              height={350}
            />
          </MotionWrapper>

          <MotionWrapper type="fadeUp" delay={0.3}>
            <TransactionsList 
              transactions={mapRecordsToTransactions(
                // Remove duplicates by ID before mapping
                Array.from(new Map(resumenesMensuales.filter(record => record.ingresos > 0)
                  .map(item => [item.id, item])).values())
              )}
              title="Historial de Ingresos"
              type="ingresos"
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
            />
          </MotionWrapper>
        </div>
      )}

      {activeTab === "gastos" && (
        <div className="space-y-6">
          <FinancialRecordForm
            title="Registrar Nuevo Gasto"
            record={{ ...nuevoRegistro, ingresos: 0 }}
            onChange={handleInputChange}
            onDateChange={handleDateChange}
            onSubmit={handleSubmitRegistro}
          />

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title={`Evolución de Gastos (${periodView})`}
              description={`Seguimiento ${periodView} de gastos`}
              data={filteredChartData}
              series={[
                {
                  name: "Gastos",
                  key: "gastos",
                  color: "#EF4444"
                }
              ]}
              height={350}
            />
          </MotionWrapper>

          <MotionWrapper type="fadeUp" delay={0.3}>
            <TransactionsList 
              transactions={mapRecordsToTransactions(
                // Remove duplicates by ID before mapping
                Array.from(new Map(resumenesMensuales.filter(record => record.gastos > 0)
                  .map(item => [item.id, item])).values())
              )}
              title="Historial de Gastos"
              type="gastos"
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
            />
          </MotionWrapper>
        </div>
      )}

      {activeTab === "ingresosFijos" && <IngresosFijosTab />}
      
      {activeTab === "costesFijos" && <CostesFijosTab />}
    </div>
  );
};

export default Finanzas;
