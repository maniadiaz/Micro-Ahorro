import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard, PublicGuard } from './guards/AuthGuard';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';
import LanguageSwitcher from './app/components/LanguageSwitcher/LanguageSwitcher';
import { GoalProvider } from './context/GoalContext';
import { SavingProvider } from './context/SavingsContext';

const Login = lazy(() => import('./app/page/auth/Login'));
const Register = lazy(() => import('./app/page/auth/Register'));
const RestarPassword = lazy(() => import('./app/page/auth/restorePassword'));

const Home = lazy(() => import('./app/page/home/Home'));
const Dashboard = lazy(() => import('./app/page/dashboard/Dashboard'));
const Profile = lazy(() => import('./app/page/profile/Profile'));

import NotFound from './app/page/errors/NotFound';
import Unauthorized from './app/page/errors/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <LanguageSwitcher />
      <Routes>
        {/* Rutas públicas anidadas bajo PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <PublicGuard>
                <Login />
              </PublicGuard>
            }
          />

          <Route path='/register'
            element={
              <PublicGuard>
                <Register />
              </PublicGuard>
            }
          />
          <Route path='/restore-password'
            element={
              <PublicGuard>
                <RestarPassword />
              </PublicGuard>
            }
          />
        </Route>

        {/* Rutas protegidas anidadas bajo AuthGuard y ProtectedLayout */}
        <Route
          element={
            <AuthGuard>
              <GoalProvider>
                <SavingProvider>
                  <ProtectedLayout />
                </SavingProvider>
              </GoalProvider>
            </AuthGuard>
          }
        >
          {/* La ruta raíz ahora intenta ir a Home, AuthGuard decidirá */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Agrega más rutas protegidas aquí */}
        </Route>

        {/* Rutas de error */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;