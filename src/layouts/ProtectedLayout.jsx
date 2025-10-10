import { Outlet } from 'react-router-dom';
import { Box, Container} from '@mui/material';
import Navbar from '../app/components/Navbar/Navbar';
import GoalDashboard from './../app/components/Pogress/GoalDashboard';

const ProtectedLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 1,
        }}
      >
        <Container maxWidth="100%">
          <Box sx={{ mt: 1 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProtectedLayout;