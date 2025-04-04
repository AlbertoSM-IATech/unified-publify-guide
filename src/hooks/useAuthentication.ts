
import { useAuth } from "@/contexts/AuthContext";
import { toastService } from "@/utils/toast";
import { handleAsync } from "@/utils/errorHandling";

/**
 * Custom hook for authentication operations
 * TEMPORARILY MODIFIED: All authentication checks are bypassed for development
 */
export function useAuthentication() {
  const auth = useAuth();
  
  /**
   * Login function with error handling (always succeeds in dev mode)
   */
  const login = async (email: string, password: string) => {
    return handleAsync(
      async () => {
        console.log("Authentication temporarily disabled - login always succeeds");
        const result = await auth.login(email, password);
        toastService.success("Inicio de sesión exitoso", "Acceso concedido (Modo Desarrollo)");
        return result;
      },
      "Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo."
    );
  };
  
  /**
   * Logout function with error handling (user remains logged in for dev)
   */
  const logout = async () => {
    return handleAsync(
      async () => {
        console.log("Authentication temporarily disabled - logout is simulated");
        await auth.logout();
        toastService.info("Sesión cerrada", "Has cerrado sesión correctamente");
        // In development mode, this won't actually prevent access to protected routes
      },
      "Error al cerrar sesión. Por favor, intenta de nuevo."
    );
  };
  
  /**
   * Update user profile with error handling
   */
  const updateProfile = async (userData: Partial<typeof auth.user>) => {
    return handleAsync(
      async () => {
        console.log("Development mode: Profile updates are simulated");
        const result = await auth.updateUser(userData);
        toastService.success("Perfil actualizado", "Tus datos han sido guardados correctamente");
        return result;
      },
      "Error al actualizar el perfil. Por favor, intenta de nuevo."
    );
  };
  
  return {
    // Always return a mock user and authenticated=true in development mode
    user: auth.user || { id: "temp-user-id", email: "demo@publify.com" },
    isAuthenticated: true, // Always authenticated in development mode
    isLoading: false,
    login,
    logout,
    updateProfile,
  };
}
