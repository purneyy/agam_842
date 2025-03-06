
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Volume2, Mic, Sparkles, Download, Package, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Enhanced symbol library with proper AAC symbols (would typically be stored in a larger JSON file)
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
    "more": "/placeholder.svg",
    "stop": "/placeholder.svg",
    "play": "/placeholder.svg",
    "like": "/placeholder.svg",
    "don't like": "/placeholder.svg",
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
    "மேலும்": "/placeholder.svg",
    "நிறுத்து": "/placeholder.svg",
    "விளையாடு": "/placeholder.svg",
    "பிடிக்கும்": "/placeholder.svg",
    "பிடிக்காது": "/placeholder.svg",
  },
  // Tanglish support
  tanglish: {
    "vanakkam": "/placeholder.svg",
    "nandri": "/placeholder.svg",
    "aam": "/placeholder.svg",
    "illai": "/placeholder.svg",
    "udavi": "/placeholder.svg",
    "vendum": "/placeholder.svg",
    "saapida": "/placeholder.svg",
    "kudikka": "/placeholder.svg",
    "thoonga": "/placeholder.svg",
    "melum": "/placeholder.svg",
    "niruthu": "/placeholder.svg",
    "vilaiyadu": "/placeholder.svg",
    "pidikkum": "/placeholder.svg",
    "pidikkathu": "/placeholder.svg",
  }
};

// Enhanced word prediction with more options
const predictionData = {
  en: {
    "h": ["hello", "help", "happy", "hungry"],
    "th": ["thank", "the", "this", "they", "that"],
    "wa": ["want", "water", "walk", "wash"],
    "p": ["play", "please", "put", "pick"],
    "m": ["more", "me", "my", "mom"],
  },
  ta: {
    "வ": ["வணக்கம்", "வேண்டும்", "வருக", "வழி"],
    "ந": ["நன்றி", "நான்", "நல்ல", "நாளை"],
    "உ": ["உதவி", "உணவு", "உறக்கம்", "உங்கள்"],
    "ச": ["சாப்பிட", "சிறந்த", "சரி", "சொல்"],
    "ப": ["பிடிக்கும்", "பார்", "பகிர்", "பெரிய"],
  },
  tanglish: {
    "v": ["vanakkam", "vendum", "varu", "vazhi"],
    "n": ["nandri", "naan", "nalla", "naalai"],
    "u": ["udavi", "unavu", "urakkam", "ungal"],
    "s": ["saapida", "sirantha", "sari", "sol"],
    "p": ["pidikkum", "paar", "pakir", "periya"],
  }
};

