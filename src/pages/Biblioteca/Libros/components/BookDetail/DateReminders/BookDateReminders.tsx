
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "../../../types/bookTypes";
import { Calendar, Bell, BellOff } from "lucide-react";
import { ReminderDialog } from "../Notes/ReminderDialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface BookDateRemindersProps {
  book: Book;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  isEditing: boolean;
}

export const BookDateReminders = ({ book, onUpdateBook, isEditing }: BookDateRemindersProps) => {
  const [reminderDialogOpen, setReminderDialogOpen] = useState<'publication' | 'launch' | null>(null);

  const handleSetReminder = (type: 'publication' | 'launch', reminderData: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => {
    const fieldName = type === 'publication' ? 'publicationReminder' : 'launchReminder';
    onUpdateBook({
      [fieldName]: {
        id: `${type}-${Date.now()}`,
        ...reminderData,
        status: 'active' as const
      }
    });
  };

  const handleRemoveReminder = (type: 'publication' | 'launch') => {
    const fieldName = type === 'publication' ? 'publicationReminder' : 'launchReminder';
    onUpdateBook({ [fieldName]: undefined });
  };

  const getDateForReminder = (type: 'publication' | 'launch') => {
    const date = type === 'publication' ? book.fechaPublicacion : book.fechaLanzamiento;
    return date ? new Date(date) : null;
  };

  const renderDateCard = (
    type: 'publication' | 'launch',
    title: string,
    date: string | null,
    reminder: any
  ) => {
    const dateObj = date ? new Date(date) : null;
    const isPast = dateObj ? dateObj < new Date() : false;

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dateObj ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: es })}
              </p>
              
              {reminder && (
                <Badge variant={isPast ? "destructive" : "default"} className="text-xs">
                  <Bell className="h-3 w-3 mr-1" />
                  {format(new Date(reminder.dateTime), "d MMM, HH:mm", { locale: es })}
                </Badge>
              )}
              
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReminderDialogOpen(type)}
                    className="text-xs"
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    {reminder ? "Editar" : "Agregar"} Recordatorio
                  </Button>
                  
                  {reminder && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveReminder(type)}
                      className="text-xs"
                    >
                      <BellOff className="h-3 w-3 mr-1" />
                      Quitar
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No establecida</p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="font-medium">Recordatorios de Fechas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderDateCard(
            'publication',
            'Fecha de Publicación',
            book.fechaPublicacion,
            (book as any).publicationReminder
          )}
          
          {renderDateCard(
            'launch',
            'Fecha de Lanzamiento',
            book.fechaLanzamiento,
            (book as any).launchReminder
          )}
        </div>
      </div>

      {reminderDialogOpen && (
        <ReminderDialog
          isOpen={true}
          onOpenChange={() => setReminderDialogOpen(null)}
          onSetReminder={(reminderData) => {
            handleSetReminder(reminderDialogOpen, reminderData);
            setReminderDialogOpen(null);
          }}
          existingReminder={
            reminderDialogOpen === 'publication' 
              ? (book as any).publicationReminder 
              : (book as any).launchReminder
          }
        />
      )}
    </>
  );
};
