
import { User, Mail, Key, ImageIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Perfil</h1>
        <p className="mt-1 text-muted-foreground">Gestiona tu perfil y preferencias personales</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Información principal */}
        <div className="rounded-lg border bg-card shadow-sm md:col-span-4">
          <div className="flex flex-col items-center p-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <User size={40} className="text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-medium">
              {user?.nombre || "Usuario"}
            </h2>
            <p className="text-muted-foreground">{user?.email || "usuario@ejemplo.com"}</p>
            <button className="mt-4 w-full rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
              Cambiar imagen
            </button>
          </div>
        </div>

        {/* Formulario de datos personales */}
        <div className="rounded-lg border bg-card shadow-sm md:col-span-8">
          <div className="p-6">
            <h2 className="font-heading text-lg font-medium">Información Personal</h2>
            <p className="text-sm text-muted-foreground">
              Actualiza tu información personal y cómo quieres que se muestre
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="mb-1 block text-sm font-medium">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      id="nombre"
                      className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Tu nombre"
                      defaultValue={user?.nombre || ""}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="tu@email.com"
                      defaultValue={user?.email || ""}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Key size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deja en blanco si no quieres cambiar tu contraseña
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preferencias */}
        <div className="rounded-lg border bg-card shadow-sm md:col-span-12">
          <div className="p-6">
            <h2 className="font-heading text-lg font-medium">Preferencias</h2>
            <p className="text-sm text-muted-foreground">
              Personaliza la aplicación según tus necesidades
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Visualización de portadas</h3>
                    <p className="text-xs text-muted-foreground">
                      Mostrar portadas de libros en la vista de cuadrícula
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Notificaciones por email</h3>
                    <p className="text-xs text-muted-foreground">
                      Recibir actualizaciones y novedades por email
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
