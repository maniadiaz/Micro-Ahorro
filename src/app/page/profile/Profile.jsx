import { Container, Typography, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuario
        </Typography>
        <Typography variant="body1">
          Esta es la página de Perfil (en construcción)
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;