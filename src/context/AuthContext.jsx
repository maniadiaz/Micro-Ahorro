// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ApiServices } from './../services/ApiServices';

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

  // Función para verificar la autenticación
  const checkAuth = async (tokenOverride) => {
    // Usar el token que se pasa como argumento, o si no, el del estado.
    const tokenToVerify = tokenOverride || token;

    if (!tokenToVerify) {
      clearAuthState();
      return false;
    }
    try {
      apiService.setToken(tokenToVerify);

      const response = await apiService.checkToken();

      if (response && response.status !== false) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        clearAuthState();
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      clearAuthState();
      return false;
    }
  };

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedLoggedInAt = localStorage.getItem('loggedInAt');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          setLoggedInAt(storedLoggedInAt);
          setIsLoggedIn(true);

          // Llamar a checkAuth pasándole el token directamente
          // para evitar la condición de carrera.
          checkAuth(storedToken);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          clearAuthState();
        }
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Función para hacer login
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(identifier, password);

      if (typeof response === 'string') {
        return {
          success: false,
          error: response
        };
      }

      if (response.user && response.token) {
        const loginTime = new Date().toISOString();

        setUser(response.user);
        setToken(response.token);
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setLoggedInAt(loginTime);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('loggedInAt', loginTime);

        apiService.setToken(response.token);

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

  // Limpiar el estado de autenticación
  const clearAuthState = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setLoggedInAt(null);
    setIsLoading(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loggedInAt');

    apiService.setToken(null);
  };

  // Función para hacer logout
  const logout = () => {
    clearAuthState();
  };

  // Verificar permisos
  const hasPermission = (roles = []) => {
    if (!user) {
      return false;
    }
    if (roles.length === 0) {
      return isAuthenticated;
    }
    const userRoles = user.roles || [];
    return roles.some(role => userRoles.includes(role));
  };

  // Actualizar datos del usuario
  const updateUser = (userData) => {
    const updatedUser = {
      ...user,
      ...userData
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const getApiService = () => apiService;

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthProvider;
