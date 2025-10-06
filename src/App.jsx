// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard, PublicGuard } from './guards/AuthGuard';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';

// Páginas
import Home from './app/page/home/Home';
import Login from './app/page/login/Login';
import Dashboard from './app/page/dashboard/Dashboard';
import Profile from './app/page/profile/Profile';
import NotFound from './app/page/errors/NotFound';
import Unauthorized from './app/page/errors/Unauthorized';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas - SIN navbar */}
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <PublicGuard>
                <Login />
              </PublicGuard>
            }
          />
        </Route>

        {/* Rutas protegidas - CON navbar */}
        <Route
          element={
            <AuthGuard>
              <ProtectedLayout />
            </AuthGuard>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* Agrega más rutas protegidas aquí */}
        </Route>

        {/* Rutas de error */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;