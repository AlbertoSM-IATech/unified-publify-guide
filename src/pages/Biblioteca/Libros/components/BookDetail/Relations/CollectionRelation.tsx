
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
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-[#FB923C]" />
          Series Relacionadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="border border-input rounded-lg p-4 bg-muted/30">
              <div className="text-sm font-medium mb-3">Selecciona las series:</div>
              
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
                          className="text-sm font-normal cursor-pointer flex-1"
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
          selectedCollections.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Este libro no pertenece a ninguna serie</p>
            </div>
          ) : null
        )}
        
        {selectedCollections.length > 0 && !isEditing && (
          <div className="space-y-3">
            {selectedCollections.map(collection => (
              <motion.div
                key={collection.id}
                className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg border border-orange-200 dark:border-orange-800"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">{collection.nombre}</h4>
                    <Badge variant="outline" className="text-xs border-orange-300 text-orange-600 dark:border-orange-700 dark:text-orange-400">
                      {collection.estado || "Activa"}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-orange-700 dark:text-orange-300 line-clamp-2">
                    {collection.descripcion}
                  </p>
                  
                  <Link 
                    to={`/biblioteca/colecciones/${collection.id}`}
                    className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:underline transition-colors duration-200"
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
