// SavingGoal.js
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Alert, Skeleton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGoal } from '../../../context/GoalContext';
import { useSaving } from '../../../context/SavingsContext';

const SavingGoal = () => {
  const { goalUser, isLoading: goalLoading, error: goalError } = useGoal();
  const { savingGoals, isLoading: savingLoading, error: savingError } = useSaving();

  if (goalLoading || savingLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="rectangular" height={60} sx={{ my: 1, bgcolor: 'grey.700' }} />
        <Skeleton variant="rectangular" height={60} sx={{ bgcolor: 'grey.700' }}/>
      </Box>
    );
  }

  if (goalError || savingError) {
    return (
        <Alert severity="error" sx={{ m: 2 }}>
            {goalError || savingError}
        </Alert>
    );
  }

  if (!goalUser) {
    return (
        <Alert severity="info" sx={{ m: 2, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}>
            No hay metas disponibles para mostrar el historial.
        </Alert>
    );
  }
  
  // Se define el formateador de moneda una vez fuera del map para mayor eficiencia
  const currencyFormatter = new Intl.NumberFormat('es-MX', { 
    style: 'currency', 
    currency: 'MXN' // O puedes obtenerlo del contexto como en BarProgress
  });

  const firstFiveSavings = (savingGoals || []).slice(0, 5);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2, px: 2 }}>
        Historial de Ahorros
      </Typography>

      {firstFiveSavings.length === 0 ? (
        <Box px={2}>
            <Alert
                severity="info"
                icon={<CheckCircleIcon fontSize="inherit" />}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo semitransparente
                    color: '#fff', // Texto blanco
                    '& .MuiAlert-icon': {
                    color: '#ff9800', // Icono con color de acento
                    }
                }}
            >
                ¡Aún no tienes ahorros! Cada paso cuenta.
            </Alert>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {firstFiveSavings.map((saving, index) => (
            <ListItem
              key={saving.id}
              sx={{
                py: 1.5,
                mx: 2,
                borderBottom: index < firstFiveSavings.length - 1 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  transition: 'background-color 0.2s ease-in-out'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#00d40bff' }}>
                  <CheckCircleIcon sx={{ color: '#fff' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold" sx={{color:"#00d40bff"}}>
                    {`+ ${currencyFormatter.format(saving.amount)}`}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: '#00d40bff' }}>
                    {saving.description || 'Ahorro general'} - {new Date(saving.createdAt).toLocaleDateString('es-ES')}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SavingGoal;