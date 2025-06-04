
import { useState } from "react";
import { BookNote } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PenLine, Trash, GripVertical, Bell, BellOff, Calendar, Check, X } from "lucide-react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReminderDialog } from "./ReminderDialog";

interface NoteItemProps {
  note: BookNote;
  isEditing: boolean;
  onEdit: (noteId: number) => void;
  onDelete: (noteId: number) => void;
  onSetReminder: (noteId: number, reminder: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => void;
  onRemoveReminder: (noteId: number) => void;
  onUpdateNote?: (noteId: number, newText: string) => void;
}

export const NoteItem = ({ 
  note, 
  isEditing, 
  onEdit, 
  onDelete, 
  onSetReminder, 
  onRemoveReminder,
  onUpdateNote 
}: NoteItemProps) => {
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editText, setEditText] = useState(note?.text || "");

  // Validaciones de seguridad
  if (!note || typeof note.id === 'undefined') {
    console.log('NoteItem: Invalid note data', note);
    return null;
  }

  const handleSetReminder = (reminderData: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => {
    try {
      onSetReminder(note.id, reminderData);
    } catch (error) {
      console.error('Error setting reminder:', error);
    }
  };

  const handleSaveEdit = () => {
    if (onUpdateNote && editText.trim()) {
      try {
        onUpdateNote(note.id, editText);
        setIsEditingText(false);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditText(note?.text || "");
    setIsEditingText(false);
  };

  const formatReminderDate = (dateTime: string) => {
    try {
      return format(new Date(dateTime), "d MMM yyyy, HH:mm", { locale: es });
    } catch (error) {
      console.error('Error formatting date:', error);
      return "Fecha inválida";
    }
  };

  const isReminderPast = (dateTime: string) => {
    try {
      return new Date(dateTime) < new Date();
    } catch (error) {
      console.error('Error checking if reminder is past:', error);
      return false;
    }
  };

  const formatNoteDate = (date: string) => {
    try {
      return format(new Date(date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
    } catch (error) {
      console.error('Error formatting note date:', error);
      return "Sin fecha";
    }
  };

  return (
    <>
      <Card className="group relative transition-all hover:shadow-md">
        {isEditing && (
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {note.date ? formatNoteDate(note.date) : "Sin fecha"}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => setIsReminderDialogOpen(true)}
                  title={note.reminder ? "Editar recordatorio" : "Agregar recordatorio"}
                >
                  <Bell className={`h-4 w-4 ${note.reminder ? 'text-blue-500' : ''}`} />
                </Button>
                {note.reminder && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => onRemoveReminder(note.id)}
                    title="Quitar recordatorio"
                  >
                    <BellOff className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
                {!isEditingText ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setIsEditingText(true)}
                  >
                    <PenLine className="h-4 w-4" />
                    <span className="sr-only">Editar nota</span>
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={handleSaveEdit}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Guardar</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Cancelar</span>
                    </Button>
                  </>
                )}
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
          
          {/* Mostrar información del recordatorio */}
          {note.reminder && (
            <div className="mt-2">
              <Badge 
                variant={isReminderPast(note.reminder.dateTime) ? "destructive" : "default"}
                className="text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                {formatReminderDate(note.reminder.dateTime)}
              </Badge>
              {note.reminder.title && (
                <p className="text-xs text-muted-foreground mt-1">{note.reminder.title}</p>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="pb-4 px-4 pt-0">
          {isEditingText ? (
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="resize-none"
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{note.text || "Sin contenido"}</p>
          )}
        </CardContent>
      </Card>

      <ReminderDialog
        isOpen={isReminderDialogOpen}
        onOpenChange={setIsReminderDialogOpen}
        onSetReminder={handleSetReminder}
        existingReminder={note.reminder}
      />
    </>
  );
};
