
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { Collection } from "../../types/collectionTypes";

interface CollectionInfoProps {
  collection: Collection;
  editedCollection: Collection;
  isEditing: boolean;
  onUpdateField: (field: keyof Collection, value: string) => void;
}

export const CollectionInfo = ({
  collection,
  editedCollection,
  isEditing,
  onUpdateField
}: CollectionInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Nombre de la colección</h3>
            {isEditing ? (
              <Input
                value={editedCollection.nombre}
                onChange={(e) => onUpdateField("nombre", e.target.value)}
                placeholder="Nombre de la colección"
              />
            ) : (
              <p className="text-lg font-semibold">{collection.nombre}</p>
            )}
          </div>
          
          <div>
            <h3 className="mb-2 font-medium">Descripción</h3>
            {isEditing ? (
              <Textarea
                value={editedCollection.descripcion}
                onChange={(e) => onUpdateField("descripcion", e.target.value)}
                placeholder="Descripción de la colección"
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground">{collection.descripcion}</p>
            )}
          </div>
          
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Creada el {new Date(collection.fechaCreacion).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
