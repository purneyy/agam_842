
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Mock signup function
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would create an account here
    navigate('/dashboard');
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Sign Up for AGAM" : "அகம்க்காக பதிவு செய்க"}
          </CardTitle>
          <CardDescription className={cn(language === "ta" && "font-tamil")}>
            {language === "en" 
              ? "Create an account to access all features" 
              : "அனைத்து அம்சங்களையும் அணுக ஒரு கணக்கை உருவாக்கவும்"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className={cn("text-sm font-medium", language === "ta" && "font-tamil")}>
                {language === "en" ? "Full Name" : "முழு பெயர்"}
              </label>
              <Input id="name" type="text" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className={cn("text-sm font-medium", language === "ta" && "font-tamil")}>
                {language === "en" ? "Email" : "மின்னஞ்சல்"}
              </label>
              <Input id="email" type="email" placeholder={language === "en" ? "name@example.com" : "பெயர்@உதாரணம்.com"} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className={cn("text-sm font-medium", language === "ta" && "font-tamil")}>
                {language === "en" ? "Password" : "கடவுச்சொல்"}
              </label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {language === "en" ? "Sign Up" : "பதிவு செய்க"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button 
            variant="link" 
            onClick={() => navigate('/login')}
            className={cn(language === "ta" && "font-tamil")}
          >
            {language === "en" ? "Already have an account? Login" : "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக"}
          </Button>
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className={cn(language === "ta" && "font-tamil")}
          >
            {language === "en" ? "Back to Home" : "முகப்பிற்குத் திரும்பு"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
