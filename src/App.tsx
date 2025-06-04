import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "@/hooks/useTheme";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Libros from "./pages/Biblioteca/Libros/Libros";
import BookDetail from "./pages/Biblioteca/Libros/BookDetail";
import Investigaciones from "./pages/Biblioteca/Investigaciones/Investigaciones";
import InvestigacionDetail from "./pages/Biblioteca/Investigaciones/InvestigacionDetail";
import Colecciones from "./pages/Biblioteca/Colecciones/Colecciones";
import ColeccionDetail from "./pages/Biblioteca/Colecciones/ColeccionDetail";
import ContactoPage from "./pages/ContactoPage";

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
                    <Route path="investigaciones/:id" element={<InvestigacionDetail />} />
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
