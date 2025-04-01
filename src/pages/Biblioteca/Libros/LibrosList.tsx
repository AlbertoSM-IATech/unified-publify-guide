
import { useState } from "react";
import { BookOpen, GridIcon, List, Plus, Search, Filter } from "lucide-react";

// Datos simulados para libros
const librosSimulados = [
  {
    id: 1,
    titulo: "El Arte de la Estrategia",
    subtitulo: "Una visión global",
    autor: "Juan Pérez",
    isbn: "978-3-16-148410-0",
    asin: "B01N9VSOYB",
    estado: "Publicado",
    fechaPublicacion: "2023-05-15",
    imageUrl: ""
  },
  {
    id: 2,
    titulo: "Finanzas para Emprendedores",
    subtitulo: "Guía práctica",
    autor: "María González",
    isbn: "978-3-16-148410-1",
    asin: "B08N5M7KTS",
    estado: "Borrador",
    fechaPublicacion: null,
    imageUrl: ""
  },
  {
    id: 3,
    titulo: "Marketing Digital",
    subtitulo: "Estrategias efectivas",
    autor: "Carlos Rodríguez",
    isbn: "978-3-16-148410-2",
    asin: "B07F7TDMCD",
    estado: "Publicado",
    fechaPublicacion: "2023-02-10",
    imageUrl: ""
  },
  {
    id: 4,
    titulo: "Desarrollo Personal",
    subtitulo: "Alcanza tu máximo potencial",
    autor: "Ana López",
    isbn: "978-3-16-148410-3",
    asin: "B08ZHPKH56",
    estado: "Revisión",
    fechaPublicacion: null,
    imageUrl: ""
  },
  {
    id: 5,
    titulo: "Inteligencia Emocional",
    subtitulo: "Aprende a gestionar tus emociones",
    autor: "Pedro Martínez",
    isbn: "978-3-16-148410-4",
    asin: "B01F7TQ86A",
    estado: "Publicado",
    fechaPublicacion: "2022-11-20",
    imageUrl: ""
  },
  {
    id: 6,
    titulo: "Liderazgo Efectivo",
    subtitulo: "Técnicas para dirigir equipos",
    autor: "Laura Sánchez",
    isbn: "978-3-16-148410-5",
    asin: "B07Z4RVN9L",
    estado: "Publicado",
    fechaPublicacion: "2022-09-05",
    imageUrl: ""
  }
];

const LibrosList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [libros, setLibros] = useState(librosSimulados);

  // Filtrar libros por búsqueda
  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.isbn.includes(searchQuery) ||
      libro.asin.includes(searchQuery)
  );

  // Definir el color del badge según el estado
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Publicado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Borrador":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Biblioteca</h1>
          <p className="mt-1 text-muted-foreground">Gestiona tus libros y colecciones</p>
        </div>
        <button className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nuevo Libro
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
            placeholder="Buscar por título, autor, ISBN..."
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

      {/* Lista de libros */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredLibros.map((libro) => (
            <div
              key={libro.id}
              className="card-hover group rounded-lg border bg-card shadow-sm"
            >
              {/* Portada del libro */}
              <div className="relative h-48 rounded-t-lg bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground/50">
                  {libro.imageUrl ? (
                    <img
                      src={libro.imageUrl}
                      alt={libro.titulo}
                      className="h-full w-full rounded-t-lg object-cover"
                    />
                  ) : (
                    <BookOpen size={60} />
                  )}
                </div>
                <div className="absolute right-2 top-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      libro.estado
                    )}`}
                  >
                    {libro.estado}
                  </span>
                </div>
              </div>
              
              {/* Información del libro */}
              <div className="p-4">
                <h3 className="line-clamp-1 font-medium">{libro.titulo}</h3>
                {libro.subtitulo && (
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {libro.subtitulo}
                  </p>
                )}
                <p className="mt-1 text-sm">{libro.autor}</p>
                <div className="mt-2 flex flex-wrap gap-1 text-xs text-muted-foreground">
                  <span>ISBN: {libro.isbn}</span>
                  {libro.asin && <span className="ml-1">ASIN: {libro.asin}</span>}
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-xs font-medium text-primary hover:underline">
                    Ver detalles
                  </button>
                  <button className="text-xs font-medium text-primary hover:underline">
                    Editar
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
                  Título / Autor
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  ISBN / ASIN
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Estado
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fecha
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {filteredLibros.map((libro) => (
                <tr key={libro.id} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-4">
                    <div>
                      <div className="font-medium">{libro.titulo}</div>
                      <div className="text-sm text-muted-foreground">{libro.autor}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                    <div>ISBN: {libro.isbn}</div>
                    {libro.asin && <div>ASIN: {libro.asin}</div>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        libro.estado
                      )}`}
                    >
                      {libro.estado}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                    {libro.fechaPublicacion
                      ? new Date(libro.fechaPublicacion).toLocaleDateString()
                      : "No publicado"}
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

export default LibrosList;
