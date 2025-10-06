// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ApiServices } from '../app/services/ApiServices';

const AuthContext = createContext(null);

// Instancia única de ApiServices
const apiService = new ApiServices();

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
      // Verificar si hay token almacenado
      if (!token) {
        clearAuthState();
        return;
      }

      // Verificar con el servidor si el token sigue siendo válido
      const response = await apiService.checkToken();
      
      if (response && response.status !== false) {
        // Token válido
        setIsAuthenticated(true);
      } else {
        // Token inválido, limpiar sesión
        clearAuthState();
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  };

  // Función para hacer login
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(identifier, password);
      
      // Si la respuesta es un string, es un error
      if (typeof response === 'string') {
        return { 
          success: false, 
          error: response 
        };
      }

      // Si el login es exitoso
      if (response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setLoggedInAt(response.loggedInAt);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.message || 'Error al iniciar sesión' 
      };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para hacer logout
  const logout = () => {
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

  // Verificar permisos (puedes expandir esto según tus necesidades)
  const hasPermission = async (roles = []) => {
    if (!user) {
      return false;
    }

    // Si no se requieren roles específicos, solo verificar que esté autenticado
    if (roles.length === 0) {
      return true;
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    const userRoles = user.roles || [];
    return roles.some(role => userRoles.includes(role));
  };

  // Actualizar datos del usuario
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  // Obtener el servicio de API con el token actual (útil para otras llamadas)
  const getApiService = () => {
    return apiService;
  };

  // Obtener headers autenticados
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
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
    updateUser,
    getApiService,
    getAuthHeaders
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