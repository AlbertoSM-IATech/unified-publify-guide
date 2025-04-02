
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenTool, Save, Trash } from "lucide-react";

interface BookHeaderProps {
  isEditing: boolean;
  onGoBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const BookHeader = ({
  isEditing,
  onGoBack,
  onEdit,
  onSave,
  onDelete,
  onCancel
}: BookHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={onGoBack}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver
        </Button>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">
          {isEditing ? "Editar Libro" : "Detalles del Libro"}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              variant="default" 
              onClick={onSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={onEdit}
            >
              <PenTool className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button 
              variant="destructive" 
              onClick={onDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
