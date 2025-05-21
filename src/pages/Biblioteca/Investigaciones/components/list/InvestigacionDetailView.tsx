
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Investigacion } from "../../types/investigacionTypes";

interface InvestigacionDetailViewProps {
  investigacion: Investigacion;
  onVolver: () => void;
  // onGuardarCambios: () => void; // Placeholder for future functionality
  // onVistaPrevia: () => void; // Placeholder for future functionality
}

export const InvestigacionDetailView = ({ 
  investigacion, 
  onVolver,
  // onGuardarCambios,
  // onVistaPrevia
}: InvestigacionDetailViewProps) => {
  return (
    <div className="animate-fade-in h-full">
      <div className="mb-4 flex items-center">
        <button onClick={onVolver} className="mr-4 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" /> Volver
        </button>
        <h2 className="text-xl font-medium">{investigacion.titulo}</h2>
      </div>

      <div className="flex rounded-lg border border-border bg-card p-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <BookOpen size={14} className="mr-1" />
          <span className="mr-2">Libro: {investigacion.libroTitulo}</span>
          <span>
            Última actualización: {new Date(investigacion.fechaActualizacion).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 h-[calc(100vh-200px)] rounded-lg border border-border bg-card p-6">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <FileText size={48} className="mb-4 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">Editor de Investigación</h3>
          <p className="mb-4 max-w-md text-muted-foreground">
            Aquí irá integrado AppFlowy u otro editor de documentos.
            Esta área será un editor de texto enriquecido donde podrás 
            crear y editar tu investigación con formato.
          </p>
          <div className="flex space-x-4">
            <Button variant="default" disabled>Guardar cambios</Button> {/* Deshabilitado por ahora */}
            <Button variant="outline" disabled>Vista previa</Button> {/* Deshabilitado por ahora */}
          </div>
        </div>
      </div>
    </div>
  );
};
