
import { Book } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface BookLinksSectionProps {
  book: Book;
  handleOpenUrl: (url: string) => void;
}

export const BookLinksSection = ({ book, handleOpenUrl }: BookLinksSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Enlaces</h3>
      <div className="space-y-2">
        {/* Amazon Hardcover Link */}
        {book.hardcover?.links?.amazon && (
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleOpenUrl(book.hardcover!.links!.amazon!)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver en Amazon (Tapa dura)
          </Button>
        )}
        {/* Amazon Paperback Link */}
        {book.paperback?.links?.amazon && (
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleOpenUrl(book.paperback!.links!.amazon!)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver en Amazon (Tapa blanda)
          </Button>
        )}
        {/* Amazon eBook Link */}
        {book.ebook?.links?.amazon && (
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleOpenUrl(book.ebook!.links!.amazon!)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver en Amazon (eBook)
          </Button>
        )}
        {/* Fallback general Amazon Link si los específicos no existen y book.amazonUrl sí */}
        {!book.hardcover?.links?.amazon && !book.paperback?.links?.amazon && !book.ebook?.links?.amazon && book.amazonUrl && (
           <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleOpenUrl(book.amazonUrl!)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver en Amazon (General)
          </Button>
        )}

        {/* Landing Page Link */}
        {book.landingPageUrl && (
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleOpenUrl(book.landingPageUrl || '')}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Lead Magnet
          </Button>
        )}

        {/* Mensaje si no hay ningún enlace de Amazon ni Landing Page */}
        {!book.hardcover?.links?.amazon && 
         !book.paperback?.links?.amazon && 
         !book.ebook?.links?.amazon && 
         !book.amazonUrl && 
         !book.landingPageUrl && (
          <p className="text-sm text-muted-foreground">No hay enlaces disponibles.</p>
        )}
      </div>
    </div>
  );
};
