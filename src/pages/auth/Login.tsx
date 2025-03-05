
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';
import { toast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a mock login. In a real app, this would validate against a backend
      if (email && password) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Show success toast
        toast({
          title: language === "en" ? "Login successful" : "உள்நுழைவு வெற்றிகரமாக முடிந்தது",
          description: language === "en" ? "Welcome back!" : "மீண்டும் வருக!",
        });
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        throw new Error("Please enter both email and password");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: language === "en" ? "Login failed" : "உள்நுழைவு தோல்வியடைந்தது",
        description: language === "en" ? "Please check your credentials and try again." : "உங்கள் சான்றுகளை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
      });
    } finally {
      setIsLoading(false);
    }
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
              <Input 
                id="email" 
                type="email" 
                placeholder={language === "en" ? "name@example.com" : "பெயர்@உதாரணம்.com"} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className={cn("text-sm font-medium", language === "ta" && "font-tamil")}>
                {language === "en" ? "Password" : "கடவுச்சொல்"}
              </label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span>{language === "en" ? "Logging in..." : "உள்நுழைகிறது..."}</span>
              ) : (
                <span>{language === "en" ? "Login" : "உள்நுழைக"}</span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button 
            variant="link" 
            asChild
            className={cn(language === "ta" && "font-tamil")}
          >
            <Link to="/signup">
              {language === "en" ? "Don't have an account? Sign up" : "கணக்கு இல்லையா? பதிவு செய்க"}
            </Link>
          </Button>
          <Button 
            variant="link" 
            asChild
            className={cn(language === "ta" && "font-tamil")}
          >
            <Link to="/">
              {language === "en" ? "Back to Home" : "முகப்பிற்குத் திரும்பு"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
