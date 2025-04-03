
import { ImageIcon, Mail } from "lucide-react";

export const PreferencesSection = () => {
  return (
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
  );
};
