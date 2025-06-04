
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookNote } from '@/pages/Biblioteca/Libros/types/bookTypes';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  dateTime: string;
  type: 'reminder' | 'publication' | 'launch';
  bookId?: number;
  noteId?: number;
  read: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Cargar notificaciones desde localStorage al inicializar
  useEffect(() => {
    const savedNotifications = localStorage.getItem('app-notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Guardar notificaciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('app-notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Verificar recordatorios pendientes cada minuto
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date().getTime();
      
      // Verificar todas las notas con recordatorios en localStorage
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        try {
          const books = JSON.parse(storedBooks);
          books.forEach((book: any) => {
            if (book.notes) {
              book.notes.forEach((note: BookNote) => {
                if (note.reminder && note.reminder.status === 'active') {
                  const reminderTime = new Date(note.reminder.dateTime).getTime();
                  const timeDiff = reminderTime - now;
                  
                  // Si el recordatorio es en los próximos 60 segundos y no existe ya una notificación
                  if (timeDiff > 0 && timeDiff <= 60000) {
                    const existingNotification = notifications.find(n => 
                      n.noteId === note.id && n.type === 'reminder'
                    );
                    
                    if (!existingNotification) {
                      addNotification({
                        title: note.reminder.title || 'Recordatorio de nota',
                        message: note.text.substring(0, 100) + (note.text.length > 100 ? '...' : ''),
                        dateTime: note.reminder.dateTime,
                        type: 'reminder',
                        bookId: book.id,
                        noteId: note.id
                      });
                    }
                  }
                }
              });
            }
          });
        } catch (error) {
          console.error('Error checking reminders:', error);
        }
      }
    };

    // Verificar inmediatamente y luego cada minuto
    checkReminders();
    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [notifications]);

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'read'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: `${Date.now()}-${Math.random()}`,
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
