import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useTranslation = (namespace = 'common') => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  const changeLanguage = useCallback((lng) => {
    // Ensure language is saved to localStorage
    localStorage.setItem('i18nextLng', lng);
    i18n.changeLanguage(lng);
  }, [i18n]);
  
  const currentLanguage = i18n.language;
  
  return {
    t,
    changeLanguage,
    currentLanguage,
    isKorean: currentLanguage === 'ko',
    isEnglish: currentLanguage === 'en',
  };
};

export default useTranslation;
