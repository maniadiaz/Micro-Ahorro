import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, CircularProgress, Snackbar, Alert, InputAdornment, IconButton, Link, Collapse, LinearProgress, } from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd, PersonOutline, EmailOutlined, LockOutlined, BadgeOutlined, } from '@mui/icons-material';
import { ApiServices } from './../../../services/ApiServices';
import { useTranslation } from 'react-i18next';

const apiService = new ApiServices();

// Componente para la barra de fortaleza de contraseña
const PasswordStrengthMeter = ({ password }) => {
  const { t } = useTranslation();
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score++;
    if (pass.match(/[a-z]/)) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };

  const strength = getStrength(password);
  const progress = (strength / 5) * 100;

  const getColor = () => {
    if (strength <= 1) return 'error';
    if (strength === 2) return 'warning';
    if (strength <= 4) return 'info';
    return 'success';
  };

  const getLabel = () => {
    if (strength === 0) return '';
    if (strength <= 2) return t('register.passwordStrength.weak');
    if (strength <= 4) return t('register.passwordStrength.average');
    return t('register.passwordStrength.strong');
  };

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={getColor()}
        sx={{ height: 6, borderRadius: 3 }}
        aria-label={t('register.passwordStrength.meter')}
      />
      {password && (
        <Typography variant="caption" color={getColor()} sx={{ mt: 0.5, display: 'block' }}>
          {t('register.passwordStrength.label')} {getLabel()}
        </Typography>
      )}
    </Box>
  );
};

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'first_name':
        if (!value.trim()) error = t('register.validation.firstNameRequired');
        break;
      case 'last_name':
        if (!value.trim()) error = t('register.validation.lastNameRequired');
        break;
      case 'nickname':
        if (!value.trim()) error = t('register.validation.usernameRequired');
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = t('register.validation.invalidEmail');
        break;
      case 'password':
        if (value.length < 8)
          error = t('register.validation.passwordMinLength');
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          error = t('register.validation.passwordRequirements');
        break;
      case 'confirmPassword':
        if (value !== formData.password)
          error = t('register.validation.passwordsDoNotMatch');
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));

    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', formData.confirmPassword)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.register(formData);

      if (response) {
        setSnackbar({
          open: true,
          message: t('register.snackbar.success'),
          severity: 'success'
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || t('register.snackbar.error'),
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 1,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                display: 'inline-flex',
                bgcolor: 'primary.main',
                borderRadius: '50%',
                p: 2,

              }}
            >
              <PersonAdd sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h4" sx={{ fontWeight: { xs: 500, md: 700 }, mb: 1 }}>
              {t('register.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {t('register.subtitle')}
            </Typography>
          </Box>

          {/* Formulario */}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {/* Nombre */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                required
                name="first_name"
                label={t('register.firstName')}
                placeholder={t('register.firstName')}
                value={formData.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Apellido */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                required
                name="last_name"
                label={t('register.lastName')}
                placeholder={t('register.lastName')}
                value={formData.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Usuario */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                required
                name="nickname"
                label={t('register.nickname')}
                placeholder={t('register.nickname')}
                value={formData.nickname}
                onChange={handleChange}
                error={!!errors.nickname}
                helperText={errors.nickname}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                required
                type="email"
                name="email"
                label={t('register.email')}
                placeholder={t('register.email')}
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Contraseña */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                required
                name="password"
                label={t('register.password')}
                placeholder={t('register.passwordPlaceholder')}
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || t('register.passwordHelper')}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={t('register.togglePasswordVisibility')}
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <PasswordStrengthMeter password={formData.password} />
            </Box>

            {/* Confirmar Contraseña */}
            <Box sx={{ mb: 1 }}>
              <Collapse in={formData.password.length > 0}>
                <TextField
                  fullWidth
                  required
                  name="confirmPassword"
                  label={t('register.confirmPassword')}
                  placeholder={t('register.confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={t('register.toggleConfirmPasswordVisibility')}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Collapse>
            </Box>

            {/* Botón de Registro */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mb: 1,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('register.registerButton')
              )}
            </Button>

            {/* Link a Login */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('register.alreadyHaveAccount')}{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ fontWeight: 600 }}
                >
                  {t('register.signIn')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
