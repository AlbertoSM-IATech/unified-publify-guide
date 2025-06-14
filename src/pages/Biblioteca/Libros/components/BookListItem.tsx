
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Eye } from "lucide-react";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { coleccionesSimuladas } from "../utils/mockData/coleccionesData";
import { Collection } from "../../Colecciones/types/collectionTypes";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants";
import { StatusBadge } from "@/components/common/StatusBadge";

interface BookListItemProps {
  libro: Book;
}

export const BookListItem = memo(({ libro }: BookListItemProps) => {
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  const [imgSrc, setImgSrc] = useState(libro.imageUrl || libro.portadaUrl || DEFAULT_COVER_URL);
  const [collectionsData] = useLocalStorage<Collection[]>( 
    'coleccionesData', 
    coleccionesSimuladas
  );
  const [bookCollections, setBookCollections] = useState<{id: number, nombre: string}[]>([]);
  
  useEffect(() => {
    if (libro.coleccionesIds && libro.coleccionesIds.length > 0) {
      const relatedCollections = collectionsData
        .filter(col => libro.coleccionesIds?.includes(col.id))
        .map(col => ({id: col.id, nombre: col.nombre}));
      
      setBookCollections(relatedCollections);
    } else {
      setBookCollections([]);
    }
  }, [libro.coleccionesIds, collectionsData]);
  
  const handleImageError = () => {
    console.log(`Failed to load image for book: ${libro.id}, falling back to default`);
    setImgSrc(DEFAULT_COVER_URL);
  };
  
  return (
    <tr className="hover:bg-muted/20 transition-colors">
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-8 flex-shrink-0 overflow-hidden rounded-sm">
            <img 
              src={imgSrc} 
              alt={libro.titulo} 
              className="h-full w-full object-cover"
              loading="lazy"
              width="32"
              height="48"
              onError={handleImageError}
            />
          </div>
          <div>
            <div className="font-medium text-[#FB923C]">
              <Link to={`/biblioteca/libros/${libro.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FB923C] rounded-sm">
                {libro.titulo}
              </Link>
            </div>
            {libro.subtitulo && (
              <div className="text-xs text-muted-foreground italic">{libro.subtitulo}</div>
            )}
            <div className="text-sm text-muted-foreground">{libro.autor}</div>
            
            {bookCollections.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {bookCollections.slice(0, 2).map(col => (
                  <Badge 
                    key={col.id} 
                    variant="outline"
                    className="text-xs px-1.5 py-0 flex items-center"
                  >
                    {col.nombre}
                  </Badge>
                ))}
                {bookCollections.length > 2 && (
                  <Badge 
                    variant="outline"
                    className="text-xs px-1.5 py-0"
                  >
                    +{bookCollections.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-500 font-medium">
        {netRoyalties}€
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <StatusBadge status={libro.estado} />
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <StatusBadge status={libro.contenido} />
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {libro.fechaPublicacion
          ? new Date(libro.fechaPublicacion).toLocaleDateString()
          : "No publicado"}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
        <Link
          to={`/biblioteca/libros/${libro.id}`}
          className="inline-flex items-center font-medium text-[#FB923C] hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FB923C] rounded-sm"
        >
          <Eye className="mr-1 h-4 w-4" /> Ver detalles
        </Link>
      </td>
    </tr>
  );
});

BookListItem.displayName = 'BookListItem';
