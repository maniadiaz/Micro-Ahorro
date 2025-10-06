// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ApiServices } from './../app/services/ApiServices';

const authService = new ApiServices();

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInAt, setLoggedInAt] = useState(null);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, []);

  // Función para verificar la autenticación
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // Primero verificar si hay datos de autenticación en memoria
      const authData = authService.getAuthData();
      
      if (!authData || !authData.isLoggedIn) {
        // No hay sesión activa
        clearAuthState();
        return;
      }

      // Verificar con el servidor si el token sigue siendo válido
      const authenticated = await authService.isAuthenticated();
      
      if (authenticated) {
        // Token válido, actualizar estado
        setUser(authData.user);
        setToken(authData.token);
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setLoggedInAt(authData.loggedInAt);
      } else {
        // Token inválido, limpiar sesión
        clearAuthState();
        authService.clearAuthData();
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      clearAuthState();
      authService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  // Función para hacer login
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const result = await authService.loginUser(identifier, password);
      
      if (result.success) {
        // Actualizar el estado del contexto
        setUser(result.user);
        setToken(result.token);
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setLoggedInAt(result.loggedInAt);
        
        return { success: true };
      }
      
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para hacer logout
  const logout = () => {
    authService.logoutUser();
    clearAuthState();
  };

  // Limpiar el estado de autenticación
  const clearAuthState = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setLoggedInAt(null);
  };

  // Verificar permisos
  const hasPermission = async (roles) => {
    return await authService.hasPermission(roles);
  };

  // Actualizar datos del usuario
  const updateUser = (userData) => {
    authService.updateUserData(userData);
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    user,
    token,
    isLoggedIn,
    isAuthenticated,
    isLoading,
    loggedInAt,
    login,
    logout,
    checkAuth,
    hasPermission,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Exportación por defecto del Provider
export default AuthProvider;