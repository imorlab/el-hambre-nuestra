import { useState, useEffect, useCallback } from 'react';
import { getZonas, getRestaurantes, getVisitas } from '../services/db';

export function useData(user) {
  const [zonas, setZonas] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [zonasData, restaurantesData, visitasData] = await Promise.all([
        getZonas(),
        getRestaurantes(),
        getVisitas(user.id)
      ]);
      
      setZonas(zonasData);
      setRestaurantes(restaurantesData);
      setVisitas(visitasData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { zonas, restaurantes, visitas, loading, reload: loadData };
}