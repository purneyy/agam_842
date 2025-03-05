
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-agam-blue-light/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-agam-blue/10 rounded-full text-agam-blue-dark font-semibold animate-fade-in">
            <span className={language === 'ta' ? 'font-tamil' : ''}>
              {language === 'en' ? 'Autism Care Platform' : 'ஆட்டிசம் பராமரிப்பு தளம்'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-agam-blue-dark to-agam-purple-dark bg-clip-text text-transparent animate-fade-in">
            <span className={language === 'ta' ? 'font-tamil' : ''}>
              {t('hero.title')}
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-agam-neutral-600 font-medium mb-6 animate-fade-in">
            <span className={language === 'ta' ? 'font-tamil' : ''}>
              {t('hero.subtitle')}
            </span>
          </h2>
          
          <p className="text-agam-neutral-700 mb-8 text-lg max-w-2xl mx-auto animate-fade-in">
            <span className={language === 'ta' ? 'font-tamil' : ''}>
              {t('hero.description')}
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <a
              href="#features"
              className="px-8 py-3 bg-agam-blue-dark text-white rounded-lg hover:bg-agam-blue transition-all duration-300 font-medium shadow-md hover:shadow-lg group"
            >
              <span className="flex items-center justify-center gap-2">
                <span className={language === 'ta' ? 'font-tamil' : ''}>
                  {t('hero.cta')}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#about"
              className="px-8 py-3 bg-white/80 text-agam-blue-dark border border-agam-blue/20 rounded-lg hover:bg-white transition-colors duration-300 font-medium shadow-sm"
            >
              <span className={language === 'ta' ? 'font-tamil' : ''}>
                {t('hero.secondaryCta')}
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-agam-blue-light/30 blur-3xl"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-agam-purple-light/30 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
