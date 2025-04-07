
import { useState, useEffect } from "react";
import { Book } from "../../types/bookTypes";
import { toast } from "@/hooks/use-toast";

/**
 * Hook for managing book form state during editing
 */
export const useBookForm = (bookData: Book | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state for edits
  const [formData, setFormData] = useState<Partial<Book>>({});

  // Reset form data when book data changes
  useEffect(() => {
    setFormData({});
  }, [bookData]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Handle form data updates from child components
  const handleUpdateBook = (updatedData: Partial<Book>) => {
    setFormData(prevData => ({
      ...prevData,
      ...updatedData
    }));
    console.log("Updated form data:", { ...formData, ...updatedData });
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
