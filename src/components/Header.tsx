
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const navItems = [
    {
      name: language === 'en' ? 'Home' : 'முகப்பு',
      path: '/'
    },
    {
      name: language === 'en' ? 'Features' : 'அம்சங்கள்',
      path: '/#features'
    },
    {
      name: language === 'en' ? 'About' : 'எங்களை பற்றி',
      path: '/#about'
    }
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-agam-blue">AGAM</Link>
          </div>
          
          {/* Desktop navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-agam-neutral-600 hover:text-agam-neutral-900 px-3 py-2 text-sm font-medium",
                    language === 'ta' && "font-tamil"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            
            {isLoggedIn ? (
              <Button 
                variant="default"
                onClick={() => navigate('/dashboard')}
                className={cn(language === 'ta' && "font-tamil")}
              >
                {language === 'en' ? 'Dashboard' : 'டாஷ்போர்டு'}
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className={cn(language === 'ta' && "font-tamil")}
                >
                  {language === 'en' ? 'Login' : 'உள்நுழைக'}
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate('/signup')}
                  className={cn(language === 'ta' && "font-tamil")}
                >
                  {language === 'en' ? 'Sign Up' : 'பதிவு செய்க'}
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex md:hidden items-center">
              <LanguageToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-agam-neutral-600 hover:text-agam-neutral-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium text-agam-neutral-600 hover:text-agam-neutral-900 hover:bg-gray-100",
                    language === 'ta' && "font-tamil"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium text-agam-blue hover:bg-gray-100",
                    language === 'ta' && "font-tamil"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'Dashboard' : 'டாஷ்போர்டு'}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium text-agam-neutral-600 hover:text-agam-neutral-900 hover:bg-gray-100",
                      language === 'ta' && "font-tamil"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'en' ? 'Login' : 'உள்நுழைக'}
                  </Link>
                  <Link
                    to="/signup"
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium text-agam-blue hover:bg-gray-100",
                      language === 'ta' && "font-tamil"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'en' ? 'Sign Up' : 'பதிவு செய்க'}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
