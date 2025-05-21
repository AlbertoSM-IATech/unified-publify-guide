
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { investigacionesSimuladas } from "../Libros/utils/mockData/investigacionesData"; // Esta importación parece incorrecta, debería ser de investigaciones
import { CreateInvestigationDialog } from "./components/CreateInvestigationDialog";
import { useBookData } from "@/hooks/useBookData";
import { toast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Investigacion, NewInvestigationData } from "./types/investigacionTypes";

import { InvestigacionesListHeader } from "./components/list/InvestigacionesListHeader";
import { InvestigacionesListToolbar } from "./components/list/InvestigacionesListToolbar";
import { InvestigacionesListGrid } from "./components/list/InvestigacionesListGrid";
import { InvestigacionesListEmptyState } from "./components/list/InvestigacionesListEmptyState";
import { InvestigacionDetailView } from "./components/list/InvestigacionDetailView";

export const InvestigacionesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [investigaciones, setInvestigaciones] = useLocalStorage<Investigacion[]>(
    'publify_user_investigaciones',
    investigacionesSimuladas // Usar datos simulados de investigaciones, no de libros
  );
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const location = useLocation();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { books: availableBooks, isLoading: isLoadingBooks } = useBookData();

  useEffect(() => {
    if (location.state?.selectInvestigacion) {
      const investigacionId = location.state.selectInvestigacion;
      // Asegurarse de que investigaciones es un array antes de usar find
      const investigacion = Array.isArray(investigaciones) && 
        investigaciones.find(inv => String(inv.id) === String(investigacionId));
      
      if (investigacion) {
        setSelectedInvestigacion(investigacion);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, investigaciones]);

  const filteredInvestigaciones = (investigaciones || []).filter(investigacion => 
    investigacion.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (investigacion.descripcion && investigacion.descripcion.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (investigacion.libroTitulo && investigacion.libroTitulo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectInvestigacion = (investigacion: Investigacion) => {
    setSelectedInvestigacion(investigacion);
  };

  const handleVolver = () => {
    setSelectedInvestigacion(null);
  };

  const handleCreateInvestigacion = (data: NewInvestigationData) => {
    if (!data.libroId) {
      toast({
        title: "Error",
        description: "Debe seleccionar un libro asociado.",
        variant: "destructive",
      });
      return;
    }
    const selectedBook = availableBooks.find(b => String(b.id) === data.libroId); 
    if (!selectedBook) {
      toast({
        title: "Error",
        description: "El libro seleccionado no es válido o no se encontró.",
        variant: "destructive",
      });
      return;
    }

    const currentInvestigaciones = investigaciones || [];
    let newId: string | number;
    if (currentInvestigaciones.length > 0) {
        const allNumericIds = currentInvestigaciones.every(inv => typeof inv.id === 'number' || !isNaN(Number(String(inv.id))));
        if (allNumericIds) {
            // Convertimos todos los IDs a números para encontrar el máximo
            newId = Math.max(0, ...currentInvestigaciones.map(inv => Number(String(inv.id)))) + 1;
        } else {
            newId = `inv_${Date.now()}`;
            console.warn("Generando ID de investigación como string no numérico. Considerar una mejor estrategia si esto es intencional.");
        }
    } else {
        newId = 1;
    }
    
    const newInvestigation: Investigacion = {
      id: newId, 
      titulo: data.titulo,
      descripcion: data.descripcion,
      libroId: selectedBook.id.toString(), 
      libroTitulo: selectedBook.titulo,
      fechaActualizacion: new Date().toISOString().split('T')[0],
    };
    setInvestigaciones([...currentInvestigaciones, newInvestigation]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Investigación Creada",
      description: `"${data.titulo}" ha sido creada exitosamente.`,
    });
  };

  if (selectedInvestigacion) {
    return (
      <InvestigacionDetailView 
        investigacion={selectedInvestigacion} 
        onVolver={handleVolver} 
      />
    );
  }
  
  return (
    <div className="animate-fade-in">
      <InvestigacionesListHeader onNuevaInvestigacionClick={() => setIsCreateDialogOpen(true)} />
      <InvestigacionesListToolbar 
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {Array.isArray(filteredInvestigaciones) && filteredInvestigaciones.length > 0 ? (
        <InvestigacionesListGrid 
          investigaciones={filteredInvestigaciones} 
          onSelectInvestigacion={handleSelectInvestigacion} 
        />
      ) : (
        <InvestigacionesListEmptyState searchQuery={searchQuery} />
      )}

      <CreateInvestigationDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateInvestigacion}
        books={availableBooks}
        isLoadingBooks={isLoadingBooks}
      />
    </div>
  );
};

export default InvestigacionesList;
