
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ChartErrorFallbackProps {
  title: string;
  className?: string;
  height?: string | number;
}

export const ChartErrorFallback: React.FC<ChartErrorFallbackProps> = ({ title, className, height = "350px" }) => (
  <Card className={className} style={{ height }}>
    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Error al cargar gráfico</h3>
      <p className="text-muted-foreground">
        No se pudo cargar el gráfico {title}. Intente recargar la página.
      </p>
    </CardContent>
  </Card>
);

