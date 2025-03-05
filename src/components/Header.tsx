
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('menu-button');
      
      if (
        menu && 
        button && 
        !menu.contains(event.target as Node) && 
        !button.contains(event.target as Node) && 
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 w-full transition-all duration-300',
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center space-x-2 font-bold text-2xl text-agam-blue-dark"
        >
          <span className="bg-gradient-to-r from-agam-blue-dark to-agam-purple-dark bg-clip-text text-transparent">
            AGAM
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="text-agam-neutral-700 hover:text-agam-blue-dark font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right section with language toggle and buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          
          <a
            href="#"
            className="px-4 py-2 text-agam-blue-dark hover:text-agam-blue-dark/80 font-medium transition-colors"
          >
            {t('nav.login')}
          </a>
          
          <a
            href="#"
            className="px-4 py-2 bg-agam-blue-dark text-white rounded-lg hover:bg-agam-blue transition-colors duration-300 font-medium shadow-sm"
          >
            {t('nav.signup')}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <LanguageToggle />
          
          <button
            id="menu-button"
            className="p-2 text-agam-neutral-800 hover:bg-agam-blue/10 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 bg-white z-40 pt-20 pb-6 px-4 transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="py-3 px-4 text-lg font-medium text-agam-neutral-800 hover:bg-agam-blue/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          <div className="border-t border-agam-neutral-200 my-2 pt-4">
            <a
              href="#"
              className="block py-3 px-4 text-lg font-medium text-agam-neutral-800 hover:bg-agam-blue/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.login')}
            </a>
            
            <a
              href="#"
              className="block mt-2 py-3 px-4 bg-agam-blue-dark text-white text-center rounded-lg font-medium shadow-sm hover:bg-agam-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.signup')}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
