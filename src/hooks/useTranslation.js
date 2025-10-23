import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace = 'common') => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
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
