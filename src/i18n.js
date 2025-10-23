import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enAbout from './locales/en/about.json';
import koCommon from './locales/ko/common.json';
import koLanding from './locales/ko/landing.json';
import koAbout from './locales/ko/about.json';

const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    about: enAbout,
  },
  ko: {
    common: koCommon,
    landing: koLanding,
    about: koAbout,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'landing', 'about'],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense for better compatibility
    },
  });

export default i18n;
