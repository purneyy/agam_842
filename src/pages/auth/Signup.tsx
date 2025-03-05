
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';
import { toast } from '@/components/ui/use-toast';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a mock signup. In a real app, this would register with a backend
      if (name && email && password) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // Show success toast
        toast({
          title: language === "en" ? "Account created" : "கணக்கு உருவாக்கப்பட்டது",
          description: language === "en" ? "Welcome to AGAM!" : "அகம்க்கு வரவேற்கிறோம்!",
        });
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        throw new Error("Please fill out all fields");
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: language === "en" ? "Signup failed" : "பதிவு தோல்வியடைந்தது",
        description: language === "en" ? "Please check your information and try again." : "உங்கள் தகவலை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
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
              <Input 
                id="name" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
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
                <span>{language === "en" ? "Creating account..." : "கணக்கை உருவாக்குகிறது..."}</span>
              ) : (
                <span>{language === "en" ? "Sign Up" : "பதிவு செய்க"}</span>
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
            <Link to="/login">
              {language === "en" ? "Already have an account? Login" : "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக"}
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

export default Signup;
