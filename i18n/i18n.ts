import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';

i18n
 .use(ChainedBackend)
 .use(HttpApi)
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [HttpApi],
      backendOptions: [{ loadPath: '/locales/{{lng}}/{{ns}}.json' }],
    },
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
    },
 });

export default i18n;