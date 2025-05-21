import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { investigacionesSimuladas } from "../Libros/utils/librosUtils";
import { CreateInvestigationDialog } from "./components/CreateInvestigationDialog"; // Mantener si es específico o moverlo si es más genérico
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
    investigacionesSimuladas
  );
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const location = useLocation();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { books: availableBooks, isLoading: isLoadingBooks } = useBookData();

  useEffect(() => {
    if (location.state?.selectInvestigacion) {
      const investigacionId = location.state.selectInvestigacion;
      const investigacion = investigaciones && investigaciones.find(inv => inv.id === investigacionId);
      if (investigacion) {
        setSelectedInvestigacion(investigacion);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, investigaciones]);

  const filteredInvestigaciones = (investigaciones || []).filter(investigacion => 
    investigacion.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (investigacion.descripcion && investigacion.descripcion.toLowerCase().includes(searchQuery.toLowerCase())) || 
    investigacion.libroTitulo.toLowerCase().includes(searchQuery.toLowerCase())
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
    const selectedBook = availableBooks.find(b => b.id === data.libroId);
    if (!selectedBook) {
      toast({
        title: "Error",
        description: "El libro seleccionado no es válido.",
        variant: "destructive",
      });
      return;
    }

    const currentInvestigaciones = investigaciones || [];
    const newId = currentInvestigaciones.length > 0 ? Math.max(...currentInvestigaciones.map(inv => inv.id)) + 1 : 1;
    const newInvestigation: Investigacion = {
      id: newId,
      titulo: data.titulo,
      descripcion: data.descripcion,
      libroId: selectedBook.id,
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
