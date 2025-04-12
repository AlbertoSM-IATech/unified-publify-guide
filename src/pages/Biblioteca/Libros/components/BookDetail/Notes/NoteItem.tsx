
import { BookNote } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PenLine, Trash, GripVertical } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

interface NoteItemProps {
  note: BookNote;
  isEditing: boolean;
  onEdit: (noteId: number) => void;
  onDelete: (noteId: number) => void;
}

export const NoteItem = ({ note, isEditing, onEdit, onDelete }: NoteItemProps) => {
  return (
    <Card className="group relative transition-all hover:shadow-md">
      {isEditing && (
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {format(new Date(note.date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => onEdit(note.id)}
              >
                <PenLine className="h-4 w-4" />
                <span className="sr-only">Editar nota</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Eliminar nota</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará permanentemente la nota y no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(note.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4 pt-0">
        <p className="text-sm">{note.text}</p>
      </CardContent>
    </Card>
  );
};
