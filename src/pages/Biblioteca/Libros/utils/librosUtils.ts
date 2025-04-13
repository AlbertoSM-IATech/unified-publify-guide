
// Main entry point that re-exports all utilities for backward compatibility
import { getStatusColor, getContentColor, getContentHexColor, calculateNetRoyalties } from "./formatUtils";
import { fetchLibros, filterLibros, sortLibros } from "./dataUtils";
import { librosSimulados } from "./mockData/librosData";
import { coleccionesSimuladas } from "./mockData/coleccionesData";
import { investigacionesSimuladas } from "./mockData/investigacionesData";

// Export everything for backward compatibility
export {
  // Format utilities
  getStatusColor,
  getContentColor,
  getContentHexColor,
  calculateNetRoyalties,
  
  // Data manipulation utilities
  fetchLibros,
  filterLibros,
  sortLibros,
  
  // Mock data
  librosSimulados,
  coleccionesSimuladas,
  investigacionesSimuladas
};
