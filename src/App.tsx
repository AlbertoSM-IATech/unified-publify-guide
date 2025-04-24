import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LandingPage } from "@/pages/LandingPage/LandingPage";
import { Login } from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import { ForgotPassword } from "@/pages/Auth/ForgotPassword";
import { ResetPassword } from "@/pages/Auth/ResetPassword";
import { VerifyEmail } from "@/pages/Auth/VerifyEmail";
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
import { ErrorState } from "@/components/common/ErrorState";
import { Suspense } from "react";
import { LoadingState } from "@/components/common/LoadingState";
import clsx from "clsx";
import { TermsAndConditions } from "@/pages/Legal/TermsAndConditions";
import { PrivacyPolicy } from "@/pages/Legal/PrivacyPolicy";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  useEffect(() => {
    try {
      localStorage.setItem('test', 'test');
      const test = localStorage.getItem('test');
      if (test !== 'test') {
        console.error("LocalStorage not working properly");
      } else {
        console.log("LocalStorage working correctly");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  return (
    <div className={clsx("relative min-h-screen", isDark && "dark-theme")}>
      <Toaster />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={
              <Suspense fallback={<LoadingState text="Cargando dashboard..." />}>
                <Dashboard />
              </Suspense>
            } />
            
            <Route path="/biblioteca">
              <Route index element={<Navigate to="/biblioteca/libros" replace />} />
              <Route path="libros" element={
                <Suspense fallback={<LoadingState text="Cargando libros..." />}>
                  <LibrosList />
                </Suspense>
              } />
              <Route path="libros/:id" element={
                <Suspense fallback={<LoadingState text="Cargando detalle..." />}>
                  <BookDetail />
                </Suspense>
              } />
              <Route path="colecciones" element={
                <Suspense fallback={<LoadingState text="Cargando colecciones..." />}>
                  <ColeccionesList />
                </Suspense>
              } />
              <Route path="colecciones/:id" element={
                <Suspense fallback={<LoadingState text="Cargando detalle..." />}>
                  <ColeccionDetail />
                </Suspense>
              } />
              <Route path="investigaciones" element={
                <Suspense fallback={<LoadingState text="Cargando investigaciones..." />}>
                  <InvestigacionesList />
                </Suspense>
              } />
            </Route>
            
            <Route path="/marketing" element={<Marketing />} />
            
            <Route path="/finanzas" element={<Finanzas />} />
            
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Route>
        
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
