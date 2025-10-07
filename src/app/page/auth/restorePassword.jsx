import { Box, Container, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { Engineering } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RestorePassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: 'center',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Engineering sx={{ fontSize: 80, color: 'primary.main', mb: 1 }} />

          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {t('restorePassword.featureInProgress')}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '450px', mb: 2 }}>
            {t('restorePassword.workingHardMessage')}
          </Typography>

          <CircularProgress
            color="primary"
            sx={{ mb: 3 }}
            aria-label={t('restorePassword.loading')}
          />

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            {t('restorePassword.returnToLogin')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default RestorePassword;