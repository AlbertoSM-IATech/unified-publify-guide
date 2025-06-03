
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { ExternalLink, X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CollectionRelationProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  collections: any[];
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
      updatedIds = [...(book.coleccionesIds || []), collectionId];
    } else {
      updatedIds = (book.coleccionesIds || []).filter(id => id !== collectionId);
    }
    
    onUpdateBook({ coleccionesIds: updatedIds });
  };

  const handleRemoveCollection = (collectionId: number) => {
    const updatedIds = (book.coleccionesIds || []).filter(id => id !== collectionId);
    onUpdateBook({ coleccionesIds: updatedIds });
  };

  return (
    <Card className="border-neutral-200 dark:border-neutral-700 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300">
          <BookOpen className="h-5 w-5 text-neutral-500" />
          Series Relacionadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4 bg-neutral-50/50 dark:bg-neutral-800/20">
              <div className="text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">Selecciona las series:</div>
              
              {collections.length > 0 ? (
                <ScrollArea className="h-32">
                  <div className="space-y-2">
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
                          className="text-sm font-normal cursor-pointer flex-1 text-neutral-700 dark:text-neutral-300"
                        >
                          {collection.nombre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No hay series disponibles.
                </div>
              )}
            </div>
            
            {selectedCollections.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCollections.map(collection => (
                  <Badge 
                    key={collection.id} 
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
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
          selectedCollections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Este libro no pertenece a ninguna serie</p>
            </div>
          ) : null
        )}
        
        {selectedCollections.length > 0 && !isEditing && (
          <div className="space-y-3">
            {selectedCollections.map(collection => (
              <motion.div
                key={collection.id}
                className="p-4 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200 dark:border-neutral-700"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-neutral-800 dark:text-neutral-200">{collection.nombre}</h4>
                    <Badge variant="outline" className="text-xs border-neutral-400 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400">
                      {collection.estado || "Activa"}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {collection.descripcion}
                  </p>
                  
                  <Link 
                    to={`/biblioteca/colecciones/${collection.id}`}
                    className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 hover:underline transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver serie
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
