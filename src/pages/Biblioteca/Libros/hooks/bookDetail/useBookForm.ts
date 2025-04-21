
import { useState, useEffect } from "react";
import { Book } from "../../types/bookTypes";
import { toast } from "@/hooks/use-toast";

/**
 * Hook for managing book form state during editing
 */
export const useBookForm = (bookData: Book | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state for edits with live preview
  const [formData, setFormData] = useState<Partial<Book>>({});

  // Reset form data when book data changes
  useEffect(() => {
    if (bookData) {
      setFormData(bookData);
    } else {
      setFormData({});
    }
  }, [bookData]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(bookData || {});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(bookData || {});
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Handle form data updates from child components with live preview
  const handleUpdateBook = (updatedData: Partial<Book>) => {
    setFormData(prevData => {
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
