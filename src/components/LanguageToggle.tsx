
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'relative flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-agam-neutral-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-agam-blue/50',
        className
      )}
      aria-label={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
    >
      <Globe className="h-4 w-4 text-agam-blue" />
      <span className="animate-fade-in">
        {language === 'en' ? 'English' : 'தமிழ்'}
      </span>
      <span className="ml-1 rounded-full bg-agam-blue/10 px-2 py-0.5 text-xs font-semibold text-agam-blue">
        {language === 'en' ? 'TA' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;
