
import { useAuth } from "@/contexts/AuthContext";
import { toastService } from "@/utils/toast";
import { handleAsync } from "@/utils/errorHandling";

/**
 * Custom hook for authentication operations
 * Provides a simplified interface for working with the auth context
 */
export function useAuthentication() {
  const auth = useAuth();
  
  /**
   * Login function with error handling
   */
  const login = async (email: string, password: string) => {
    return handleAsync(
      async () => {
        const result = await auth.login(email, password);
        toastService.success("Inicio de sesión exitoso", "Bienvenido de nuevo");
        return result;
      },
      "Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo."
    );
  };
  
  /**
   * Logout function with error handling
   */
  const logout = async () => {
    return handleAsync(
      async () => {
        await auth.logout();
        toastService.info("Sesión cerrada", "Has cerrado sesión correctamente");
      },
      "Error al cerrar sesión. Por favor, intenta de nuevo."
    );
  };
  
  /**
   * Update user profile with error handling
   * Note: This assumes auth context has a profile update method
   */
  const updateProfile = async (userData: Partial<typeof auth.user>) => {
    return handleAsync(
      async () => {
        // Check if updateProfile exists on auth context
        if (typeof auth.updateUser === 'function') {
          const result = await auth.updateUser(userData);
          toastService.success("Perfil actualizado", "Tus datos han sido guardados correctamente");
          return result;
        }
        throw new Error("Update profile method not available");
      },
      "Error al actualizar el perfil. Por favor, intenta de nuevo."
    );
  };
  
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    login,
    logout,
    updateProfile,
  };
}
