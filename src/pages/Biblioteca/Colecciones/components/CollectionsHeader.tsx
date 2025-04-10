
import { Plus } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { ReactNode } from "react";

interface CollectionsHeaderProps {
  onCreateCollection: () => void;
  children?: ReactNode;
}

export const CollectionsHeader = ({ onCreateCollection, children }: CollectionsHeaderProps) => {
  return (
    <PageSection
      title="Colecciones"
      description="Organiza tus libros en colecciones temáticas"
      action={
        <button 
          className="flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          onClick={onCreateCollection}
        >
          <Plus size={18} className="mr-2" />
          Nueva Colección
        </button>
      }
    >
      {children}
    </PageSection>
  );
};
