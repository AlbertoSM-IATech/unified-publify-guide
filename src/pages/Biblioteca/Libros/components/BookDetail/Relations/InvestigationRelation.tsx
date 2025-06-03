
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ExternalLink, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Investigación Relacionada
        </Label>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Conecta este libro con una investigación específica
        </p>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Buscar investigación..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-9 border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50" 
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          </div>
          
          <Select onValueChange={handleInvestigacionChange} defaultValue={book.investigacionId ? book.investigacionId.toString() : "none"}>
            <SelectTrigger className="border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50">
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
          <div className="text-center py-6 text-neutral-400 dark:text-neutral-500">
            <FileText className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Ninguna investigación seleccionada</p>
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
            
            <Button asChild size="sm" className="bg-[#FB923C] hover:bg-[#FB923C]/90 text-white">
              <Link 
                to={`/biblioteca/investigaciones`} 
                state={{ selectInvestigacion: selectedInvestigacion.id }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Ver investigación
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
