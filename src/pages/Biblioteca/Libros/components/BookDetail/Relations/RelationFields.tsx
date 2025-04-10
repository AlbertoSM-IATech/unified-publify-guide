
import { Book } from "../../../types/bookTypes";
import { InvestigationRelation } from "./InvestigationRelation";
import { CollectionRelation } from "./CollectionRelation";

interface RelationFieldsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const RelationFields = ({ book, isEditing, onUpdateBook }: RelationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <InvestigationRelation 
        book={book}
        isEditing={isEditing}
        onUpdateBook={onUpdateBook}
      />
      <CollectionRelation
        book={book}
        isEditing={isEditing}
        onUpdateBook={onUpdateBook}
      />
    </div>
  );
};
