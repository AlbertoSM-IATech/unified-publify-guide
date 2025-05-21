
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Save, Trash, X } from "lucide-react";

interface CollectionDetailHeaderProps {
  collectionName: string;
  isEditing: boolean;
  saving: boolean;
  onGoBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export const CollectionDetailHeader = ({
  collectionName,
  isEditing,
  saving,
  onGoBack,
  onEdit,
  onSave,
  onCancel,
  onDelete
}: CollectionDetailHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={onGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h1 className="font-heading text-xl font-bold md:text-2xl">
          {isEditing ? 'Editar Serie' : collectionName}
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCancel}
              disabled={saving}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              size="sm"
              onClick={onSave}
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
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

