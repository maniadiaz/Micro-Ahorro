// BarProgress.js
import { useGoal } from './../../../context/GoalContext';
import { Box, LinearProgress, Typography, CircularProgress } from '@mui/material';

const BarProgress = () => {
  const { goalUser, isLoading, error, user } = useGoal();

  // Estado de Carga
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <CircularProgress size={25} sx={{ color: '#fff' }}/>
        <Typography sx={{ ml: 2, color: 'rgba(255,255,255,0.8)' }}>Cargando meta...</Typography>
      </Box>
    );
  }

  // Estado de Error
  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Error al cargar la meta.</Typography>
      </Box>
    );
  }

  // Estado sin Meta Configurada
  if (!goalUser) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
        <Typography>Aún no tienes una meta de ahorro configurada.</Typography>
      </Box>
    );
  }

  // --- Lógica y Cálculos ---
  const currentAmount = parseFloat(goalUser.progress) || 0;
  const targetAmount = parseFloat(goalUser.amount) || 0;
  const progressPercentage = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;
  const currencyCode = user?.currency || 'MXN';
  const locale = currencyCode === 'USD' ? 'en-US' : 'es-MX';
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
  const currentFormatted = currencyFormatter.format(currentAmount);
  const targetFormatted = currencyFormatter.format(targetAmount);

  // --- JSX Adaptado para Fondo Oscuro ---
  return (
    <Box sx={{ width: '100%' }}>
      {/* Título de la meta (color heredado: blanco) */}
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
      >
        {goalUser.name}
      </Typography>

      {/* Barra de Progreso y Porcentaje */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ width: '100%', mr: 1.5 }}>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              // Color del fondo de la barra (track)
              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              // Estilo para la barra de progreso (el relleno)
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: '#ff9800', // Nuestro color de acento naranja/ámbar
              },
            }} 
          />
        </Box>
        <Box sx={{ minWidth: 40 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {`${Math.round(progressPercentage)}%`}
          </Typography>
        </Box>
      </Box>

      {/* Texto de Montos (con un blanco semitransparente para jerarquía) */}
      <Typography variant="caption" display="block" color="rgba(255,255,255,0.8)" align="right">
        {`${currentFormatted} / ${targetFormatted}`}
      </Typography>
    </Box>
  );
};

export default BarProgress;