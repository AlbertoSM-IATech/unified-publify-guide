
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { NuevoRegistro } from "../types/finanzasTypes";

export const useFinancialForm = (
  agregarRegistroFinanciero: (registro: any) => void
) => {
  const { toast } = useToast();
  const [nuevoRegistro, setNuevoRegistro] = useState<NuevoRegistro>({
    fecha: new Date(),
    ingresos: 0,
    gastos: 0,
    concepto: "",
    observaciones: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<NuevoRegistro, 'fecha'>
  ) => {
    const value = field === "ingresos" || field === "gastos" 
      ? Number(e.target.value) 
      : e.target.value;
      
    setNuevoRegistro({ ...nuevoRegistro, [field]: value });
  };

  const handleDateChange = (date: Date) => {
    setNuevoRegistro(prev => ({ ...prev, fecha: date }));
  };

  const handleSubmitRegistro = () => {
    if (!nuevoRegistro.fecha) {
      toast({ 
        title: "Error", 
        description: "La fecha es obligatoria", 
        variant: "destructive" 
      });
      return;
    }

    if (!nuevoRegistro.concepto) {
      toast({ 
        title: "Error", 
        description: "El concepto es obligatorio", 
        variant: "destructive" 
      });
      return;
    }

    agregarRegistroFinanciero({
      ...nuevoRegistro,
      mes: nuevoRegistro.fecha.toLocaleDateString()
    });
    
    setNuevoRegistro({ 
      fecha: new Date(),
      ingresos: 0, 
      gastos: 0,
      concepto: "",
      observaciones: ""
    });
    
    toast({
      title: "Registro guardado",
      description: `Se ha añadido el registro de ${nuevoRegistro.concepto} para ${nuevoRegistro.fecha.toLocaleDateString()}`,
    });
  };

  return {
    nuevoRegistro,
    handleInputChange,
    handleDateChange,
    handleSubmitRegistro
  };
};
