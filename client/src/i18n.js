import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./i18n/en/translation.json";
import it from "./i18n/it/translation.json";
import es from "./i18n/es/translation.json";
import fr from "./i18n/fr/translation.json";
import de from "./i18n/de/translation.json";
import ja from "./i18n/ja/translation.json";
import ko from "./i18n/ko/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      ja: { translation: ja },
      ko: { translation: ko },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "querystring", "cookie"],
      caches: ["localStorage"],
    },
  });

export default i18n;

