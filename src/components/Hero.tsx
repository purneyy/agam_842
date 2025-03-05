
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 pt-20 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
            <h1 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-agam-neutral-800 mb-6",
              language === 'ta' && "font-tamil"
            )}>
              {language === 'en' 
                ? 'Autism Care Reimagined for Tamil Families' 
                : 'தமிழ் குடும்பங்களுக்கான ஆட்டிசம் பராமரிப்பு மறுவடிவமைக்கப்பட்டது'}
            </h1>
            
            <p className={cn(
              "text-xl text-agam-neutral-600 mb-8 max-w-2xl",
              language === 'ta' && "font-tamil"
            )}>
              {language === 'en'
                ? 'Culturally relevant tools for communication, screening, and support - personalized for Tamil-speaking families.'
                : 'தொடர்பாடல், திரையிடல் மற்றும் ஆதரவுக்கான கலாச்சார ரீதியாக பொருத்தமான கருவிகள் - தமிழ் பேசும் குடும்பங்களுக்கு தனிப்பயனாக்கப்பட்டது.'}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className={cn(language === 'ta' && "font-tamil")}
              >
                {language === 'en' ? 'Get Started' : 'தொடங்குங்கள்'}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className={cn(language === 'ta' && "font-tamil")}
              >
                {language === 'en' ? 'Learn More' : 'மேலும் அறிக'}
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img 
              src="/placeholder.svg" 
              alt="AGAM Platform"
              className="max-w-full h-auto rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
