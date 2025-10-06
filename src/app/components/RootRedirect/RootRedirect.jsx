import { Navigate } from 'react-router-dom';
import { useAuth } from './../../../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  //  Mientras se verifica la autenticación, muestra un indicador de carga.
  //    Esta es la pieza clave que falta.
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 2. Si ya no está cargando y el usuario ESTÁ autenticado, redirige a /home.
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // 3. Si ya no está cargando y el usuario NO está autenticado, redirige a /login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Fallback por si acaso, aunque no debería llegar aquí.
  return null;
};

export default RootRedirect;

