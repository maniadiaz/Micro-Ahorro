import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGoal } from './GoalContext';

const SavingContext = createContext();

export const SavingProvider = ({ children }) => {
  const [savingGoals, setSavingGoals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiService } = useAuth();
  const { goalUser } = useGoal();

  const refetchSaving = useCallback(async () => {
    if (!goalUser || !goalUser.id) {
      setSavingGoals(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getSavingsByGoalId(goalUser.id);
      const savingsList = response?.savings || response;
      setSavingGoals(savingsList); // Guarda el array completo de savings
    } catch (err) {
      console.error('Error al recargar savings:', err);
      setError('No se pudo cargar los ahorros.');
      setSavingGoals(null);
    } finally {
      setIsLoading(false);
    }
  }, [goalUser?.id, apiService]); // Dependencias: se recarga si cambia goalUser .id

  // useEffect: Llama refetchSaving automáticamente cuando goalUser  cambia
  useEffect(() => {
    refetchSaving();
  }, [refetchSaving]);

  const value = {
    savingGoals,
    isLoading,
    error,
    refetchSaving,
  };

  return <SavingContext.Provider value={value}>{children}</SavingContext.Provider>;
};

// Hook para consumir el contexto (similar a useGoal)
export const useSaving = () => {
  const context = useContext(SavingContext);
  if (!context) {
    throw new Error('useSaving debe ser usado dentro de un SavingProvider');
  }
  return context;
};
