import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider, } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Savings, AccountCircle, Logout, Settings, Person, } from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages = [
    { name: 'Inicio', path: '/home' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseUserMenu();
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseUserMenu();
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="100vh">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: { xs: 1, sm: 1.5 } }}
        >
          {/* Logo y Título */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', textDecoration: 'none' }}
            component={Link}
            to="/home"
          >
            <Savings sx={{ fontSize: { xs: 28, sm: 32 }, color: '#ff9800' }} /> 
            <Typography
              variant="h6"
              noWrap
              sx={{ fontWeight: 700, color: 'white', fontSize: { xs: '1rem', sm: '1.25rem' }, display: { xs: 'none', sm: 'block' } }}
            >
              Micro-Ahorro
            </Typography>
          </Box>

          {/* Menu Móvil (Hamburguesa) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <Tooltip title="Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, '&:hover': { transform: 'scale(1.05)' } }}>
                {user?.photo ? (
                  <Avatar alt={user.nickname} src={user.photo} sx={{ width: 40, height: 40, border: '2px solid #ff9800' }} />
                ) : (
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#ff9800' }}> 
                    <AccountCircle />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.1)' } }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menu Desktop (Navegación) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flex: 1, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: '#ff9800',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Menu Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Tooltip title="Configuración de perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, '&:hover': { transform: 'scale(1.05)' }, transition: 'transform 0.2s ease' }}>
                {user?.photo ? (
                  <Avatar alt={user.nickname} src={user.photo} sx={{ width: 45, height: 45, border: '2px solid #ff9800' }} /> /* CAMBIO DE COLOR */
                ) : (
                  <Avatar sx={{ width: 45, height: 45, bgcolor: '#ff9800' }}> 
                    <AccountCircle />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
                {user?.first_name || 'Usuario'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
                {user?.nickname}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* User Menu Dropdown */}
      <Menu
        sx={{ mt: '10px', '& .MuiPaper-root': { boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)', borderRadius: '12px', minWidth: '250px' } }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
            @{user?.nickname}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.light' }}>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => handleNavigate('/profile')} sx={{ py: 1.5, '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.1)' } }}> 
          <Person sx={{ mr: 2, color: '#ff9800' }} /> 
          <Typography>Mi Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/settings')} sx={{ py: 1.5, '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.1)' } }}> 
          <Settings sx={{ mr: 2, color: '#ff9800' }} /> 
          <Typography>Configuración</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 1.5, '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' } }}
        >
          <Logout sx={{ mr: 2, color: 'error.main' }} />
          <Typography sx={{ color: 'error.main' }}>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;