import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import { useEffect } from 'react';

// Guard principal de autenticación
export const AuthGuard = ({ children, requiredRoles = [] }) => {
  const { isLoggedIn, isAuthenticated, isLoading, checkAuth, hasPermission } = useAuth();
  const location = useLocation();

  // Verificar autenticación en cada navegación
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isLoggedIn || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar permisos si se especificaron roles
  if (requiredRoles.length > 0) {
    const checkPermissions = async () => {
      const permitted = await hasPermission(requiredRoles);
      if (!permitted) {
        return <Navigate to="/unauthorized" replace />;
      }
    };
    
    checkPermissions();
  }

  // Usuario autenticado y con permisos
  return children;
};

// Guard para rutas públicas (cuando ya está autenticado no puede acceder)
export const PublicGuard = ({ children }) => {
  const { isLoggedIn, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si está autenticado, redirigir al dashboard
  if (isLoggedIn && isAuthenticated) {
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  return children;
};

// Guard para verificar roles específicos
export const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const hasRequiredRole = user?.roles?.some(role => 
    allowedRoles.includes(role)
  );

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

// Exportación por defecto del AuthGuard principal
export default AuthGuard;