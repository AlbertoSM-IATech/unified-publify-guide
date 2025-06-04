
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "@/hooks/useTheme";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProfilePage from "./pages/Perfil/Perfil";
import Biblioteca from "./pages/Dashboard/Dashboard";
import Libros from "./pages/Biblioteca/Libros/LibrosList";
import BookDetail from "./pages/Biblioteca/Libros/BookDetail";
import Investigaciones from "./pages/Biblioteca/Investigaciones/InvestigacionesList";
import Colecciones from "./pages/Biblioteca/Colecciones/ColeccionesList";
import ColeccionDetail from "./pages/Biblioteca/Colecciones/ColeccionDetail";
import ContactoPage from "./pages/Contact/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="/perfil" element={<ProfilePage />} />
                  <Route path="/biblioteca" element={<MainLayout />}>
                    <Route index element={<Biblioteca />} />
                    <Route path="libros" element={<Libros />} />
                    <Route path="libros/:id" element={<BookDetail />} />
                    <Route path="investigaciones" element={<Investigaciones />} />
                    <Route path="colecciones" element={<Colecciones />} />
                    <Route path="colecciones/:id" element={<ColeccionDetail />} />
                  </Route>
                </Routes>
              </div>
              <Toaster />
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
