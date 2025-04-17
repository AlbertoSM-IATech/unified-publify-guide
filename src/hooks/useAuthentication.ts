
import { useAuth } from "@/contexts/AuthContext";
import { toastService } from "@/utils/toast";
import { handleAsync } from "@/utils/errorHandling";

/**
 * Custom hook for authentication operations
 * MODIFIED: All authentication operations are completely mocked
 */
export function useAuthentication() {
  const auth = useAuth();
  
  /**
   * Login function (always succeeds in mock mode)
   */
  const login = async (email: string, password: string) => {
    return handleAsync(
      async () => {
        console.log("[MOCK] Authentication disabled - login always succeeds");
        // Even if auth.login exists, we won't actually call it
        // Instead, we'll simulate a successful login
        
        // Create a mock user
        const mockUser = {
          id: "mock-user-id",
          email: email || "demo@publify.com",
          nombre: "Usuario Demo",
          avatarUrl: "https://i.pravatar.cc/150?img=5",
        };
        
        // Save to localStorage for persistence
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        toastService.success("Inicio de sesión exitoso", "Acceso concedido (Modo Desarrollo)");
        
        return { user: mockUser };
      },
      "Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo."
    );
  };
  
  /**
   * Logout function (simulated in mock mode)
   */
  const logout = async () => {
    return handleAsync(
      async () => {
        console.log("[MOCK] Authentication disabled - logout is simulated");
        
        // Just to be safe, clear any user data in localStorage
        localStorage.removeItem('userData');
        
        toastService.info("Sesión cerrada", "Has cerrado sesión correctamente");
      },
      "Error al cerrar sesión. Por favor, intenta de nuevo."
    );
  };
  
  /**
   * Update user profile (simulated in mock mode)
   */
  const updateProfile = async (userData: Partial<typeof auth.user>) => {
    return handleAsync(
      async () => {
        console.log("[MOCK] Profile updates are simulated", userData);
        
        // Get current user data
        const storedUser = localStorage.getItem('userData');
        const currentUser = storedUser ? JSON.parse(storedUser) : { 
          id: "mock-user-id", 
          email: "demo@publify.com",
          nombre: "Usuario Demo",
          avatarUrl: "https://i.pravatar.cc/150?img=5"
        };
        
        // Update with new data
        const updatedUser = { ...currentUser, ...userData };
        
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        toastService.success("Perfil actualizado", "Tus datos han sido guardados correctamente");
        
        return updatedUser;
      },
      "Error al actualizar el perfil. Por favor, intenta de nuevo."
    );
  };
  
  // Get user from localStorage or return a default mock user
  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : { 
      id: "mock-user-id", 
      email: "demo@publify.com",
      nombre: "Usuario Demo",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    };
  };
  
  return {
    user: getUserFromStorage(),
    isAuthenticated: true, // Siempre autenticado en modo mock
    isLoading: false,
    login,
    logout,
    updateProfile,
  };
}
