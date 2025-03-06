
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Volume2, Mic, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock symbol data (would typically be stored in a larger JSON file)
const symbolLibrary = {
  en: {
    "hello": "/placeholder.svg",
    "good": "/placeholder.svg",
    "thank you": "/placeholder.svg",
    "yes": "/placeholder.svg",
    "no": "/placeholder.svg",
    "help": "/placeholder.svg",
    "want": "/placeholder.svg",
    "eat": "/placeholder.svg",
    "drink": "/placeholder.svg",
    "sleep": "/placeholder.svg",
  },
  ta: {
    "வணக்கம்": "/placeholder.svg",
    "நன்றி": "/placeholder.svg",
    "ஆம்": "/placeholder.svg",
    "இல்லை": "/placeholder.svg",
    "உதவி": "/placeholder.svg",
    "வேண்டும்": "/placeholder.svg",
    "சாப்பிட": "/placeholder.svg",
    "குடிக்க": "/placeholder.svg",
    "தூங்க": "/placeholder.svg",
  }
};

// Mock word prediction data
const predictionData = {
  en: {
    "h": ["hello", "help", "happy"],
    "th": ["thank", "the", "this"],
    "wa": ["want", "water", "walk"],
  },
  ta: {
    "வ": ["வணக்கம்", "வேண்டும்", "வருக"],
    "ந": ["நன்றி", "நான்", "நல்ல"],
    "உ": ["உதவி", "உணவு", "உறக்கம்"],
  }
};

const CommunicationAssistant: React.FC = () => {
  const { language, t } = useLanguage();
  const [text, setText] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Convert text to symbols
  useEffect(() => {
    if (text.trim()) {
      const words = text.toLowerCase().split(" ");
      const symbolSet = language === "en" ? symbolLibrary.en : symbolLibrary.ta;
      
      const matchedSymbols = words.map(word => {
        return symbolSet[word] || null;
      }).filter(Boolean);
      
      setSymbols(matchedSymbols);
    } else {
      setSymbols([]);
    }
  }, [text, language]);
  
  // Predict next words
  useEffect(() => {
    if (text.trim()) {
      const words = text.split(" ");
      const lastWord = words[words.length - 1].toLowerCase();
      
      if (lastWord.length > 0) {
        const predictionSet = language === "en" ? predictionData.en : predictionData.ta;
        const matchingPrefix = Object.keys(predictionSet).find(prefix => 
          lastWord.startsWith(prefix)
        );
        
        if (matchingPrefix) {
          setPredictions(predictionSet[matchingPrefix]);
        } else {
          setPredictions([]);
        }
      } else {
        setPredictions([]);
      }
    } else {
      setPredictions([]);
    }
  }, [text, language]);
  
  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = language === "en" ? "en-US" : "ta-IN";
      window.speechSynthesis.speak(speech);
    } else {
      toast({
        title: language === "en" ? "Not Supported" : "ஆதரிக்கப்படவில்லை",
        description: language === "en" 
          ? "Speech synthesis is not supported in your browser." 
          : "உங்கள் உலாவியில் பேச்சு உருவாக்கம் ஆதரிக்கப்படவில்லை.",
        variant: "destructive"
      });
    }
  };
  
  const handlePredictionClick = (word: string) => {
    const words = text.split(" ");
    words.pop(); // Remove last partial word
    const newText = [...words, word, ""].join(" ");
    setText(newText);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Communication Assistant" : "தொடர்பு உதவியாளர்"}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "Text-to-symbol converter, speech reader, and prediction AI to assist non-verbal communication." 
            : "உரை-குறியீடு மாற்றி, பேச்சு வாசிப்பாளர், மற்றும் வாய்மொழியற்ற தொடர்புக்கு AI கணிப்பு."}
        </p>
      </div>

      <Tabs defaultValue="text-to-symbol" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="text-to-symbol" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Text-to-Symbol" : "உரை-குறியீடு"}
          </TabsTrigger>
          <TabsTrigger value="speech" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Speech Reader" : "பேச்சு வாசிப்பாளர்"}
          </TabsTrigger>
          <TabsTrigger value="prediction" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Prediction AI" : "கணிப்பு AI"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text-to-symbol" className="space-y-4">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder={language === "en" ? "Type your message..." : "உங்கள் செய்தியை உள்ளிடவும்..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex flex-wrap gap-4 mt-4">
              {symbols.length > 0 ? (
                symbols.map((symbol, index) => (
                  <div key={index} className="w-24 h-24 border rounded-lg flex items-center justify-center bg-white">
                    <img src={symbol} alt="Symbol" className="w-16 h-16" />
                  </div>
                ))
              ) : (
                <div className={cn("text-agam-neutral-600", language === "ta" && "font-tamil")}>
                  {language === "en" 
                    ? "Type to see matching symbols..." 
                    : "பொருந்தும் குறியீடுகளைக் காண தட்டச்சு செய்யவும்..."}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="speech" className="space-y-4">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder={language === "en" ? "Type text to speak..." : "பேச உரையை உள்ளிடவும்..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex gap-3">
              <Button onClick={handleSpeech} className="gap-2">
                <Volume2 className="h-4 w-4" />
                <span className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Speak" : "பேசு"}
                </span>
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Mic className="h-4 w-4" />
                <span className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Record" : "பதிவு"}
                </span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prediction" className="space-y-4">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder={language === "en" ? "Start typing to see predictions..." : "கணிப்புகளைக் காண தட்டச்சு செய்யத் தொடங்கவும்..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex flex-wrap gap-2">
              {predictions.length > 0 ? (
                predictions.map((word, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePredictionClick(word)}
                    className="gap-1"
                  >
                    <Sparkles className="h-3 w-3 text-agam-blue" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {word}
                    </span>
                  </Button>
                ))
              ) : (
                <div className={cn("text-agam-neutral-600", language === "ta" && "font-tamil")}>
                  {language === "en" 
                    ? "Type to see word predictions..." 
                    : "சொல் கணிப்புகளைக் காண தட்டச்சு செய்யவும்..."}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 bg-agam-neutral-50 p-6 rounded-lg">
        <h3 className={cn(
          "text-lg font-medium text-agam-neutral-800 mb-3",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Offline Symbol Library" : "ஆஃப்லைன் குறியீடு நூலகம்"}
        </h3>
        <p className={cn(
          "text-sm text-agam-neutral-600 mb-4",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "Access these preloaded symbols even without internet connection." 
            : "இணைய இணைப்பு இல்லாமல் கூட இந்த முன்னேற்றப்பட்ட குறியீடுகளை அணுகவும்."}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.keys(language === "en" ? symbolLibrary.en : symbolLibrary.ta).slice(0, 5).map((word, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-3 rounded-md border">
              <img 
                src={language === "en" ? symbolLibrary.en[word] : symbolLibrary.ta[word]} 
                alt={word} 
                className="w-12 h-12 mb-2"
              />
              <span className={cn("text-xs text-center", language === "ta" && "font-tamil")}>
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationAssistant;
