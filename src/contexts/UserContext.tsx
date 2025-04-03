
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toastService } from "@/utils/toast";

interface UserPreferences {
  showBookCovers: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
}

interface UserContextType {
  preferences: UserPreferences;
  updatePreference: (key: keyof UserPreferences, value: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  showBookCovers: true,
  emailNotifications: false,
  darkMode: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedPrefs = localStorage.getItem(`user_prefs_${user.id}`);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch (error) {
          console.error("Error parsing user preferences:", error);
        }
      }
    }
  }, [user]);

  // Update a single preference
  const updatePreference = (key: keyof UserPreferences, value: boolean) => {
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: value };
      
      // Save to localStorage
      if (user) {
        localStorage.setItem(`user_prefs_${user.id}`, JSON.stringify(newPrefs));
      }
      
      return newPrefs;
    });
    
    toastService.success("Preferencia actualizada", "Tu configuración ha sido guardada");
  };

  // Reset all preferences to default
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    if (user) {
      localStorage.setItem(`user_prefs_${user.id}`, JSON.stringify(defaultPreferences));
    }
    toastService.info("Preferencias restablecidas", "Se han restaurado las preferencias predeterminadas");
  };

  return (
    <UserContext.Provider
      value={{
        preferences,
        updatePreference,
        resetPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
}
