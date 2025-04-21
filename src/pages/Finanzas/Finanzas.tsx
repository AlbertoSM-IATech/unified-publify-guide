
import { useState } from "react";
import { 
  Upload, PieChart, BarChart, Calculator, 
  TrendingUp, TrendingDown, DollarSign, FilePlus2
} from "lucide-react";
import { ApexLineChart } from "@/components/charts";
import MotionWrapper from "@/components/motion/MotionWrapper";

export const Finanzas = () => {
  const [activeTab, setActiveTab] = useState("resumen");

  // Datos simulados para finanzas
  const resumenesMensuales = [
    { mes: "Enero", ingresos: 2430, gastos: 1890, beneficio: 540 },
    { mes: "Febrero", ingresos: 2870, gastos: 2100, beneficio: 770 },
    { mes: "Marzo", ingresos: 3150, gastos: 2350, beneficio: 800 },
    { mes: "Abril", ingresos: 2920, gastos: 2180, beneficio: 740 },
    { mes: "Mayo", ingresos: 3450, gastos: 2400, beneficio: 1050 },
    { mes: "Junio", ingresos: 3720, gastos: 2650, beneficio: 1070 }
  ];

  // Datos de costes fijos
  const costesFijos = [
    { concepto: "Alquiler Oficina", coste: 850, frecuencia: "Mensual" },
    { concepto: "Servicios Web", coste: 120, frecuencia: "Mensual" },
    { concepto: "Software Editorial", coste: 350, frecuencia: "Mensual" },
    { concepto: "Seguro Profesional", coste: 420, frecuencia: "Trimestral" },
    { concepto: "Asesoría Contable", coste: 200, frecuencia: "Mensual" }
  ];

  // Preparar datos para el gráfico de líneas múltiples
  const lineChartData = resumenesMensuales.map(item => ({
    name: item.mes.substring(0, 3),
    ingresos: item.ingresos,
    gastos: item.gastos,
    beneficio: item.beneficio
  }));

  // Cálculo de totales para las tarjetas
  const ingresosTotales = resumenesMensuales.reduce((total, item) => total + item.ingresos, 0);
  const gastosTotales = resumenesMensuales.reduce((total, item) => total + item.gastos, 0);
  const beneficioNeto = ingresosTotales - gastosTotales;
  
  // Cálculo de porcentajes de cambio (comparando con el mes anterior)
  const ultimoMes = resumenesMensuales[resumenesMensuales.length - 1];
  const penultimoMes = resumenesMensuales[resumenesMensuales.length - 2];
  
  const cambioIngresos = ((ultimoMes.ingresos - penultimoMes.ingresos) / penultimoMes.ingresos * 100).toFixed(0);
  const cambioGastos = ((ultimoMes.gastos - penultimoMes.gastos) / penultimoMes.gastos * 100).toFixed(0);
  const cambioBeneficio = ((ultimoMes.beneficio - penultimoMes.beneficio) / penultimoMes.beneficio * 100).toFixed(0);

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
        <button className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
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
                change: `+${cambioIngresos}%`, 
                icon: <TrendingUp size={20} />,
                color: "text-green-500"
              },
              { 
                title: "Gastos Totales", 
                value: `€${gastosTotales.toLocaleString()}`, 
                change: `+${cambioGastos}%`, 
                icon: <TrendingDown size={20} />,
                color: "text-red-500"
              },
              { 
                title: "Beneficio Neto", 
                value: `€${beneficioNeto.toLocaleString()}`, 
                change: `+${cambioBeneficio}%`, 
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

      {/* Resto de las pestañas mantienen su funcionalidad original */}
      {activeTab === "costesFijos" && (
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
                {costesFijos.map((coste, index) => (
                  <tr key={index} className="hover:bg-muted/50">
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
                      <button className="mr-2 font-medium text-primary hover:underline">
                        Editar
                      </button>
                      <button className="font-medium text-red-500 hover:underline">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end border-t border-border p-4">
            <button className="flex items-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              <FilePlus2 size={16} className="mr-2" />
              Añadir Coste Fijo
            </button>
          </div>
        </div>
      )}

      {(activeTab === "ingresos" || activeTab === "gastos") && (
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto max-w-md">
            <div className="rounded-full bg-muted/70 p-4 text-muted-foreground mx-auto w-fit mb-4">
              {activeTab === "ingresos" ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
            </div>
            <h2 className="font-heading text-xl font-medium">
              Sección de {activeTab === "ingresos" ? "Ingresos" : "Gastos"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Aquí podrás gestionar todos tus {activeTab === "ingresos" ? "ingresos" : "gastos"} editoriales, 
              incluyendo {activeTab === "ingresos" ? "regalías, afiliaciones y cursos" : "publicidad, colaboraciones y servicios"}.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="flex items-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                <Upload size={16} className="mr-2" />
                Importar {activeTab === "ingresos" ? "Ingresos" : "Gastos"}
              </button>
              <button className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
                <FilePlus2 size={16} className="mr-2" />
                Añadir Manualmente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finanzas;
