
import React, { createContext, useContext, useState } from "react";

// Tipos de usuario
type User = {
  id: string;
  email: string;
  nombre?: string;
  avatarUrl?: string;
};

// Estado de autenticación
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Acciones de autenticación
type AuthActions = {
  // Estas funciones serán implementadas con Supabase más adelante
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>; // Add the updateUser method
};

// Contexto completo
type AuthContextType = AuthState & AuthActions;

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Por ahora simulamos un estado inicial - luego lo integraremos con Supabase
  const [authState, setAuthState] = useState<AuthState>({
    user: null, // Usuario actual
    isAuthenticated: false, // ¿Está autenticado?
    isLoading: false, // ¿Está cargando?
  });

  // Placeholder para las funciones de autenticación
  // Estas serán reemplazadas por implementaciones reales más adelante
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    // Simulación de login exitoso (se reemplazará con Supabase)
    console.log(`Login intento con: ${email}`);
    
    // Simulación de usuario
    const user = { id: "123", email };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    console.log(`Registro intento con: ${email}`);
    
    // Simulación de usuario nuevo
    const user = { id: "123", email };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    console.log("Logout intento");
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const resetPassword = async (email: string) => {
    console.log(`Reseteo de contraseña para: ${email}`);
    // Esta funcionalidad se implementará con Supabase
  };

  // Implementación de actualización de usuario
  const updateUser = async (userData: Partial<User>) => {
    if (!authState.user) return;
    
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    // Simulamos actualización del usuario
    console.log(`Actualización de usuario: ${JSON.stringify(userData)}`);
    
    const updatedUser = {
      ...authState.user,
      ...userData
    };
    
    setAuthState({
      user: updatedUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  // Exportar todo el estado y las acciones
  const authContextValue: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    resetPassword,
    updateUser,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  
  return context;
};
