
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md">
        <h1 className="font-heading text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl font-medium">Página no encontrada</p>
        <p className="mt-2 text-muted-foreground">
          {isBookRoute 
            ? "El libro que estás buscando no existe o no se pudo cargar correctamente."
            : "Lo sentimos, la página que estás buscando no existe o ha sido movida."
          }
        </p>
        <div className="mt-8">
          <Button asChild variant="default">
            <Link to="/biblioteca/libros">
              <ArrowLeft size={16} className="mr-2" />
              Volver a la biblioteca
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
