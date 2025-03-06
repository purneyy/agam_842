
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className, variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ta' : 'en';
    setLanguage(newLanguage);
    
    toast({
      title: newLanguage === 'en' ? 'Language Changed' : 'மொழி மாற்றப்பட்டது',
      description: newLanguage === 'en' 
        ? 'The application language has been set to English.' 
        : 'பயன்பாட்டு மொழி தமிழாக அமைக்கப்பட்டுள்ளது.',
      variant: 'success',
    });
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          'flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-agam-neutral-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-agam-blue/50',
          className
        )}
        aria-label={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
      >
        <Globe className="h-3 w-3 text-agam-blue" />
        <span className="font-semibold text-agam-blue">
          {language === 'en' ? 'TA' : 'EN'}
        </span>
      </button>
    );
  }

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
      <span className={cn("animate-fade-in", language === 'ta' && "font-tamil")}>
        {language === 'en' ? 'English' : 'தமிழ்'}
      </span>
      <span className="ml-1 rounded-full bg-agam-blue/10 px-2 py-0.5 text-xs font-semibold text-agam-blue">
        {language === 'en' ? 'TA' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;
