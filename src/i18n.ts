import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/languages/en.json";
import pt from "@/languages/pt-BR.json";

const resources = {
  en: { translation: en },
  "pt-BR": { translation: pt },
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
