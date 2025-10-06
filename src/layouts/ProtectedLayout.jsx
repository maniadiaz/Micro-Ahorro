import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../app/components/Navbar/Navbar';

const ProtectedLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedLayout;