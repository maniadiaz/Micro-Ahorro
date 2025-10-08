import { useTranslation } from 'react-i18next';
import { Box, Fab } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: { xs: '20px', md: '30px' }, right: '20px', padding: '10px 20px', zIndex: 1000 }}>
      <Fab color="primary" aria-label='add'
        onClick={toggleLanguage}>
        <TranslateIcon />
      </Fab>
    </Box>
  );
};

export default LanguageSwitcher;
