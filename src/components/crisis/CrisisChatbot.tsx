
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useToast } from "@/hooks/use-toast";

// Bot responses for calming techniques
const calmingResponses = {
  en: [
    {
      trigger: ["anxiety", "anxious", "panic", "scared", "fear", "worried"],
      response: "Take a deep breath. Inhale for 4 counts, hold for 4, and exhale for 6. Let's try this breathing exercise together."
    },
    {
      trigger: ["meltdown", "overwhelmed", "too much", "sensory", "loud", "noise"],
      response: "Find a quiet space if possible. Try covering your ears gently or using noise-cancelling headphones. Focus on a calming object or texture."
    },
    {
      trigger: ["help", "need help", "emergency", "urgent"],
      response: "I'm here to help. Let's work through this together. Would a grounding exercise help? Try naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
    },
    {
      trigger: ["angry", "mad", "frustrated", "upset"],
      response: "It's okay to feel upset. Try tensing and then relaxing each muscle group in your body, starting from your toes and working up to your head."
    }
  ],
  ta: [
    {
      trigger: ["பதற்றம்", "பயம்", "பீதி", "அச்சம்", "கவலை"],
      response: "ஆழமான மூச்சு எடுங்கள். 4 எண்ணிக்கைக்கு உள்ளிழுங்கள், 4 க்கு வைத்திருங்கள், மற்றும் 6 க்கு வெளியேற்றவும். இந்த சுவாசப் பயிற்சியை ஒன்றாக முயற்சிப்போம்."
    },
    {
      trigger: ["உருகுதல்", "மிகைப்படுத்தப்பட்டது", "அதிகமாக", "உணர்", "சத்தமாக", "சத்தம்"],
      response: "சாத்தியமாக அமைதியான இடத்தைக் கண்டறியவும். மெதுவாக உங்கள் காதுகளை மூடி அல்லது சத்தம்-ரத்து செய்யும் ஹெட்போன்களைப் பயன்படுத்தி முயற்சிக்கவும். ஒரு அமைதியான பொருள் அல்லது அமைப்பில் கவனம் செலுத்துங்கள்."
    },
    {
      trigger: ["உதவி", "உதவி தேவை", "அவசரம்", "அவசரமான"],
      response: "உதவ நான் இங்கே இருக்கிறேன். இதை ஒன்றாக செய்வோம். ஒரு நிலைப்படுத்தும் பயிற்சி உதவுமா? நீங்கள் பார்க்கக்கூடிய 5 விஷயங்கள், நீங்கள் தொடக்கூடிய 4 விஷயங்கள், நீங்கள் கேட்கக்கூடிய 3 விஷயங்கள், நீங்கள் நுகரக்கூடிய 2 விஷயங்கள் மற்றும் நீங்கள் சுவைக்கக்கூடிய 1 விஷயம் ஆகியவற்றைக் குறிப்பிட முயற்சிக்கவும்."
    },
    {
      trigger: ["கோபம்", "வெறுப்பு", "விரக்தி", "கலக்கம்"],
      response: "நீங்கள் அமைதியின்றி உணர்வது சரியே. உங்கள் கால் விரல்களில் இருந்து தொடங்கி உங்கள் தலை வரை ஒவ்வொரு தசை குழுவையும் இறுக்கி பின்னர் தளர்த்த முயற்சிக்கவும்."
    }
  ]
};

// Default bot messages
const defaultMessages = {
  en: [
    {
      sender: "bot",
      text: "Hello, I'm here to help during difficult moments. What's going on right now?"
    }
  ],
  ta: [
    {
      sender: "bot",
      text: "வணக்கம், கடினமான தருணங்களில் உதவ நான் இங்கே இருக்கிறேன். இப்போது என்ன நடக்கிறது?"
    }
  ]
};

type Message = {
  sender: "user" | "bot";
  text: string;
};

const CrisisChatbot: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages[language as keyof typeof defaultMessages]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update default messages when language changes
    setMessages(defaultMessages[language as keyof typeof defaultMessages]);
  }, [language]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);

    setInput("");
  };

  const generateBotResponse = (userInput: string): string => {
    const responses = calmingResponses[language as keyof typeof calmingResponses];
    const userInputLower = userInput.toLowerCase();

    // Check for trigger words
    for (const item of responses) {
      if (item.trigger.some(trigger => userInputLower.includes(trigger))) {
        return item.response;
      }
    }

    // Default responses if no triggers matched
    const defaultResponses = {
      en: [
        "I'm here to support you. Could you tell me more about what you're experiencing?",
        "Let's work through this together. Try taking a few deep breaths first.",
        "You're not alone in this. I'm here to help you find some calm.",
        "Sometimes focusing on your immediate surroundings can help. Can you describe something you can see right now?"
      ],
      ta: [
        "நான் உங்களுக்கு ஆதரவாக இருக்கிறேன். நீங்கள் அனுபவிப்பது பற்றி மேலும் சொல்ல முடியுமா?",
        "இதை ஒன்றாக செய்வோம். முதலில் ஆழ்ந்த சுவாசம் எடுக்க முயற்சிக்கவும்.",
        "இதில் நீங்கள் தனியாக இல்லை. நீங்கள் சில அமைதியைக் கண்டுபிடிக்க உதவ நான் இங்கே இருக்கிறேன்.",
        "சில நேரங்களில் உங்கள் உடனடி சூழலில் கவனம் செலுத்துவது உதவும். இப்போது நீங்கள் பார்க்கக்கூடிய ஏதாவதொன்றை விவரிக்க முடியுமா?"
      ]
    };

    const randomIndex = Math.floor(Math.random() * defaultResponses[language as keyof typeof defaultResponses].length);
    return defaultResponses[language as keyof typeof defaultResponses][randomIndex];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="border bg-card overflow-hidden">
      <div className="flex flex-col h-[600px]">
        <div className="bg-agam-blue p-3 flex items-center text-white">
          <AlertCircle className="mr-2 h-5 w-5" />
          <h3 className={cn(
            "font-semibold",
            language === "ta" && "font-tamil"
          )}>
            {language === "en" ? "Crisis Support Chatbot" : "நெருக்கடி ஆதரவு அரட்டை"}
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.sender === "user" 
                    ? "bg-agam-blue text-white" 
                    : "bg-gray-100 text-agam-neutral-800",
                  language === "ta" && "font-tamil"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              placeholder={language === "en" ? "Type your message..." : "உங்கள் செய்தியை தட்டச்சு செய்யவும்..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={cn(language === "ta" && "font-tamil")}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-agam-blue hover:bg-agam-blue-dark"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className={cn(
            "text-xs text-agam-neutral-600 mt-2",
            language === "ta" && "font-tamil"
          )}>
            {language === "en" 
              ? "This is a support chatbot. For immediate emergencies, please contact local emergency services." 
              : "இது ஒரு ஆதரவு அரட்டை. உடனடி அவசரநிலைகளுக்கு, உள்ளூர் அவசர சேவைகளைத் தொடர்பு கொள்ளவும்."
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CrisisChatbot;
