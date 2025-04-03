
import { AlertTriangle, ArrowLeft, Check, FileEdit, Save, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BookHeaderProps {
  isEditing: boolean;
  isSaving?: boolean; // Add loading state prop
  onGoBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const BookHeader = ({ 
  isEditing, 
  isSaving = false, // Default to false
  onGoBack, 
  onEdit, 
  onSave, 
  onDelete, 
  onCancel 
}: BookHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-2">Volver</span>
        </Button>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="md:w-auto"
              disabled={isSaving}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700 md:w-auto"
              disabled={isSaving}
            >
              {isSaving ? (
                // Show a loading spinner or text when saving
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 md:w-auto"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar Libro
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex items-center text-red-500">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      ¿Estás seguro?
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. El libro será eliminado permanentemente de tu biblioteca.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="default"
              size="sm"
              onClick={onEdit}
              className="md:w-auto"
            >
              <FileEdit className="mr-2 h-4 w-4" />
              Editar Libro
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
