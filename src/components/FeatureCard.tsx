
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  delay = 0
}) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className="feature-card group"
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
        animation: `fade-in 500ms ${delay}ms forwards ease-out`
      }}
    >
      <div 
        className="icon-wrapper"
        style={{ backgroundColor: `${color}20` }} // 20% opacity version of the color
      >
        <Icon 
          size={24} 
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        />
      </div>
      
      <h3 className={cn(
        "text-xl font-semibold text-agam-neutral-800 mb-2",
        language === 'ta' && "font-tamil"
      )}>
        {title}
      </h3>
      
      <p className={cn(
        "text-agam-neutral-600 text-sm",
        language === 'ta' && "font-tamil"
      )}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
