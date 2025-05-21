
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

interface CollectionRelationProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  collections: any[]; // Collections from localStorage
}

export const CollectionRelation = ({ 
  book, 
  isEditing, 
  onUpdateBook,
  collections
}: CollectionRelationProps) => {
  const [selectedCollections, setSelectedCollections] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Load related collections when component mounts or book changes
  useEffect(() => {
    if (book.coleccionesIds && book.coleccionesIds.length > 0) {
      const bookCollections = collections.filter(col => 
        book.coleccionesIds?.includes(col.id)
      );
      setSelectedCollections(bookCollections);
    } else {
      setSelectedCollections([]);
    }
  }, [book.coleccionesIds, collections]);

  // Handle collection selection changes
  const handleCollectionToggle = (collectionId: number, isChecked: boolean) => {
    let updatedIds: number[];
    
    if (isChecked) {
      // Add to selection
      updatedIds = [...(book.coleccionesIds || []), collectionId];
    } else {
      // Remove from selection
      updatedIds = (book.coleccionesIds || []).filter(id => id !== collectionId);
    }
    
    onUpdateBook({ coleccionesIds: updatedIds });
  };

  // Remove a collection from the book
  const handleRemoveCollection = (collectionId: number) => {
    const updatedIds = (book.coleccionesIds || []).filter(id => id !== collectionId);
    onUpdateBook({ coleccionesIds: updatedIds });
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="colecciones">Colecciones Relacionadas</Label>
      
      {isEditing ? (
        <div className="space-y-4">
          <div className="w-full border border-input rounded-md p-4 bg-background">
            <div className="text-sm font-medium mb-2">Selecciona las colecciones:</div>
            
            {collections.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {collections.map(collection => (
                  <div key={collection.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`collection-${collection.id}`} 
                      checked={(book.coleccionesIds || []).includes(collection.id)}
                      onCheckedChange={(checked) => 
                        handleCollectionToggle(collection.id, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`collection-${collection.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {collection.nombre}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No hay colecciones disponibles.
              </div>
            )}
          </div>
          
          {selectedCollections.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCollections.map(collection => (
                <Badge 
                  key={collection.id} 
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {collection.nombre}
                  <button 
                    type="button"
                    onClick={() => handleRemoveCollection(collection.id)}
                    className="ml-1 text-muted-foreground hover:text-foreground rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {selectedCollections.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedCollections.map(collection => (
                <Link 
                  key={collection.id}
                  to={`/biblioteca/colecciones/${collection.id}`}
                >
                  <Badge 
                    variant="secondary"
                    className="hover:bg-muted transition-colors px-3 py-1 cursor-pointer"
                  >
                    {collection.nombre}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
              Este libro no pertenece a ninguna colección
            </div>
          )}
        </>
      )}
      
      {selectedCollections.length > 0 && !isEditing && (
        <div className="space-y-2 mt-2">
          {selectedCollections.map(collection => (
            <motion.div 
              key={collection.id}
              className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{collection.nombre}</h4>
                  <Badge variant="outline" className="text-xs">{collection.estado || "Activa"}</Badge>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {collection.descripcion}
                </p>
                
                <Link 
                  to={`/biblioteca/colecciones/${collection.id}`}
                  className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Ver colección
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
