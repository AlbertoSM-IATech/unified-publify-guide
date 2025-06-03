
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ExternalLink, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvestigationRelationProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  investigations: any[];
}

export const InvestigationRelation = ({
  book,
  isEditing,
  onUpdateBook,
  investigations
}: InvestigationRelationProps) => {
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvestigations, setFilteredInvestigations] = useState(investigations);

  // Load related investigation when component mounts or book changes
  useEffect(() => {
    if (book.investigacionId) {
      const investigacion = investigations.find(inv => inv.id === book.investigacionId);
      setSelectedInvestigacion(investigacion || null);
    } else {
      setSelectedInvestigacion(null);
    }
  }, [book.investigacionId, investigations]);

  // Filter investigations based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredInvestigations(investigations.filter(inv => inv.titulo.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredInvestigations(investigations);
    }
  }, [searchTerm, investigations]);

  // Handle investigation change
  const handleInvestigacionChange = (value: string) => {
    const investigacionId = value === "none" ? undefined : Number(value);
    onUpdateBook({
      investigacionId
    });
    if (investigacionId) {
      const investigacion = investigations.find(inv => inv.id === investigacionId);
      setSelectedInvestigacion(investigacion || null);
    } else {
      setSelectedInvestigacion(null);
    }
  };

  return (
    <Card className="border-neutral-200 dark:border-neutral-700 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300">
          <FileText className="h-5 w-5 text-neutral-500" />
          Investigación Relacionada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Buscar investigación..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="pl-9 border-neutral-300 dark:border-neutral-600" 
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Select onValueChange={handleInvestigacionChange} defaultValue={book.investigacionId ? book.investigacionId.toString() : "none"}>
              <SelectTrigger className="border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors duration-200">
                <SelectValue placeholder={investigations.length > 0 ? "Seleccionar investigación" : "No hay investigaciones disponibles"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Ninguna</SelectItem>
                {filteredInvestigations.map(inv => (
                  <SelectItem key={inv.id} value={inv.id.toString()}>{inv.titulo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          !selectedInvestigacion ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Ninguna investigación seleccionada</p>
            </div>
          ) : null 
        )}
        
        {selectedInvestigacion && !isEditing && (
          <motion.div 
            className="p-4 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200">{selectedInvestigacion.titulo}</h4>
              
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {selectedInvestigacion.descripcion}
              </p>
              
              <Link 
                to={`/biblioteca/investigaciones`} 
                state={{ selectInvestigacion: selectedInvestigacion.id }} 
                className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 hover:underline transition-colors duration-200"
              >
                <ExternalLink size={14} className="mr-1" />
                Ver investigación
              </Link>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
