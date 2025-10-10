import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// El componente recibe props para hacerlo reutilizable
const NavCard = ({ icon, title, description, to }) => {
  return (
    // Usamos Link de react-router-dom para la navegación
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          textAlign: 'center',
          color: 'white',
          // El fondo degradado que ya conocemos
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          // Efecto hover para dar feedback al usuario
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          }
        }}
      >
        <Box 
          component="span" 
          sx={{ 
            color: '#ff9800', // Color de acento para el icono
            fontSize: '3.5rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        >
          {icon}
        </Box>
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            mt: 2 
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            color: 'rgba(255, 255, 255, 0.8)' 
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Link>
  );
};

export default NavCard;