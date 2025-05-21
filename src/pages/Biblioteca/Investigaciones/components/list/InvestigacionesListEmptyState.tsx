
interface InvestigacionesListEmptyStateProps {
  searchQuery: string;
}

export const InvestigacionesListEmptyState = ({ searchQuery }: InvestigacionesListEmptyStateProps) => {
  return (
    <div className="mt-6 text-center text-muted-foreground">
      {searchQuery ? 'No se encontraron investigaciones con ese criterio.' : 'No hay investigaciones aún. ¡Crea una nueva!'}
    </div>
  );
};
