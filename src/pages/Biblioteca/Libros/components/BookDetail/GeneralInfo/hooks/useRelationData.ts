
import { useState, useEffect } from 'react';
import { 
  fetchInvestigaciones, 
  fetchColecciones, 
  Investigacion, 
  Coleccion 
} from '../../../../utils/relationDataService';

export const useRelationData = () => {
  const [investigaciones, setInvestigaciones] = useState<Investigacion[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingLists(true);
      try {
        const [investigacionesData, coleccionesData] = await Promise.all([
          fetchInvestigaciones(), 
          fetchColecciones()
        ]);
        setInvestigaciones(investigacionesData);
        setColecciones(coleccionesData);
      } catch (error) {
        console.error("Error fetching relation lists:", error);
      } finally {
        setLoadingLists(false);
      }
    };
    
    fetchData();
  }, []);

  return {
    investigaciones,
    colecciones,
    loadingLists
  };
};
