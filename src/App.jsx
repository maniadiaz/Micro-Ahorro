import Home from './app/page/home/Home';
import Login from './app/page/login/Login';
import Navbar from './app/components/Navbar';
import { Box, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { Savings } from '@mui/icons-material';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
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
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Savings
              sx={{
                fontSize: 80,
                color: '#667eea',
              }}
            />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#333',
              mb: 2,
            }}
          >
            Próximamente
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 500,
              color: '#667eea',
              mb: 4,
            }}
          >
            Micro-Ahorro
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 4,
            }}
          >
            Estamos trabajando en algo increíble para ti
          </Typography>

          <CircularProgress
            size={40}
            sx={{
              color: '#667eea',
            }}
          />
        </Paper>
      </Container>
    </Box>
  )
}

export default App
