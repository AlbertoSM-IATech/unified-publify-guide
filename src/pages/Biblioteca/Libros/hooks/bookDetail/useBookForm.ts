
import { useState, useEffect } from "react";
import { Book } from "../../types/bookTypes";
import { toast } from "@/hooks/use-toast";

/**
 * Hook for managing book form state during editing with real-time preview
 */
export const useBookForm = (bookData: Book | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state for edits with real-time preview
  const [formData, setFormData] = useState<Partial<Book>>({});

  // Sync form data when book data changes
  useEffect(() => {
    if (bookData) {
      // Only reset form data if we're not in editing mode to prevent data loss
      // during ongoing edits or when book data refreshes from API
      if (!isEditing) {
        console.log("Resetting form data with book data:", bookData);
        setFormData(bookData);
      }
    } else {
      setFormData({});
    }
  }, [bookData, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    // Ensure formData is up-to-date with current bookData when entering edit mode
    setFormData(bookData || {});
    console.log("Entering edit mode with data:", bookData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to match original book data when cancelling
    setFormData(bookData || {});
    console.log("Edit cancelled - reverting changes");
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Handle form data updates from child components with real-time preview
  const handleUpdateBook = (updatedData: Partial<Book>) => {
    if (!isEditing) {
      console.warn("Attempted to update form data while not in edit mode");
      return;
    }
    
    setFormData(prevData => {
      // Deep merge of updatedData into prevData to ensure nested objects are properly merged
      const newData = { ...prevData, ...updatedData };
      console.log("Updated form data:", newData);
      return newData;
    });
  };

  return {
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    formData,
    handleEdit,
    handleCancel,
    handleUpdateBook
  };
};
