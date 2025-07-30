// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      coming_soon: "Coming Soon...",
      alert_title: "Notice",
      alert_message: "This page will be accessible soon.",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      coming_soon: "जल्द आ रहा है...",
      alert_title: "सूचना",
      alert_message: "यह पृष्ठ जल्द ही उपलब्ध होगा।",
    },
  },
  kn: {
    translation: {
      welcome: "ಸ್ವಾಗತ",
      coming_soon: "ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ...",
      alert_title: "ಸೂಚನೆ",
      alert_message: "ಈ ಪುಟವನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರವೇಶಿಸಬಹುದು.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