const CommunicationAssistant: React.FC = () => {
  const { language, t } = useLanguage();
  const [text, setText] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [displayLanguage, setDisplayLanguage] = useState<string>(language === "en" ? "en" : "ta");
  const [inputMode, setInputMode] = useState<string>("normal"); // normal or tanglish
  const { toast } = useToast();
  
  // Convert text to symbols with improved algorithm
  useEffect(() => {
    if (text.trim()) {
      // Break text into words and phrases
      const words = text.toLowerCase().split(/\s+/);
      const phrases = [];
      
      // Check for common phrases (2-3 word combinations)
      for (let i = 0; i < words.length; i++) {
        if (i + 2 <= words.length) {
          const threeWordPhrase = words.slice(i, i + 3).join(" ");
          const twoWordPhrase = words.slice(i, i + 2).join(" ");
          
          const symbolSet = 
            inputMode === "tanglish" 
              ? symbolLibrary.tanglish 
              : (displayLanguage === "en" ? symbolLibrary.en : symbolLibrary.ta);
          
          if (symbolSet[threeWordPhrase]) {
            phrases.push(symbolSet[threeWordPhrase]);
            i += 2; // Skip the next two words as they're part of this phrase
          } else if (symbolSet[twoWordPhrase]) {
            phrases.push(symbolSet[twoWordPhrase]);
            i += 1; // Skip the next word as it's part of this phrase
          } else if (symbolSet[words[i]]) {
            phrases.push(symbolSet[words[i]]);
          }
        } else if (i + 1 <= words.length) {
          const twoWordPhrase = words.slice(i, i + 2).join(" ");
          
          const symbolSet = 
            inputMode === "tanglish" 
              ? symbolLibrary.tanglish 
              : (displayLanguage === "en" ? symbolLibrary.en : symbolLibrary.ta);
          
          if (symbolSet[twoWordPhrase]) {
            phrases.push(symbolSet[twoWordPhrase]);
            i += 1; // Skip the next word as it's part of this phrase
          } else if (symbolSet[words[i]]) {
            phrases.push(symbolSet[words[i]]);
          }
        } else if (symbolLibrary[displayLanguage][words[i]]) {
          phrases.push(symbolLibrary[displayLanguage][words[i]]);
        }
      }
      
      setSymbols(phrases.filter(Boolean));
    } else {
      setSymbols([]);
    }
  }, [text, displayLanguage, inputMode]);
  
  // Predict next words with enhanced algorithm
  useEffect(() => {
    if (text.trim()) {
      const words = text.split(/\s+/);
      const lastWord = words[words.length - 1].toLowerCase();
      
      if (lastWord.length > 0) {
        const predictionSet = 
          inputMode === "tanglish" 
            ? predictionData.tanglish 
            : (displayLanguage === "en" ? predictionData.en : predictionData.ta);
        
        // Find matching prefixes
        const matchingPredictions = [];
        
        for (const prefix in predictionSet) {
          if (lastWord.startsWith(prefix)) {
            matchingPredictions.push(...predictionSet[prefix]);
          }
        }
        
        // Filter predictions that actually start with the last word for more accuracy
        const filteredPredictions = matchingPredictions.filter(word => 
          word.startsWith(lastWord)
        );
        
        setPredictions(filteredPredictions.slice(0, 5)); // Limit to 5 predictions
      } else {
        setPredictions([]);
      }
    } else {
      setPredictions([]);
    }
  }, [text, displayLanguage, inputMode]);
  
  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      
      if (inputMode === "tanglish") {
        // For Tanglish, try to use an Indian English voice if available
        speech.lang = "en-IN";
      } else {
        speech.lang = displayLanguage === "en" ? "en-US" : "ta-IN";
      }
      
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
    const words = text.split(/\s+/);
    words.pop(); // Remove last partial word
    const newText = [...words, word, ""].join(" ");
    setText(newText);
  };
  
  const toggleInputMode = () => {
    setInputMode(prevMode => prevMode === "normal" ? "tanglish" : "normal");
    setText(""); // Clear text when switching modes
    toast({
      title: inputMode === "normal" ? "Tanglish Mode Activated" : "Normal Mode Activated",
      description: inputMode === "normal" 
        ? "You can now type Tamil words using English characters." 
        : "Standard input mode is now active.",
    });
  };
  
  const downloadOfflineSymbols = () => {
    toast({
      title: language === "en" ? "Downloading Symbols" : "குறியீடுகள் பதிவிறக்கம்",
      description: language === "en" 
        ? "Symbol library is being downloaded for offline use." 
        : "ஆஃப்லைன் பயன்பாட்டிற்காக குறியீட்டு நூலகம் பதிவிறக்கப்படுகிறது.",
    });
    
    // In a real app, this would download the actual symbol library files
    setTimeout(() => {
      toast({
        title: language === "en" ? "Download Complete" : "பதிவிறக்கம் முடிந்தது",
        description: language === "en" 
          ? "Symbols are now available offline." 
          : "குறியீடுகள் இப்போது ஆஃப்லைனில் கிடைக்கின்றன.",
        variant: "success"
      });
    }, 2000);
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

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "gap-2",
            displayLanguage === "en" && "border-agam-blue text-agam-blue"
          )}
          onClick={() => setDisplayLanguage("en")}
        >
          <Globe className="h-4 w-4" />
          <span>English</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "gap-2",
            displayLanguage === "ta" && "border-agam-blue text-agam-blue"
          )}
          onClick={() => setDisplayLanguage("ta")}
        >
          <Globe className="h-4 w-4" />
          <span className="font-tamil">தமிழ்</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "ml-auto gap-2",
            inputMode === "tanglish" && "border-agam-blue text-agam-blue"
          )}
          onClick={toggleInputMode}
        >
          <Badge variant="outline" className="ml-auto px-1.5 py-0 h-5">
            {inputMode === "normal" ? "ABC" : "Aa"}
          </Badge>
          <span>
            {inputMode === "normal" ? "Enable Tanglish" : "Disable Tanglish"}
          </span>
        </Button>
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
              placeholder={
                inputMode === "tanglish"
                  ? "Type using English characters for Tamil words (Tanglish)..."
                  : language === "en" 
                    ? "Type your message..." 
                    : "உங்கள் செய்தியை உள்ளிடவும்..."
              }
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
              placeholder={
                inputMode === "tanglish"
                  ? "Type using English characters for Tamil words (Tanglish)..."
                  : language === "en" 
                    ? "Type text to speak..." 
                    : "பேச உரையை உள்ளிடவும்..."
              }
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
              placeholder={
                inputMode === "tanglish"
                  ? "Start typing to see predictions (Tanglish mode)..."
                  : language === "en" 
                    ? "Start typing to see predictions..." 
                    : "கணிப்புகளைக் காண தட்டச்சு செய்யத் தொடங்கவும்..."
              }
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
                    <span className={cn(
                      displayLanguage === "ta" && !inputMode && "font-tamil"
                    )}>
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className={cn(
              "text-lg font-medium text-agam-neutral-800 mb-2",
              language === "ta" && "font-tamil"
            )}>
              {language === "en" ? "Offline Symbol Library" : "ஆஃப்லைன் குறியீடு நூலகம்"}
            </h3>
            <p className={cn(
              "text-sm text-agam-neutral-600",
              language === "ta" && "font-tamil"
            )}>
              {language === "en" 
                ? "Access these preloaded symbols even without internet connection." 
                : "இணைய இணைப்பு இல்லாமல் கூட இந்த முன்னேற்றப்பட்ட குறியீடுகளை அணுகவும்."}
            </p>
          </div>
          
          <Button onClick={downloadOfflineSymbols} className="gap-2 bg-agam-blue hover:bg-agam-blue/90">
            <Download className="h-4 w-4" />
            <span className={cn(language === "ta" && "font-tamil")}>
              {language === "en" ? "Download for Offline Use" : "ஆஃப்லைன் பயன்பாட்டிற்காக பதிவிறக்கவும்"}
            </span>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
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
