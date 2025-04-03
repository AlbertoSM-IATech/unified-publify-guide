
import { toast } from "@/hooks/use-toast";

/**
 * Centralized toast notification service
 * Provides standardized methods for showing different types of notifications
 */
export const toastService = {
  /**
   * Show a success notification
   * @param title The title of the notification
   * @param description Optional description text
   */
  success: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  },

  /**
   * Show an error notification
   * @param title The title of the notification
   * @param description Optional description text
   */
  error: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  },

  /**
   * Show an information notification
   * @param title The title of the notification
   * @param description Optional description text
   */
  info: (title: string, description?: string) => {
    toast({
      title,
      description,
    });
  },
};
