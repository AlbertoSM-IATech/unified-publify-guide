import { useState } from "react";
import { Settings, Key, Globe, Database, Bell, Download, Upload, ExternalLink, Trash2, AlertTriangle } from "lucide-react";
const Configuracion = () => {
  const [activeTab, setActiveTab] = useState("general");
  return <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Configuración</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona la configuración general de la aplicación
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Menú de navegación */}
        <div className="md:col-span-3">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <h2 className="font-heading text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Ajustes
              </h2>
              <nav className="mt-2 flex flex-col space-y-1">
                {[{
                id: "general",
                label: "General",
                icon: <Settings size={16} />
              }, {
                id: "integraciones",
                label: "Integraciones",
                icon: <ExternalLink size={16} />
              }, {
                id: "datos",
                label: "Datos y Seguridad",
                icon: <Database size={16} />
              }, {
                id: "notificaciones",
                label: "Notificaciones",
                icon: <Bell size={16} />
              }, {
                id: "cuenta",
                label: "Cuenta",
                icon: <Key size={16} />
              }].map(tab => <button key={tab.id} className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`} onClick={() => setActiveTab(tab.id)}>
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>)}
              </nav>
            </div>
          </div>
        </div>

        {/* Contenido de la configuración */}
        <div className="md:col-span-9">
          <div className="rounded-lg border bg-card shadow-sm">
            {activeTab === "general" && <div className="p-6">
                <h2 className="font-heading text-lg font-medium">Configuración General</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="nombreApp" className="mb-1 block text-sm font-medium">Nombre de la Editorial</label>
                    <input type="text" id="nombreApp" className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="Publify" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Este nombre se mostrará en el encabezado y título de la página
                    </p>
                  </div>

                  <div>
                    <label htmlFor="idioma" className="mb-1 block text-sm font-medium">
                      Idioma
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Globe size={16} className="text-muted-foreground" />
                      </div>
                      <select id="idioma" className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="es">
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Formatos de fecha
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <select className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm">
                          <option>DD/MM/YYYY</option>
                          <option>MM/DD/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Formato de fecha
                        </p>
                      </div>
                      <div>
                        <select className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm">
                          <option>24 horas</option>
                          <option>12 horas (AM/PM)</option>
                        </select>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Formato de hora
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>}

            {activeTab === "datos" && <div className="p-6">
                <h2 className="font-heading text-lg font-medium">Datos y Seguridad</h2>
                <p className="text-sm text-muted-foreground">
                  Gestiona tus datos y opciones de seguridad
                </p>

                <div className="mt-6 space-y-6">
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                        <Download size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Exportar datos</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Descarga una copia de todos tus datos incluyendo libros, colecciones y finanzas
                        </p>
                        <button className="mt-2 inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted">
                          <Download size={14} className="mr-1.5" />
                          Exportar a CSV
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                        <Upload size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Importar datos</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Importa datos desde archivos CSV externos
                        </p>
                        <button className="mt-2 inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted">
                          <Upload size={14} className="mr-1.5" />
                          Importar archivo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5 rounded-full bg-destructive/10 p-2 text-destructive">
                        <Trash2 size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-destructive">Eliminar todos los datos</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Esta acción eliminará permanentemente todos tus datos. No se puede deshacer.
                        </p>
                        <button className="mt-2 inline-flex items-center rounded-md border border-destructive bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                          <AlertTriangle size={14} className="mr-1.5" />
                          Eliminar datos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {(activeTab === "integraciones" || activeTab === "notificaciones" || activeTab === "cuenta") && <div className="flex h-64 flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted/70 p-4 text-muted-foreground">
                  {activeTab === "integraciones" && <ExternalLink size={32} />}
                  {activeTab === "notificaciones" && <Bell size={32} />}
                  {activeTab === "cuenta" && <Key size={32} />}
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  Configuración de {activeTab === "integraciones" ? "Integraciones" : activeTab === "notificaciones" ? "Notificaciones" : "Cuenta"}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Esta sección estará disponible próximamente. Aquí podrás gestionar tus {activeTab === "integraciones" ? "conexiones con servicios externos" : activeTab === "notificaciones" ? "preferencias de notificaciones" : "datos de cuenta y suscripción"}.
                </p>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default Configuracion;