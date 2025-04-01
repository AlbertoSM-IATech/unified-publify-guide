
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/contexts/AuthContext";

import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LibrosList from "./pages/Biblioteca/Libros/LibrosList";
import ColeccionesList from "./pages/Biblioteca/Colecciones/ColeccionesList";
import InvestigacionesList from "./pages/Biblioteca/Investigaciones/InvestigacionesList";
import Marketing from "./pages/Marketing/Marketing";
import Finanzas from "./pages/Finanzas/Finanzas";
import Perfil from "./pages/Perfil/Perfil";
import Configuracion from "./pages/Configuracion/Configuracion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Ruta para la landing page */}
              <Route path="/landing" element={<LandingPage />} />
              
              {/* Rutas protegidas dentro del layout principal */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route index element={<Navigate to="/" replace />} />
                
                {/* Rutas de Biblioteca */}
                <Route path="/biblioteca/libros" element={<LibrosList />} />
                <Route path="/biblioteca/colecciones" element={<ColeccionesList />} />
                <Route path="/biblioteca/investigaciones" element={<InvestigacionesList />} />
                
                {/* Rutas de Marketing y Finanzas */}
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/finanzas" element={<Finanzas />} />
                
                {/* Rutas de Perfil y Configuración */}
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/configuracion" element={<Configuracion />} />
              </Route>
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
