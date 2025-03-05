
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-agam-neutral-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="md:col-span-2">
            <h3 className={cn(
              "text-xl font-bold text-agam-neutral-800 mb-3",
              language === 'ta' && "font-tamil"
            )}>
              {t('footer.about')}
            </h3>
            
            <p className={cn(
              "text-agam-neutral-600 mb-4 max-w-md",
              language === 'ta' && "font-tamil"
            )}>
              {t('footer.aboutText')}
            </p>
            
            <div className="flex items-center text-agam-blue-dark">
              <span className="text-sm">Made with</span>
              <Heart className="h-4 w-4 mx-1 text-agam-purple" />
              <span className="text-sm">for the autism community</span>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className={cn(
              "text-xl font-bold text-agam-neutral-800 mb-3",
              language === 'ta' && "font-tamil"
            )}>
              {t('footer.links')}
            </h3>
            
            <ul className="space-y-2">
              {['nav.home', 'nav.about', 'nav.features', 'nav.contact'].map((key) => (
                <li key={key}>
                  <a 
                    href={`#${key.split('.')[1]}`} 
                    className={cn(
                      "text-agam-neutral-600 hover:text-agam-blue-dark transition-colors",
                      language === 'ta' && "font-tamil"
                    )}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className={cn(
              "text-xl font-bold text-agam-neutral-800 mb-3",
              language === 'ta' && "font-tamil"
            )}>
              {t('footer.contact')}
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-agam-blue-dark shrink-0 mt-0.5" />
                <span className={cn(
                  "text-agam-neutral-600",
                  language === 'ta' && "font-tamil"
                )}>
                  {language === 'en' 
                    ? '123 Care Street, Chennai, Tamil Nadu, India' 
                    : '123 கேர் தெரு, சென்னை, தமிழ்நாடு, இந்தியா'}
                </span>
              </li>
              
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-agam-blue-dark shrink-0" />
                <span className="text-agam-neutral-600">+91 98765 43210</span>
              </li>
              
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-agam-blue-dark shrink-0" />
                <span className="text-agam-neutral-600">contact@agam.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="mt-12 pt-6 border-t border-agam-neutral-200 flex flex-col md:flex-row justify-between items-center text-sm text-agam-neutral-500">
          <p className={cn(
            language === 'ta' && "font-tamil"
          )}>
            &copy; {currentYear} AGAM. {t('footer.rights')}
          </p>
          
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-agam-blue-dark transition-colors">
              {t('footer.privacy')}
            </a>
            
            <a href="#" className="hover:text-agam-blue-dark transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
