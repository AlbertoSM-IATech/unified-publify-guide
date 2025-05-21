
import { investigacionesSimuladas } from "../../Libros/utils/librosUtils";

// Definir el tipo para un objeto de investigación basado en la estructura de investigacionesSimuladas
export type Investigacion = typeof investigacionesSimuladas[0];

export interface NewInvestigationData {
  titulo: string;
  descripcion: string;
  libroId: string | null;
}
