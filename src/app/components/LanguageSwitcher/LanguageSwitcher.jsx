
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#1a1e22ff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      {i18n.language}
    </button>
  );
};

export default LanguageSwitcher;
