
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
  updateUser: (userData: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  setNewPassword: (token: string, password: string) => Promise<void>;
};

// Contexto completo
type AuthContextType = AuthState & AuthActions;

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TEMPORARY: Set default authentication state to authenticated with a mock user
  const [authState, setAuthState] = useState<AuthState>({
    user: { id: "temp-user-id", email: "demo@publify.com", nombre: "Usuario Temporal" },
    isAuthenticated: true, // Always authenticated by default
    isLoading: false,
  });

  // Placeholder para las funciones de autenticación
  // Estas serán reemplazadas por implementaciones reales más adelante
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    // TEMPORARY: Always succeed with login
    console.log(`Login simulado con: ${email}`);
    
    // Simulación de usuario
    const user = { id: "temp-user-id", email, nombre: "Usuario Temporal" };
    
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
    const user = { id: "temp-user-id", email };
    
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
  
  // Nueva función para establecer nueva contraseña después de reset
  const setNewPassword = async (token: string, password: string) => {
    console.log(`Estableciendo nueva contraseña con token: ${token}`);
    // Esta funcionalidad se implementará con Supabase
  };
  
  // Nueva función para verificación de email
  const verifyEmail = async (token: string) => {
    console.log(`Verificando email con token: ${token}`);
    // Esta funcionalidad se implementará con Supabase
  };
  
  // Nueva función para reenviar email de verificación
  const resendVerificationEmail = async (email: string) => {
    console.log(`Reenviando email de verificación a: ${email}`);
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
    verifyEmail,
    resendVerificationEmail,
    setNewPassword,
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
