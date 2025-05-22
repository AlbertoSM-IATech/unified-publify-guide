
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
import { Card } from "@/components/ui/card";

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
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Series Relacionadas</h3>
      
      {isEditing ? (
        <div className="space-y-4 w-full">
          <div className="w-full border border-input rounded-md p-4 bg-background">
            <div className="text-sm font-medium mb-2">Selecciona las series:</div>
            
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
                No hay series disponibles.
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
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCollections.map(collection => (
                <Badge 
                  key={collection.id}
                  variant="outline"
                  className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 transition-colors px-3 py-1 cursor-pointer"
                >
                  {collection.nombre}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-input px-3 py-2 bg-muted/50 w-full mb-4">
              Este libro no pertenece a ninguna serie
            </div>
          )}
        </>
      )}
      
      {selectedCollections.length > 0 && !isEditing && (
        <div className="grid grid-cols-1 gap-3 w-full">
          {selectedCollections.map(collection => (
            <Card key={collection.id} className="overflow-hidden border-slate-800">
              <motion.div 
                className="p-4 bg-slate-900 rounded-md"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">{collection.nombre}</h4>
                    <Badge variant="outline" className="text-xs bg-transparent text-amber-400 border-amber-500">{collection.estado || "Activa"}</Badge>
                  </div>
                  
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {collection.descripcion}
                  </p>
                  
                  <Link 
                    to={`/biblioteca/colecciones/${collection.id}`}
                    className="flex items-center text-sm text-amber-400 hover:underline hover:text-[#FB923C] transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver serie
                  </Link>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
