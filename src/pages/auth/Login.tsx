
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate('/dashboard');
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Login to AGAM" : "அகம்க்கு உள்நுழைக"}
          </CardTitle>
          <CardDescription className={cn(language === "ta" && "font-tamil")}>
            {language === "en" 
              ? "Enter your details below to access the platform" 
              : "தளத்தை அணுக கீழே உங்கள் விவரங்களை உள்ளிடவும்"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              {language === "en" ? "Login" : "உள்நுழைக"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button 
            variant="link" 
            onClick={() => navigate('/signup')}
            className={cn(language === "ta" && "font-tamil")}
          >
            {language === "en" ? "Don't have an account? Sign up" : "கணக்கு இல்லையா? பதிவு செய்க"}
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

export default Login;
