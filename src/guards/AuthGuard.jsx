// guards/AuthGuard.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

// Guard principal de autenticación
export const AuthGuard = ({ children, requiredRoles = [] }) => {
  const { isLoggedIn, isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

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
    const permitted = hasPermission(requiredRoles);
    if (!permitted) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Usuario autenticado y con permisos
  return children;
};

// Guard para rutas públicas
export const PublicGuard = ({ children }) => {
  const { isLoggedIn, isAuthenticated, isLoading } = useAuth();

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

  // Si está autenticado, redirigir al home
  if (isLoggedIn && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Guard para verificar roles específicos
export const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { hasPermission, isLoading } = useAuth();
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

  const permitted = hasPermission(allowedRoles);

  if (!permitted) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;

