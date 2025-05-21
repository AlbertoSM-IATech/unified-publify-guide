
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Search, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants";

interface BooksInCollectionProps {
  books: Book[];
  allBooks?: Book[];
  isEditing?: boolean;
  onUpdateBooks?: (bookIds: number[]) => void;
  selectedBookIds?: number[];
}

export const BooksInCollection = ({ 
  books, 
  allBooks = [], 
  isEditing = false, 
  onUpdateBooks,
  selectedBookIds = []
}: BooksInCollectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);
  const [selectedBooks, setSelectedBooks] = useState<number[]>(selectedBookIds);
  
  // Set filtered books when all books change
  useEffect(() => {
    if (searchTerm) {
      const filtered = allBooks.filter(book => 
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.autor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(allBooks);
    }
  }, [allBooks, searchTerm]);
  
  // Update selected books when selectedBookIds changes
  useEffect(() => {
    setSelectedBooks(selectedBookIds);
  }, [selectedBookIds]);
  
  // Handle book selection
  const handleBookToggle = (bookId: number, checked: boolean) => {
    let updatedSelection: number[];
    
    if (checked) {
      updatedSelection = [...selectedBooks, bookId];
    } else {
      updatedSelection = selectedBooks.filter(id => id !== bookId);
    }
    
    setSelectedBooks(updatedSelection);
    if (onUpdateBooks) onUpdateBooks(updatedSelection);
  };
  
  // Handle removing a book
  const handleRemoveBook = (bookId: number) => {
    const updatedSelection = selectedBooks.filter(id => id !== bookId);
    setSelectedBooks(updatedSelection);
    if (onUpdateBooks) onUpdateBooks(updatedSelection);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <BookOpen size={18} className="text-[#FB923C]" />
          {isEditing ? "Gestionar Libros en la Serie" : "Libros en esta Serie"}
          <Badge variant="outline" className="ml-2">{books.length}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Buscar libros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="border rounded-md">
              <ScrollArea className="h-[250px]">
                <div className="p-4 space-y-2">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                      <div key={book.id} className="flex items-center space-x-2 py-1">
                        <Checkbox 
                          id={`book-${book.id}`} 
                          checked={selectedBooks.includes(book.id)}
                          onCheckedChange={(checked) => 
                            handleBookToggle(book.id, checked === true)
                          }
                        />
                        <Label 
                          htmlFor={`book-${book.id}`}
                          className="flex items-center gap-2 text-sm font-normal cursor-pointer w-full"
                        >
                          <img 
                            src={book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL} 
                            alt={book.titulo} 
                            className="h-8 w-6 object-cover rounded-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_COVER_URL;
                            }}
                          />
                          <div className="flex-grow truncate">
                            <span className="font-medium">{book.titulo}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {book.autor}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      {searchTerm ? "No hay resultados para tu búsqueda" : "No hay libros disponibles"}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Libros seleccionados ({selectedBooks.length})</h4>
              <div className="border rounded-md bg-muted/20 p-3 min-h-[100px]">
                {selectedBooks.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {books.filter(book => selectedBooks.includes(book.id)).map(book => (
                      <div 
                        key={book.id} 
                        className="flex items-center gap-2 border rounded-md p-2 bg-background"
                      >
                        <img 
                          src={book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL} 
                          alt={book.titulo} 
                          className="h-12 w-8 object-cover rounded-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_COVER_URL;
                          }}
                        />
                        <div className="flex-grow truncate">
                          <div className="font-medium text-sm line-clamp-1">{book.titulo}</div>
                          <div className="text-xs text-muted-foreground">{book.autor}</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full hover:bg-destructive/10"
                          onClick={() => handleRemoveBook(book.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full py-4 text-muted-foreground">
                    No hay libros seleccionados
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.map(book => (
                  <Link 
                    key={book.id}
                    to={`/biblioteca/libros/${book.id}`}
                    className="flex items-start gap-3 border rounded-md p-3 hover:border-[#FB923C]/40 hover:bg-muted/20 transition-colors duration-150"
                  >
                    <img
                      src={book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL}
                      alt={book.titulo}
                      className="h-16 w-12 object-cover rounded-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_COVER_URL;
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-[#3B82F6] line-clamp-2">{book.titulo}</h4>
                      <p className="text-sm text-muted-foreground">{book.autor}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {book.estado}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.contenido}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground border rounded-md">
                Esta serie no tiene libros asociados.
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

