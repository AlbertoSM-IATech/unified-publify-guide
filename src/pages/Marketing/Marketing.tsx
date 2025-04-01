
import { MegaphoneIcon, Link2, FileBarChart, ExternalLink } from "lucide-react";

const Marketing = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Marketing</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tus campañas de marketing y promoción
        </p>
      </div>

      {/* GoHighLevel Integration Placeholder */}
      <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <MegaphoneIcon size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-medium">Integración con GoHighLevel</h2>
              <p className="text-sm text-muted-foreground">
                Conecta y gestiona tus campañas desde una interfaz unificada
              </p>
            </div>
          </div>
          <button className="flex items-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
            <Link2 size={16} className="mr-2" />
            Conectar
          </button>
        </div>
        
        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <ExternalLink size={32} className="mx-auto mb-3 text-muted-foreground" />
          <h3 className="text-lg font-medium">Contenido de GoHighLevel</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Aquí se mostrará el panel de GoHighLevel una vez conectado. 
            Podrás gestionar tus campañas de marketing, automatizaciones y seguimiento de leads.
          </p>
          <button className="mt-4 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
            Ver documentación
          </button>
        </div>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-medium">Rendimiento de Campañas</h2>
          <div className="mt-4 space-y-4">
            {["Email Marketing", "Redes Sociales", "Publicidad PPC"].map((campana, index) => (
              <div key={index} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{campana}</span>
                  <span className={`text-xs font-medium ${
                    index === 0 ? "text-green-500" : 
                    index === 1 ? "text-yellow-500" : 
                    "text-blue-500"
                  }`}>
                    {index === 0 ? "+22%" : index === 1 ? "+5%" : "+12%"}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? "bg-green-500" : 
                      index === 1 ? "bg-yellow-500" : 
                      "bg-blue-500"
                    }`}
                    style={{ width: `${(index + 3) * 15}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{(index + 1) * 1000} visitas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-medium">Informes y Análisis</h2>
          <div className="mt-6 space-y-4">
            {[
              { title: "Ventas por Canal", icon: <FileBarChart size={40} /> },
              { title: "Conversiones de Campañas", icon: <FileBarChart size={40} /> },
              { title: "Análisis de Audiencia", icon: <FileBarChart size={40} /> }
            ].map((informe, index) => (
              <div key={index} className="flex cursor-pointer items-center rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="mr-4 text-muted-foreground">
                  {informe.icon}
                </div>
                <div>
                  <h3 className="font-medium">{informe.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Datos actualizados: {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto">
                  <button className="rounded-md border border-input bg-background px-3 py-1 text-xs hover:bg-muted">
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
