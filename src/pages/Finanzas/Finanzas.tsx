
import { useState, useCallback, useEffect } from "react";
import { useFinanceData } from "@/data/financesData";
import { FinanzasTabs } from "./components/FinanzasTabs";
import { FinanzasToolbar } from "./components/FinanzasToolbar";
import { ResumenTab } from "./components/tabs/ResumenTab";
import { CostesFijosTab } from "./components/tabs/CostesFijosTab";
import { IngresosFijosTab } from "./components/tabs/IngresosFijosTab";
import { Transaction } from "./types/finanzasTypes";
import { TransactionsTabContent } from "./components/tabs/TransactionsTabContent";
import { mapRecordsToTransactions } from "./utils/transactionUtils";

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const [periodView, setPeriodView] = useState("mensual");
  
  const { 
    resumenesMensuales,
    agregarRegistroFinanciero,
    getFilteredChartData,
    updateResumenesMensuales
  } = useFinanceData();

  // Get filtered chart data based on selected period
  const filteredChartData = useCallback(() => {
    return getFilteredChartData(periodView);
  }, [getFilteredChartData, periodView])();

  // Handle edit record with useCallback to prevent function recreation
  const handleEditRecord = useCallback((id: number, data: Partial<Transaction>) => {
    updateResumenesMensuales(
      resumenesMensuales.map(record => 
        record.id === id ? { 
          ...record, 
          ...data,
          mes: data.fecha ? data.fecha.toLocaleDateString() : record.mes,
          // Ensure beneficio is recalculated
          beneficio: (data.ingresos !== undefined ? data.ingresos : record.ingresos) - 
                    (data.gastos !== undefined ? data.gastos : record.gastos)
        } : record
      )
    );
  }, [resumenesMensuales, updateResumenesMensuales]);

  // Handle delete record with useCallback
  const handleDeleteRecord = useCallback((id: number) => {
    updateResumenesMensuales(resumenesMensuales.filter(record => record.id !== id));
  }, [resumenesMensuales, updateResumenesMensuales]);

  // Handle period change with proper useCallback
  const handlePeriodChange = useCallback((period: string) => {
    if (period !== periodView) {
      setPeriodView(period);
    }
  }, [periodView]);

  // Handle new record click with useCallback
  const handleNewRecordClick = useCallback(() => {
    if (activeTab === "resumen") {
      setActiveTab("ingresos");
    }
  }, [activeTab]);

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
        onNewRecordClick={handleNewRecordClick}
        periodView={periodView}
        onPeriodChange={handlePeriodChange}
      />

      {activeTab === "resumen" && (
        <ResumenTab periodView={periodView} onPeriodChange={handlePeriodChange} />
      )}
      
      {activeTab === "ingresos" && (
        <TransactionsTabContent
          title="Registrar Nuevo Ingreso"
          type="ingresos"
          records={mapRecordsToTransactions(
            Array.from(new Map(resumenesMensuales.filter(record => record.ingresos > 0)
              .map(item => [item.id, item])).values())
          )}
          filteredChartData={filteredChartData}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
          agregarRegistroFinanciero={agregarRegistroFinanciero}
        />
      )}

      {activeTab === "gastos" && (
        <TransactionsTabContent
          title="Registrar Nuevo Gasto"
          type="gastos"
          records={mapRecordsToTransactions(
            Array.from(new Map(resumenesMensuales.filter(record => record.gastos > 0)
              .map(item => [item.id, item])).values())
          )}
          filteredChartData={filteredChartData}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
          agregarRegistroFinanciero={agregarRegistroFinanciero}
        />
      )}

      {activeTab === "ingresosFijos" && <IngresosFijosTab />}
      {activeTab === "costesFijos" && <CostesFijosTab />}
    </div>
  );
};

export default Finanzas;
