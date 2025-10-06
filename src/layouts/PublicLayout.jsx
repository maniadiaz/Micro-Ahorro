import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const PublicLayout = () => {
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
      <Outlet />
    </Box>
  );
};

export default PublicLayout;