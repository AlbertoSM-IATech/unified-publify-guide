
import { toast } from "@/hooks/use-toast";

export const useBookNotifications = () => {
  const notifyBookUpdate = () => {
    const updateEvent = new CustomEvent('publify_books_updated');
    window.dispatchEvent(updateEvent);
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const showSuccessToast = (message: string) => {
    toast({
      title: "Éxito",
      description: message,
    });
  };

  return {
    notifyBookUpdate,
    showErrorToast,
    showSuccessToast
  };
};
