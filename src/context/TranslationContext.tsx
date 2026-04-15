"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { translations, type Locale } from "@/lib/i18n";

type TranslationContextType = {
  locale: Locale;
  t: (typeof translations)["en"];
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "bn" : "en";
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const t = translations[locale];

  return (
    <TranslationContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
