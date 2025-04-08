
import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  // Determinar si estamos en una ruta de libro no encontrado
  const isBookRoute = location.pathname.includes('/biblioteca/libros/');
  
  // Check if this is an edit route that should be redirected
  if (isBookRoute && location.pathname.endsWith('/edit')) {
    const bookId = location.pathname.split('/').filter(Boolean)[2]; // Gets the ID from the URL
    if (bookId) {
      console.log("Redirecting from edit route to book detail page:", bookId);
      // Redirect to the book detail page as editing is handled internally
      return <Navigate to={`/biblioteca/libros/${bookId}`} replace />;
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center">
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#FB923C]/10 rounded-full filter blur-[80px]" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#3B82F6]/10 rounded-full filter blur-[80px]" />
      
      <motion.div 
        className="relative z-10 max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {isBookRoute ? (
            <BookX className="mx-auto h-24 w-24 text-[#FB923C]" />
          ) : (
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <span className="font-heading text-6xl font-bold text-[#FB923C]">404</span>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
            {isBookRoute ? "Libro no encontrado" : "Página no encontrada"}
          </h1>
          
          <p className="mt-4 text-muted-foreground">
            {isBookRoute 
              ? "El libro que estás buscando no existe o no se pudo cargar correctamente."
              : "Lo sentimos, la página que estás buscando no existe o ha sido movida."
            }
          </p>
          
          <div className="mt-8">
            <Button asChild variant="default" className="bg-[#3B82F6] hover:bg-[#3B82F6]/90">
              <Link to="/biblioteca/libros" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Volver a la biblioteca
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
