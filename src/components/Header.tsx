import React, { useState } from 'react';
import { Receipt, StickyNote, Menu, X } from 'lucide-react';
import { Container } from './layout/Container';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '../hooks/useTranslation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('expenses')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Receipt className="w-4 h-4" />
                <span>{t('header.expenses')}</span>
              </button>
              <button
                onClick={() => scrollToSection('notes')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <StickyNote className="w-4 h-4" />
                <span>{t('header.notes')}</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle language={language} onToggle={toggleLanguage} />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => scrollToSection('expenses')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 w-full py-2"
            >
              <Receipt className="w-4 h-4" />
              <span>{t('header.expenses')}</span>
            </button>
            <button
              onClick={() => scrollToSection('notes')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 w-full py-2"
            >
              <StickyNote className="w-4 h-4" />
              <span>{t('header.notes')}</span>
            </button>
          </div>
        )}
      </Container>
    </header>
  );
}