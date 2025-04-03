
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LandingPage } from "@/pages/LandingPage/LandingPage";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { LibrosList } from "@/pages/Biblioteca/Libros/LibrosList";
import BookDetail from "@/pages/Biblioteca/Libros/BookDetail";
import ColeccionesList from "@/pages/Biblioteca/Colecciones/ColeccionesList";
import ColeccionDetail from "@/pages/Biblioteca/Colecciones/ColeccionDetail";
import { InvestigacionesList } from "@/pages/Biblioteca/Investigaciones/InvestigacionesList";
import { Marketing } from "@/pages/Marketing/Marketing";
import { Finanzas } from "@/pages/Finanzas/Finanzas";
import { Configuracion } from "@/pages/Configuracion/Configuracion";
import { Perfil } from "@/pages/Perfil/Perfil";
import { NotFound } from "@/pages/NotFound";
import { useTheme } from "@/hooks/useTheme";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import clsx from "clsx";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={clsx("relative min-h-screen", isDark && "dark-theme")}>
      <Toaster />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Biblioteca section */}
            <Route path="/biblioteca">
              <Route path="libros" element={<LibrosList />} />
              <Route path="libros/:id" element={<BookDetail />} />
              <Route path="colecciones" element={<ColeccionesList />} />
              <Route path="colecciones/:id" element={<ColeccionDetail />} />
              <Route path="investigaciones" element={<InvestigacionesList />} />
            </Route>
            
            {/* Marketing section */}
            <Route path="/marketing" element={<Marketing />} />
            
            {/* Finanzas section */}
            <Route path="/finanzas" element={<Finanzas />} />
            
            {/* Settings & profile */}
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Route>
        
        {/* 404 catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
