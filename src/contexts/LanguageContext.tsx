
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'ta') ? savedLanguage : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Add a data attribute to the document for potential CSS targeting
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  // Function to set the language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English if translation is missing
        let fallback = translations['en'];
        for (const fb of keys) {
          if (fallback && fallback[fb]) {
            fallback = fallback[fb];
          } else {
            return key; // Return the key if translation is missing in both languages
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
