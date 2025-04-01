
import { useState } from "react";
import { BookOpen, FolderIcon, GridIcon, List, Plus, Search, Filter } from "lucide-react";

// Datos simulados para colecciones
const coleccionesSimuladas = [
  {
    id: 1,
    nombre: "Serie Emprendimiento",
    descripcion: "Libros sobre emprendimiento y negocios",
    cantidadLibros: 3,
    fechaCreacion: "2023-01-15",
    libros: [1, 2, 3]
  },
  {
    id: 2,
    nombre: "Desarrollo Personal",
    descripcion: "Libros de crecimiento y superación",
    cantidadLibros: 2,
    fechaCreacion: "2023-02-20",
    libros: [4, 5]
  },
  {
    id: 3,
    nombre: "Marketing y Ventas",
    descripcion: "Todo sobre marketing digital y técnicas de venta",
    cantidadLibros: 1,
    fechaCreacion: "2023-03-10",
    libros: [3]
  },
  {
    id: 4,
    nombre: "Liderazgo",
    descripcion: "Estrategias y consejos de liderazgo",
    cantidadLibros: 1,
    fechaCreacion: "2023-04-05",
    libros: [6]
  }
];

const ColeccionesList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [colecciones, setColecciones] = useState(coleccionesSimuladas);

  // Filtrar colecciones por búsqueda
  const filteredColecciones = colecciones.filter(
    (coleccion) =>
      coleccion.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coleccion.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Colecciones</h1>
          <p className="mt-1 text-muted-foreground">Organiza tus libros en colecciones temáticas</p>
        </div>
        <button className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nueva Colección
        </button>
      </div>

      {/* Barra de filtros y búsqueda */}
      <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
            <Filter size={16} className="mr-2" />
            Filtros
          </button>
          <div className="flex rounded-md border border-input p-1">
            <button
              className={`rounded p-1 ${
                viewMode === "grid" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Vista de cuadrícula"
            >
              <GridIcon size={16} />
            </button>
            <button
              className={`rounded p-1 ${
                viewMode === "list" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("list")}
              aria-label="Vista de lista"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de colecciones */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredColecciones.map((coleccion) => (
            <div
              key={coleccion.id}
              className="card-hover group rounded-lg border bg-card shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FolderIcon size={24} className="text-primary" />
                  </div>
                  <span className="flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {coleccion.cantidadLibros} libros
                  </span>
                </div>
                <h3 className="mt-4 font-medium">{coleccion.nombre}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {coleccion.descripcion}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coleccion.libros.slice(0, 3).map((libroId) => (
                    <div
                      key={libroId}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                    >
                      <BookOpen size={14} />
                    </div>
                  ))}
                  {coleccion.libros.length > 3 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      +{coleccion.libros.length - 3}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    Creada: {new Date(coleccion.fechaCreacion).toLocaleDateString()}
                  </span>
                  <button className="text-xs font-medium text-primary hover:underline">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Nombre
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Descripción
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Libros
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fecha Creación
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {filteredColecciones.map((coleccion) => (
                <tr key={coleccion.id} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {coleccion.nombre}
                  </td>
                  <td className="max-w-md px-4 py-4 text-sm text-muted-foreground">
                    <div className="line-clamp-1">{coleccion.descripcion}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                      {coleccion.cantidadLibros}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                    {new Date(coleccion.fechaCreacion).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                    <button className="mr-2 font-medium text-primary hover:underline">
                      Ver
                    </button>
                    <button className="font-medium text-primary hover:underline">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ColeccionesList;
