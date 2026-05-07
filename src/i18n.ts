import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      invitation: "Wedding Invitation",
      admin: "Admin Dashboard",
      rsvp: "RSVP",
      wishes: "Wedding Wishes",
      gifts: "Wedding Gifts",
      claim: "Claim Gift",
    },
  },
  id: {
    translation: {
      invitation: "Undangan Pernikahan",
      admin: "Dashboard Admin",
      rsvp: "Konfirmasi Kehadiran",
      wishes: "Ucapan Pernikahan",
      gifts: "Hadiah Pernikahan",
      claim: "Klaim Hadiah",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: import.meta.env.VITE_DEFAULT_LANGUAGE || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
