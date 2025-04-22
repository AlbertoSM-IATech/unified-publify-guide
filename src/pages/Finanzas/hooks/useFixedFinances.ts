
import { useSyncedData } from '@/hooks/useSyncedData';
import { FixedCost, FixedIncome } from '../types/dataTypes';
import { initialFixedCosts, initialFixedIncomes } from '../data/mockData';

export const useFixedFinances = () => {
  const [costesFijos, setCostesFijos] = useSyncedData<FixedCost[]>(
    initialFixedCosts, 
    "fixed_costs"
  );
  
  const [ingresosFijos, setIngresosFijos] = useSyncedData<FixedIncome[]>(
    initialFixedIncomes, 
    "fixed_incomes"
  );

  const editarCosteFijo = (id: number, datos: Partial<FixedCost>) => {
    setCostesFijos(
      costesFijos.map(coste => 
        coste.id === id ? { ...coste, ...datos } : coste
      )
    );
  };
  
  const agregarCosteFijo = (nuevoCosto: Omit<FixedCost, 'id'>) => {
    const nuevoId = Math.max(0, ...costesFijos.map(item => item.id)) + 1;
    setCostesFijos([...costesFijos, { ...nuevoCosto, id: nuevoId }]);
  };
  
  const eliminarCosteFijo = (id: number) => {
    setCostesFijos(costesFijos.filter(coste => coste.id !== id));
  };

  const editarIngresoFijo = (id: number, datos: Partial<FixedIncome>) => {
    setIngresosFijos(
      ingresosFijos.map(ingreso => 
        ingreso.id === id ? { ...ingreso, ...datos } : ingreso
      )
    );
  };
  
  const agregarIngresoFijo = (nuevoIngreso: Omit<FixedIncome, 'id'>) => {
    const nuevoId = Math.max(0, ...ingresosFijos.map(item => item.id)) + 1;
    setIngresosFijos([...ingresosFijos, { ...nuevoIngreso, id: nuevoId }]);
  };
  
  const eliminarIngresoFijo = (id: number) => {
    setIngresosFijos(ingresosFijos.filter(ingreso => ingreso.id !== id));
  };

  return {
    costesFijos,
    ingresosFijos,
    editarCosteFijo,
    agregarCosteFijo,
    eliminarCosteFijo,
    editarIngresoFijo,
    agregarIngresoFijo,
    eliminarIngresoFijo
  };
};
