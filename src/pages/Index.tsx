
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquareText, 
  Search, 
  BookOpen, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { cn } from '../lib/utils';

// Features section component
const Features = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const features = [
    {
      id: 'communication',
      icon: MessageSquareText,
      color: '#64A5FF',
      delay: 0,
      route: '/dashboard/communication'
    },
    {
      id: 'screening',
      icon: Search,
      color: '#9B7CFF',
      delay: 100,
      route: '/dashboard/screening'
    },
    {
      id: 'therapy',
      icon: BookOpen,
      color: '#F59E0B',
      delay: 200,
      route: '/dashboard/therapy'
    },
    {
      id: 'tales',
      icon: Sparkles,
      color: '#10B981',
      delay: 300,
      route: '/dashboard/tale-therapy'
    },
    {
      id: 'crisis',
      icon: Users,
      color: '#EC4899',
      delay: 400,
      route: '/dashboard/crisis-support'
    },
  ];
  
  const handleFeatureClick = (route: string) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      navigate('/login');
    }
  };
  
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-agam-neutral-800 mb-4",
            language === 'ta' && "font-tamil"
          )}>
            {t('features.title')}
          </h2>
          
          <p className={cn(
            "text-agam-neutral-600 max-w-2xl mx-auto",
            language === 'ta' && "font-tamil"
          )}>
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div key={feature.id} onClick={() => handleFeatureClick(feature.route)} className="cursor-pointer">
              <FeatureCard
                title={t(`features.${feature.id}.title`)}
                description={t(`features.${feature.id}.description`)}
                icon={feature.icon}
                color={feature.color}
                delay={feature.delay}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
