// GoalDashboard.js
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import BarProgress from './BarProgress';
import SavingGoal from './SavingGoal';

const GoalDashboard = () => {
  return (
    <Box sx={{ minWidth: '100%', maxWidth: { xs: 350, sm: '100%' }, p: 2 }}>
      <Card 
        elevation={8}
        sx={{
          // El fondo degradado es la estrella del diseño
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          // Todo el texto dentro heredará el color blanco por defecto
          color: '#fff',
          borderRadius: 4, // Bordes más redondeados y modernos
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        }}
      >
        {/* BarProgress ahora actúa como el contenido del header */}
        <CardHeader
          title={<BarProgress />}
          sx={{ pb: 0 }} // Quitamos el padding inferior para unirlo al contenido
        />
        {/* SavingGoal es el contenido principal del Card */}
        <CardContent>
          <SavingGoal />
        </CardContent>
      </Card>
    </Box>
  );
};

export default GoalDashboard;