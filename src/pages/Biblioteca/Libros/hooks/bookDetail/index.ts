
// Main entry point that composes the specialized hooks
import { useBookData } from './useBookData';
import { useBookForm } from './useBookForm';
import { useBookActions } from './useBookActions';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

/**
 * Main hook for book detail page that composes specialized hooks
 * with improved data persistence
 */
export const useBookDetail = () => {
  // Use the specialized hooks
  const { 
    bookData, 
    setBookData, 
    loading, 
    error, 
    bookId, 
    libroOriginal,
    storedBooks,
    setStoredBooks 
  } = useBookData();
  
  const navigate = useNavigate();
  
  // Show error toast if there's an error loading the book
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error al cargar el libro",
        description: error
      });
    }
  }, [error]);
  
  // Initialize hooks with current book data for form management and actions
  const {
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    formData,
    handleEdit,
    handleCancel,
    handleUpdateBook
  } = useBookForm(bookData);
  
  const {
    handleGoBack,
    handleSave,
    handleDelete
  } = useBookActions(
    bookData,
    setBookData,
    bookId || 0,
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    formData,
    storedBooks,
    setStoredBooks
  );

  // Return a unified API that matches the original hook
  return {
    bookData: isEditing ? {...bookData, ...formData} : bookData, // Merge form data during editing
    isEditing,
    saving,
    loading,
    error,
    formData,
    libroOriginal,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    handleUpdateBook,
  };
};

// Re-export specialized hooks for direct usage if needed
export { useBookData } from './useBookData';
export { useBookForm } from './useBookForm';
export { useBookActions } from './useBookActions';
