
import { MegaphoneIcon } from "lucide-react";

export const Marketing = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Marketing</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tus campañas de marketing y promoción
        </p>
      </div>

      {/* Empty Marketing Section - Placeholder for future development */}
      <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <MegaphoneIcon size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-medium">Marketing</h2>
              <p className="text-sm text-muted-foreground">
                Esta sección está en desarrollo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
