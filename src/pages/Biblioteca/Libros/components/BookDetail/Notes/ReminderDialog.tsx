
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Bell, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ReminderDialogProps {
  onSetReminder: (reminder: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => void;
  existingReminder?: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReminderDialog = ({ 
  onSetReminder, 
  existingReminder, 
  isOpen, 
  onOpenChange 
}: ReminderDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    existingReminder ? new Date(existingReminder.dateTime) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(
    existingReminder 
      ? format(new Date(existingReminder.dateTime), "HH:mm")
      : "09:00"
  );
  const [notificationType, setNotificationType] = useState<'browser' | 'email'>(
    existingReminder?.type || 'browser'
  );
  const [title, setTitle] = useState(existingReminder?.title || "");

  const handleSave = () => {
    if (!selectedDate) return;

    const [hours, minutes] = selectedTime.split(':');
    const dateTime = new Date(selectedDate);
    dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    onSetReminder({
      dateTime: dateTime.toISOString(),
      type: notificationType,
      title: title || "Recordatorio de nota"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {existingReminder ? "Editar Recordatorio" : "Agregar Recordatorio"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reminder-title">Título del recordatorio</Label>
            <Input
              id="reminder-title"
              placeholder="Recordatorio de nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Fecha</Label>
            <DatePicker
              date={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reminder-time">Hora</Label>
            <Input
              id="reminder-time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tipo de notificación</Label>
            <Select 
              value={notificationType} 
              onValueChange={(value: 'browser' | 'email') => setNotificationType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="browser">Notificación del navegador</SelectItem>
                <SelectItem value="email">Email (próximamente)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!selectedDate}>
            {existingReminder ? "Actualizar" : "Crear"} Recordatorio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
