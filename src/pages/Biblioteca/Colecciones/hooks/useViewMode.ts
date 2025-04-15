
import { useState, useEffect } from "react";

export const useViewMode = (defaultMode: "grid" | "list" = "grid") => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const savedMode = localStorage.getItem("coleccionViewMode");
    return (savedMode === "list" || savedMode === "grid") ? savedMode : defaultMode;
  });
  
  // Persist view mode in localStorage
  useEffect(() => {
    localStorage.setItem("coleccionViewMode", viewMode);
  }, [viewMode]);
  
  return [viewMode, setViewMode] as const;
};
