import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalUser , setGoalUser ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, apiService } = useAuth();

  const refetchGoal = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getGoalsByUserId(user.id);
      const goalsList = response?.goals;

      // Verifica que "goalsList" sea un arreglo y tenga al menos un elemento
      if (goalsList && Array.isArray(goalsList) && goalsList.length > 0) {
        // Toma directamente el primer elemento del arreglo (goals[0])
        setGoalUser (goalsList[0]);
      } else {
        // Si no hay metas, establece el estado a null
        setGoalUser (null);
      }
    } catch (err) {
      console.error("Error al recargar la meta:", err);
      setError('No se pudo cargar tu progreso.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, apiService]);

  useEffect(() => {
    refetchGoal();
  }, [refetchGoal]);

  const value = {
    goalUser ,
    isLoading,
    error,
    refetchGoal,
    user,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal debe ser usado dentro de un GoalProvider');
  }
  return context;
};
