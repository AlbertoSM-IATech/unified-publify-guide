
import { Outlet } from "react-router-dom";

/**
 * Protected route component - TEMPORARILY DISABLED
 * Currently allows all access without authentication checks
 */
export const ProtectedRoute = () => {
  // TEMPORARY: Allow access to all routes without authentication
  console.log("Authentication check bypassed - temporary development mode");
  
  // Always render the protected content without checking authentication
  return <Outlet />;
};
