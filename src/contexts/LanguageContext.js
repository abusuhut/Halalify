"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext({ t: translations.en, lang: "en", changeLanguage: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("halalify_lang");
    if (saved && translations[saved]) {
      setLang(saved);
    }
  }, []);

  function changeLanguage(newLang) {
    setLang(newLang);
    localStorage.setItem("halalify_lang", newLang);
    document.cookie = `halalify_lang=${newLang};path=/;max-age=31536000`;
  }

  return (
    <LanguageContext.Provider value={{ t: translations[lang], lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
