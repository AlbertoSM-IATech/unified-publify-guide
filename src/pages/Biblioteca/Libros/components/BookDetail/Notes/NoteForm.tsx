
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NoteFormProps {
  noteText: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const NoteForm = ({ 
  noteText, 
  onTextChange, 
  onSave, 
  onCancel, 
  isEditing = false 
}: NoteFormProps) => {
  return (
    <div className="mb-6 space-y-4 rounded-md border p-4">
      <Textarea
        placeholder="Escribe tu nota aquí..."
        value={noteText}
        onChange={(e) => onTextChange(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button size="sm" onClick={onSave}>
          {isEditing ? "Guardar Cambios" : "Guardar Nota"}
        </Button>
      </div>
    </div>
  );
};
