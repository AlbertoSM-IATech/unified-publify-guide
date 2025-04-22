
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/data/financesData";
import { FinanzasTabs } from "./components/FinanzasTabs";
import { FinanzasToolbar } from "./components/FinanzasToolbar";
import { ResumenTab } from "./components/tabs/ResumenTab";
import { FinancialRecordForm } from "./components/FinancialRecordForm";
import { NuevoRegistro } from "./types/finanzasTypes";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const { toast } = useToast();
  const { 
    resumenesMensuales,
    lineChartData,
    agregarRegistroFinanciero
  } = useFinanceData();

  const [nuevoRegistro, setNuevoRegistro] = useState<NuevoRegistro>({
    mes: "",
    ingresos: 0,
    gastos: 0
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof NuevoRegistro
  ) => {
    const value = field === "mes" ? e.target.value : Number(e.target.value);
    setNuevoRegistro({ ...nuevoRegistro, [field]: value });
  };

  const handleSubmitRegistro = () => {
    if (!nuevoRegistro.mes) {
      toast({ 
        title: "Error", 
        description: "El mes es obligatorio", 
        variant: "destructive" 
      });
      return;
    }

    agregarRegistroFinanciero(nuevoRegistro);
    setNuevoRegistro({ mes: "", ingresos: 0, gastos: 0 });
    toast({
      title: "Registro guardado",
      description: `Se ha añadido el registro para ${nuevoRegistro.mes}`,
    });
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
      <FinanzasToolbar onNewRecordClick={() => setActiveTab("ingresos")} />

      {activeTab === "resumen" && <ResumenTab />}

      {activeTab === "ingresos" && (
        <div className="space-y-6">
          <FinancialRecordForm
            title="Registrar Nuevo Ingreso"
            record={nuevoRegistro}
            onChange={handleInputChange}
            onSubmit={handleSubmitRegistro}
          />

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title="Evolución de Ingresos"
              description="Seguimiento mensual de ingresos"
              data={lineChartData}
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
        </div>
      )}

      {activeTab === "gastos" && (
        <div className="space-y-6">
          <FinancialRecordForm
            title="Registrar Nuevo Gasto"
            record={nuevoRegistro}
            onChange={handleInputChange}
            onSubmit={handleSubmitRegistro}
          />

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title="Evolución de Gastos"
              description="Seguimiento mensual de gastos"
              data={lineChartData}
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
        </div>
      )}
    </div>
  );
};

export default Finanzas;
