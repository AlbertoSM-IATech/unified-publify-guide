
import { investigacionesSimuladas } from "../../Libros/utils/mockData/investigacionesData";

// Definimos explícitamente el tipo Investigacion en lugar de derivarlo
export interface Investigacion {
  id: string | number; // Ahora aceptamos tanto string como number
  titulo: string;
  descripcion: string;
  libroId: string;
  libroTitulo?: string;
  fechaActualizacion: string;
}

export interface NewInvestigationData {
  titulo: string;
  descripcion: string;
  libroId: string | null;
}
