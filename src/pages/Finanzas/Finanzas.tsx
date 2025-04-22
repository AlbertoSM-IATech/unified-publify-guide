
import { useState } from "react";
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

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const { toast } = useToast();
  const { 
    resumenesMensuales,
    lineChartData,
    agregarRegistroFinanciero
  } = useFinanceData();

  const [nuevoRegistro, setNuevoRegistro] = useState<NuevoRegistro>({
    mes: getCurrentMonth(),
    ingresos: 0,
    gastos: 0,
    concepto: "",
    observaciones: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof NuevoRegistro
  ) => {
    const value = field === "ingresos" || field === "gastos" 
      ? Number(e.target.value) 
      : e.target.value;
      
    setNuevoRegistro({ ...nuevoRegistro, [field]: value });
  };

  const handleSelectChange = (field: keyof NuevoRegistro, value: string) => {
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

    if (!nuevoRegistro.concepto) {
      toast({ 
        title: "Error", 
        description: "El concepto es obligatorio", 
        variant: "destructive" 
      });
      return;
    }

    agregarRegistroFinanciero(nuevoRegistro);
    
    setNuevoRegistro({ 
      mes: getCurrentMonth(), 
      ingresos: 0, 
      gastos: 0,
      concepto: "",
      observaciones: ""
    });
    
    toast({
      title: "Registro guardado",
      description: `Se ha añadido el registro de ${nuevoRegistro.concepto} para ${nuevoRegistro.mes}`,
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
      <FinanzasToolbar onNewRecordClick={() => {
        // Redirect to the tab corresponding to the type of record the user might want to add
        if (activeTab === "resumen") {
          setActiveTab("ingresos");
        }
      }} />

      {activeTab === "resumen" && <ResumenTab />}

      {activeTab === "ingresos" && (
        <div className="space-y-6">
          <FinancialRecordForm
            title="Registrar Nuevo Ingreso"
            record={{ ...nuevoRegistro, gastos: 0 }}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
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
            record={{ ...nuevoRegistro, ingresos: 0 }}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
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

      {activeTab === "ingresosFijos" && <IngresosFijosTab />}
      
      {activeTab === "costesFijos" && <CostesFijosTab />}
    </div>
  );
};

export default Finanzas;
