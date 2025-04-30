import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      welcome: 'Bienvenido a ALY',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      dashboard: 'Panel Principal',
      chatbot: 'Asistente Virtual',
      appointments: 'Citas Médicas',
      medicalHistory: 'Historial Médico',
      alyWallet: 'Mi Billetera ALY',
      store: 'Tienda de Servicios',
      admin: 'Panel de Administración'
    }
  },
  qu: {
    translation: {
      welcome: 'ALYman hampuy',
      login: 'Yaykuy',
      register: 'Qillqakuy',
      dashboard: 'Qhawana Panil',
      chatbot: 'Yanapaq Bot',
      appointments: 'Hampina Citas',
      medicalHistory: 'Onqoy Willakuy',
      alyWallet: 'ALY Qolqe',
      store: 'Hampina Qhatu',
      admin: 'Kamachiq Panil'
    }
  },
  ay: {
    translation: {
      welcome: 'ALYru kuyasiña',
      login: 'Mantaña',
      register: 'Qillqantaña',
      dashboard: 'Uñjawi Panel',
      chatbot: "Yanapiri Bot",  // Cambiado para evitar problemas con el apóstrofo
      appointments: 'Qulla Citas',
      medicalHistory: 'Usu Sarnaqawi',
      alyWallet: 'ALY Qullqi',
      store: 'Qulla Alaña',
      admin: 'Apnaqiri Panel'
    }
  },
  en: {
    translation: {
      welcome: 'Welcome to ALY',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      chatbot: 'Virtual Assistant',
      appointments: 'Medical Appointments',
      medicalHistory: 'Medical History',
      alyWallet: 'My ALY Wallet',
      store: 'Services Store',
      admin: 'Admin Panel'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;