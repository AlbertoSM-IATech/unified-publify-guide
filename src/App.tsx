
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { LibrosList } from "@/pages/Biblioteca/Libros/LibrosList";
import BookDetail from "@/pages/Biblioteca/Libros/BookDetail";
import ColeccionesList from "@/pages/Biblioteca/Colecciones/ColeccionesList";
import ColeccionDetail from "@/pages/Biblioteca/Colecciones/ColeccionDetail";
import { InvestigacionesList } from "@/pages/Investigaciones/InvestigacionesList";
import { Marketing } from "@/pages/Marketing/Marketing";
import { Finanzas } from "@/pages/Finanzas/Finanzas";
import { Configuracion } from "@/pages/Configuracion/Configuracion";
import { Perfil } from "@/pages/Perfil/Perfil";
import { NotFound } from "@/pages/NotFound";
import { useTheme } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import clsx from "clsx";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={clsx("relative", isDark && "dark-theme")}>
      <Toaster />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/biblioteca/libros" element={<LibrosList />} />
          <Route path="/biblioteca/libros/:id" element={<BookDetail />} />
          <Route path="/biblioteca/colecciones" element={<ColeccionesList />} />
          <Route path="/biblioteca/colecciones/:id" element={<ColeccionDetail />} />
          <Route path="/biblioteca/investigaciones" element={<InvestigacionesList />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/finanzas" element={<Finanzas />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
