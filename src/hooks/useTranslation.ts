import { useState, useCallback } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'es';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('language', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value?.[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    return value;
  }, [language]);

  return { t, language, toggleLanguage };
}