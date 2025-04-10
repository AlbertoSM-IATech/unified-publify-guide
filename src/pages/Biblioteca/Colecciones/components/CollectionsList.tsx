
import { Link } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Collection {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadLibros: number;
  fechaCreacion: string;
  libros: number[];
}

interface CollectionsListProps {
  collections: Collection[];
}

export const CollectionsListView = ({ collections }: CollectionsListProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Libros</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell className="font-medium">
                {collection.nombre}
              </TableCell>
              <TableCell className="max-w-md">
                <div className="line-clamp-1">{collection.descripcion}</div>
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  {collection.cantidadLibros}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(collection.fechaCreacion).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Link 
                  to={`/biblioteca/colecciones/${collection.id}`}
                  className="mr-2 font-medium text-primary hover:underline"
                >
                  Ver
                </Link>
                <Link 
                  to={`/biblioteca/colecciones/${collection.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  Editar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
