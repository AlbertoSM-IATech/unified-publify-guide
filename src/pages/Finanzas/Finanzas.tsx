
import { useState } from "react";
import { 
  Upload, PieChart, BarChart, Calculator, 
  TrendingUp, TrendingDown, DollarSign, FilePlus2,
  Save, X
} from "lucide-react";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";
import { useFinanceData } from "@/data/financesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const { 
    resumenesMensuales, 
    costesFijos,
    lineChartData, 
    ingresosTotales, 
    gastosTotales, 
    beneficioNeto,
    cambioIngresos,
    cambioGastos,
    cambioBeneficio,
    agregarRegistroFinanciero,
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo
  } = useFinanceData();

  const { toast } = useToast();

  // Estados para formularios
  const [nuevoRegistro, setNuevoRegistro] = useState({
    mes: "",
    ingresos: 0,
    gastos: 0
  });
  const [nuevoCosteFijo, setNuevoCosteFijo] = useState({
    concepto: "",
    coste: 0,
    frecuencia: "Mensual" as "Mensual" | "Trimestral" | "Anual"
  });
  const [editandoCosteFijo, setEditandoCosteFijo] = useState<number | null>(null);

  // Manejadores para formularios
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    campo: string, 
    tipo: "registro" | "costeFijo"
  ) => {
    const value = e.target.name === "mes" ? e.target.value : Number(e.target.value);
    if (tipo === "registro") {
      setNuevoRegistro({ ...nuevoRegistro, [campo]: value });
    } else {
      setNuevoCosteFijo({ ...nuevoCosteFijo, [campo]: value });
    }
  };

  const handleFrecuenciaChange = (value: string) => {
    setNuevoCosteFijo({ 
      ...nuevoCosteFijo, 
      frecuencia: value as "Mensual" | "Trimestral" | "Anual" 
    });
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

    // No need to calculate beneficio here, it's handled in useFinanceData
    agregarRegistroFinanciero(nuevoRegistro);
    setNuevoRegistro({ mes: "", ingresos: 0, gastos: 0 });
    toast({
      title: "Registro añadido",
      description: `Se ha añadido el registro para ${nuevoRegistro.mes}`,
    });
  };

  const handleSubmitCosteFijo = () => {
    if (!nuevoCosteFijo.concepto) {
      toast({ 
        title: "Error", 
        description: "El concepto es obligatorio", 
        variant: "destructive" 
      });
      return;
    }

    if (editandoCosteFijo !== null) {
      editarCosteFijo(editandoCosteFijo, nuevoCosteFijo);
      toast({
        title: "Coste fijo actualizado",
        description: `Se ha actualizado el coste fijo ${nuevoCosteFijo.concepto}`,
      });
    } else {
      agregarCosteFijo(nuevoCosteFijo);
      toast({
        title: "Coste fijo añadido",
        description: `Se ha añadido el coste fijo ${nuevoCosteFijo.concepto}`,
      });
    }
    
    setNuevoCosteFijo({ concepto: "", coste: 0, frecuencia: "Mensual" });
    setEditandoCosteFijo(null);
  };

  const iniciarEdicionCosteFijo = (id: number) => {
    const costeFijo = costesFijos.find(c => c.id === id);
    if (costeFijo) {
      setNuevoCosteFijo({
        concepto: costeFijo.concepto,
        coste: costeFijo.coste,
        frecuencia: costeFijo.frecuencia
      });
      setEditandoCosteFijo(id);
    }
  };

  const cancelarEdicion = () => {
    setNuevoCosteFijo({ concepto: "", coste: 0, frecuencia: "Mensual" });
    setEditandoCosteFijo(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Finanzas</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tus ingresos, gastos y análisis financiero
        </p>
      </div>

      {/* Tabs de navegación */}
      <div className="mb-6 flex space-x-1 rounded-lg border bg-card p-1">
        {[
          { id: "resumen", label: "Resumen", icon: <PieChart size={16} /> },
          { id: "ingresos", label: "Ingresos", icon: <TrendingUp size={16} /> },
          { id: "gastos", label: "Gastos", icon: <TrendingDown size={16} /> },
          { id: "costesFijos", label: "Costes Fijos", icon: <Calculator size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-1 items-center justify-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors sm:flex-none sm:justify-start ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Acciones de importación y exportación */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
          <Upload size={16} className="mr-2" />
          Importar CSV
        </button>
        <button 
          className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted"
          onClick={() => setActiveTab(activeTab === "costesFijos" ? "costesFijos" : "ingresos")}
        >
          <FilePlus2 size={16} className="mr-2" />
          Nuevo Registro
        </button>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      {activeTab === "resumen" && (
        <div className="space-y-6">
          {/* Tarjetas de resumen */}
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

          {/* Gráfico de evolución financiera */}
          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title="Evolución Financiera"
              description="Seguimiento de ingresos, gastos y beneficios mensuales"
              data={lineChartData}
              series={[
                {
                  name: "Ingresos",
                  key: "ingresos",
                  color: "#10B981" // green
                },
                {
                  name: "Gastos",
                  key: "gastos",
                  color: "#EF4444" // red
                },
                {
                  name: "Beneficio",
                  key: "beneficio",
                  color: "#3B82F6" // blue
                }
              ]}
              height={350}
            />
          </MotionWrapper>

          {/* Tabla de resumen mensual */}
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
        </div>
      )}

      {/* Costes Fijos Tab */}
      {activeTab === "costesFijos" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <h2 className="font-heading text-lg font-medium">Costes Fijos</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Concepto
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Coste
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Frecuencia
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {costesFijos.map((coste) => (
                    <tr key={coste.id} className="hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        {coste.concepto}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-red-500">
                        €{coste.coste.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                        {coste.frecuencia}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <button 
                          className="mr-2 font-medium text-primary hover:underline"
                          onClick={() => iniciarEdicionCosteFijo(coste.id)}
                        >
                          Editar
                        </button>
                        <button 
                          className="font-medium text-red-500 hover:underline"
                          onClick={() => eliminarCosteFijo(coste.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border p-4">
              <h3 className="mb-3 text-base font-medium">
                {editandoCosteFijo !== null ? "Editar Coste Fijo" : "Añadir Nuevo Coste Fijo"}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">Concepto</label>
                  <Input
                    name="concepto"
                    value={nuevoCosteFijo.concepto}
                    onChange={(e) => handleInputChange(e, "concepto", "costeFijo")}
                    placeholder="Ej: Alquiler Oficina"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Coste (€)</label>
                  <Input
                    name="coste"
                    type="number"
                    value={nuevoCosteFijo.coste}
                    onChange={(e) => handleInputChange(e, "coste", "costeFijo")}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Frecuencia</label>
                  <Select 
                    value={nuevoCosteFijo.frecuencia} 
                    onValueChange={handleFrecuenciaChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mensual">Mensual</SelectItem>
                      <SelectItem value="Trimestral">Trimestral</SelectItem>
                      <SelectItem value="Anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                {editandoCosteFijo !== null && (
                  <Button variant="outline" onClick={cancelarEdicion}>
                    <X size={16} className="mr-2" /> Cancelar
                  </Button>
                )}
                <Button onClick={handleSubmitCosteFijo}>
                  <Save size={16} className="mr-2" /> 
                  {editandoCosteFijo !== null ? "Actualizar" : "Guardar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pestaña de Ingresos */}
      {activeTab === "ingresos" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Registrar Nuevo Ingreso</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Mes</label>
                <Input
                  name="mes"
                  value={nuevoRegistro.mes}
                  onChange={(e) => handleInputChange(e, "mes", "registro")}
                  placeholder="Ej: Julio"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Cantidad (€)</label>
                <Input
                  name="ingresos"
                  type="number"
                  value={nuevoRegistro.ingresos}
                  onChange={(e) => handleInputChange(e, "ingresos", "registro")}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSubmitRegistro} className="w-full">
                  <Save size={16} className="mr-2" /> Guardar Ingreso
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <h2 className="font-heading text-lg font-medium">Historial de Ingresos</h2>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title="Evolución de Ingresos"
              description="Seguimiento mensual de ingresos"
              data={lineChartData}
              series={[
                {
                  name: "Ingresos",
                  key: "ingresos",
                  color: "#10B981" // green
                }
              ]}
              height={350}
            />
          </MotionWrapper>
        </div>
      )}

      {/* Pestaña de Gastos */}
      {activeTab === "gastos" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Registrar Nuevo Gasto</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Mes</label>
                <Input
                  name="mes"
                  value={nuevoRegistro.mes}
                  onChange={(e) => handleInputChange(e, "mes", "registro")}
                  placeholder="Ej: Julio"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Cantidad (€)</label>
                <Input
                  name="gastos"
                  type="number"
                  value={nuevoRegistro.gastos}
                  onChange={(e) => handleInputChange(e, "gastos", "registro")}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSubmitRegistro} className="w-full">
                  <Save size={16} className="mr-2" /> Guardar Gasto
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <h2 className="font-heading text-lg font-medium">Historial de Gastos</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Mes
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Gastos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {resumenesMensuales.map((resumen, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        {resumen.mes}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-red-500">
                        €{resumen.gastos.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <MotionWrapper type="fadeUp" delay={0.2}>
            <ApexLineChart
              title="Evolución de Gastos"
              description="Seguimiento mensual de gastos"
              data={lineChartData}
              series={[
                {
                  name: "Gastos",
                  key: "gastos",
                  color: "#EF4444" // red
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
