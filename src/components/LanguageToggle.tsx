import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  language: string;
  onToggle: () => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      title={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Languages className="w-5 h-5" />
      <span className="uppercase">{language}</span>
    </button>
  );
}