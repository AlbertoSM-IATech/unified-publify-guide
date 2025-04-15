
import { useState, useEffect } from "react";

export const useViewMode = (defaultMode: "grid" | "list" = "grid") => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    try {
      const savedMode = localStorage.getItem("libroViewMode");
      return (savedMode === "list" || savedMode === "grid") ? savedMode : defaultMode;
    } catch (e) {
      console.error("Error accessing localStorage for viewMode:", e);
      return defaultMode;
    }
  });
  
  // Persist view mode in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("libroViewMode", viewMode);
    } catch (e) {
      console.error("Error saving viewMode to localStorage:", e);
    }
  }, [viewMode]);
  
  return [viewMode, setViewMode] as const;
};
