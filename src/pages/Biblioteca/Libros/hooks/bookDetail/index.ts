
// Main entry point that composes the specialized hooks
import { useBookData } from './useBookData';
import { useBookForm } from './useBookForm';
import { useBookActions } from './useBookActions';

/**
 * Main hook for book detail page that composes specialized hooks
 */
export const useBookDetail = () => {
  // Use the specialized hooks
  const { bookData, setBookData, loading, error, bookId, libroOriginal } = useBookData();
  
  // Only initialize useBookForm and useBookActions if we have book data
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
    bookId,
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    formData
  );

  // Return a unified API that matches the original hook
  return {
    bookData,
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
