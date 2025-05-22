
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface InvestigationRelationProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  investigations: any[]; // Investigations from localStorage
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
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Investigación Relacionada</h3>
      
      {isEditing ? (
        <div className="space-y-3 w-full">
          <div className="relative w-full">
            <Input type="text" placeholder="Buscar investigación..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 w-full" />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select onValueChange={handleInvestigacionChange} defaultValue={book.investigacionId ? book.investigacionId.toString() : "none"}>
            <SelectTrigger id="investigacion" className="w-full hover:border-[#FB923C] transition-colors duration-200">
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
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50 w-full">
            Ninguna investigación seleccionada
          </div>
        ) : null 
      )}
      
      {selectedInvestigacion && !isEditing && (
        <Card className="mt-2 overflow-hidden border-slate-800">
          <motion.div 
            className="p-4 bg-slate-900 rounded-md" 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{selectedInvestigacion.titulo}</h4>
              </div>
              
              <p className="text-xs text-slate-300 line-clamp-2">
                {selectedInvestigacion.descripcion}
              </p>
              
              <Link 
                to={`/biblioteca/investigaciones`} 
                state={{ selectInvestigacion: selectedInvestigacion.id }} 
                className="flex items-center text-sm text-amber-400 hover:underline hover:text-[#FB923C] transition-colors duration-200"
              >
                <ExternalLink size={14} className="mr-1" />
                Ver investigación
              </Link>
            </div>
          </motion.div>
        </Card>
      )}
    </div>
  );
};
