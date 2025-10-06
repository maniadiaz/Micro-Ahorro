import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
          }}
        >
          <ErrorOutline sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
          <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
            404
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Página no encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            La página que buscas no existe o ha sido movida.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/home')}
          >
            Volver al Inicio
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;

