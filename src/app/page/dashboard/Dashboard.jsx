import { Container, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Esta es la página del Dashboard (en construcción)
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;