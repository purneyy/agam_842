
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle, VolumeX, Volume2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useToast } from "@/hooks/use-toast";

// Enhanced bot responses for caregivers during crisis
const calmingResponses = {
  en: [
    {
      trigger: ["anxiety", "anxious", "panic", "scared", "fear", "worried", "social anxiety"],
      response: "Take a deep breath. Inhale for 4 counts, hold for 4, and exhale for 6. Let's try this breathing exercise together. For social anxiety, prepare ahead with social stories and role-play scenarios in a safe environment before real social situations.",
      audio: "/audio/calm-breathing-en.mp3"
    },
    {
      trigger: ["meltdown", "overwhelmed", "too much", "sensory", "loud", "noise"],
      response: "For sensory meltdowns: 1) Find a quiet space 2) Reduce sensory input (dim lights, reduce noise) 3) Offer deep pressure through a weighted blanket or firm hugs if accepted 4) Use minimal language 5) Provide comfort items 6) Stay calm yourself",
      audio: "/audio/sensory-calm-en.mp3"
    },
    {
      trigger: ["help", "need help", "emergency", "urgent", "distress"],
      response: "Emergency techniques: 1) Ensure physical safety first 2) Use their preferred communication method 3) Offer a sensory tool they find calming 4) Maintain a calm, low voice 5) Provide space if needed 6) Try a grounding exercise: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      audio: "/audio/emergency-help-en.mp3"
    },
    {
      trigger: ["angry", "mad", "frustrated", "upset", "aggression", "aggressive"],
      response: "For handling aggression: 1) Ensure everyone's safety first 2) Stay calm and speak softly 3) Give space - don't crowd them 4) Remove triggers if possible 5) Wait for calm before discussing 6) Redirect to a physical activity to release energy 7) Consider if there are unmet sensory or communication needs",
      audio: "/audio/aggression-handling-en.mp3"
    },
    {
      trigger: ["non-responsive", "not responding", "shutdown", "shut down", "unresponsive"],
      response: "When your child is non-responsive: 1) Ensure they're physically safe 2) Reduce sensory input immediately 3) Give them space and time 4) Don't force interaction 5) Offer a comfort item without demands 6) Wait patiently for them to process 7) When they begin to respond, use simple, clear communication",
      audio: "/audio/non-responsive-en.mp3"
    },
    {
      trigger: ["communicate", "communication", "basic needs", "express needs", "non-verbal"],
      response: "To help with basic communication needs: 1) Use visual supports like pictures or symbols 2) Try simple sign language for common requests 3) Offer choices between two options 4) Use communication apps on tablets/phones 5) Create a simple needs board with pictures of food, drink, bathroom, etc. 6) Reward any attempt at communication. Check our Communication Assistant tool for more resources.",
      audio: "/audio/basic-communication-en.mp3"
    }
  ],
  ta: [
    {
      trigger: ["பதற்றம்", "பயம்", "பீதி", "அச்சம்", "கவலை", "சமூக பதட்டம்"],
      response: "ஆழமான மூச்சு எடுங்கள். 4 எண்ணிக்கைக்கு உள்ளிழுங்கள், 4 க்கு வைத்திருங்கள், மற்றும் 6 க்கு வெளியேற்றவும். இந்த சுவாசப் பயிற்சியை ஒன்றாக முயற்சிப்போம். சமூக பதட்டத்திற்கு, உண்மையான சமூக சூழ்நிலைகளுக்கு முன் பாதுகாப்பான சூழலில் சமூக கதைகள் மற்றும் பாத்திர நாடக காட்சிகளுடன் முன்கூட்டியே தயாராகுங்கள்.",
      audio: "/audio/calm-breathing-ta.mp3"
    },
    {
      trigger: ["உருகுதல்", "மிகைப்படுத்தப்பட்டது", "அதிகமாக", "உணர்", "சத்தமாக", "சத்தம்"],
      response: "உணர்வு உருகல்களுக்கு: 1) அமைதியான இடத்தைக் கண்டறியவும் 2) உணர் உள்ளீட்டைக் குறைக்கவும் (மங்கலான விளக்குகள், சத்தத்தைக் குறைக்கவும்) 3) ஏற்றுக்கொள்ளப்பட்டால் எடை போர்வை அல்லது உறுதியான கட்டிப்பிடிப்பு மூலம் ஆழமான அழுத்தத்தை வழங்கவும் 4) குறைந்தபட்ச மொழியைப் பயன்படுத்தவும் 5) ஆறுதல் பொருட்களை வழங்கவும் 6) நீங்களே அமைதியாக இருங்கள்",
      audio: "/audio/sensory-calm-ta.mp3"
    },
    {
      trigger: ["உதவி", "உதவி தேவை", "அவசரம்", "அவசரமான", "துயரம்"],
      response: "அவசர நுட்பங்கள்: 1) முதலில் உடல் பாதுகாப்பை உறுதிப்படுத்தவும் 2) அவர்களின் விருப்பமான தொடர்பு முறையைப் பயன்படுத்தவும் 3) அவர்கள் அமைதிப்படுத்தும் உணர்வு கருவியை வழங்கவும் 4) அமைதியான, குறைந்த குரலைப் பராமரிக்கவும் 5) தேவைப்பட்டால் இடம் வழங்கவும் 6) ஒரு நிலைப்படுத்தும் பயிற்சியை முயற்சிக்கவும்: நீங்கள் பார்க்கக்கூடிய 5 விஷயங்கள், நீங்கள் தொடக்கூடிய 4 விஷயங்கள், நீங்கள் கேட்கக்கூடிய 3 விஷயங்கள், நீங்கள் நுகரக்கூடிய 2 விஷயங்கள் மற்றும் நீங்கள் சுவைக்கக்கூடிய 1 விஷயம் ஆகியவற்றைக் குறிப்பிடவும்.",
      audio: "/audio/emergency-help-ta.mp3"
    },
    {
      trigger: ["கோபம்", "வெறுப்பு", "விரக்தி", "கலக்கம்", "ஆக்கிரமிப்பு", "ஆக்கிரமிப்பு"],
      response: "ஆக்கிரமிப்பைக் கையாள்வதற்கு: 1) முதலில் அனைவரின் பாதுகாப்பையும் உறுதிப்படுத்தவும் 2) அமைதியாக இருந்து மென்மையாகப் பேசவும் 3) இடம் கொடுங்கள் - அவர்களை நெரிசலாக்க வேண்டாம் 4) முடிந்தால் தூண்டுதல்களை அகற்றவும் 5) விவாதிப்பதற்கு முன் அமைதியாக காத்திருக்கவும் 6) ஆற்றலை வெளியிட உடல் செயல்பாட்டிற்கு திசைதிருப்பவும் 7) பூர்த்தி செய்யப்படாத உணர்வு அல்லது தொடர்பு தேவைகள் உள்ளதா என்பதைக் கருத்தில் கொள்ளுங்கள்",
      audio: "/audio/aggression-handling-ta.mp3"
    },
    {
      trigger: ["பதிலளிக்காதது", "பதிலளிக்கவில்லை", "நிறுத்தம்", "மூடப்பட்டது", "பதிலளிக்காதது"],
      response: "உங்கள் குழந்தை பதிலளிக்காதபோது: 1) அவர்கள் உடல் ரீதியாக பாதுகாப்பாக இருப்பதை உறுதிப்படுத்தவும் 2) உடனடியாக உணர் உள்ளீட்டைக் குறைக்கவும் 3) அவர்களுக்கு இடமும் நேரமும் கொடுங்கள் 4) தொடர்பைக் கட்டாயப்படுத்த வேண்டாம் 5) கோரிக்கைகள் இல்லாமல் ஆறுதல் பொருளை வழங்கவும் 6) அவர்கள் செயலாக்க பொறுமையாக காத்திருக்கவும் 7) அவர்கள் பதிலளிக்கத் தொடங்கும்போது, எளிய, தெளிவான தொடர்பைப் பயன்படுத்தவும்",
      audio: "/audio/non-responsive-ta.mp3"
    },
    {
      trigger: ["தொடர்பு", "தொடர்பு", "அடிப்படை தேவைகள்", "தேவைகளை வெளிப்படுத்து", "வாய்மொழியற்ற"],
      response: "அடிப்படை தொடர்பு தேவைகளுக்கு உதவ: 1) படங்கள் அல்லது சின்னங்கள் போன்ற காட்சி ஆதரவைப் பயன்படுத்தவும் 2) பொதுவான கோரிக்கைகளுக்கு எளிய சைகை மொழியை முயற்சிக்கவும் 3) இரண்டு விருப்பங்களுக்கு இடையில் தேர்வுகளை வழங்கவும் 4) டேப்லெட்/ஃபோன்களில் தொடர்பு பயன்பாடுகளைப் பயன்படுத்தவும் 5) உணவு, பானம், கழிவறை போன்றவற்றின் படங்களுடன் எளிய தேவைகள் பலகையை உருவாக்கவும் 6) தொடர்பு எடுக்கும் எந்த முயற்சிக்கும் வெகுமதி அளிக்கவும். மேலும் ஆதாரங்களுக்கு எங்கள் தொடர்பு உதவியாளர் கருவியைப் பாருங்கள்.",
      audio: "/audio/basic-communication-ta.mp3"
    }
  ]
};

// Default bot messages
const defaultMessages = {
  en: [
    {
      sender: "bot" as const,
      text: "Hello, I'm here to help during difficult moments. What's going on right now?"
    }
  ],
  ta: [
    {
      sender: "bot" as const,
      text: "வணக்கம், கடினமான தருணங்களில் உதவ நான் இங்கே இருக்கிறேன். இப்போது என்ன நடக்கிறது?"
    }
  ]
};

// FAQ suggestions for the chatbot
const faqSuggestions = {
  en: [
    "How do I calm my child during a sensory meltdown?",
    "What are the best ways to handle sudden aggression?",
    "How can I help my child with social anxiety?",
    "What should I do if my child is non-responsive?",
    "How can I teach my child to communicate basic needs?",
    "What are emergency techniques for an autistic child in distress?"
  ],
  ta: [
    "ஒரு உணர் உருகலின் போது எனது குழந்தையை எவ்வாறு அமைதிப்படுத்துவது?",
    "திடீர் ஆக்கிரமிப்பைக் கையாள்வதற்கான சிறந்த வழிகள் என்ன?",
    "சமூக பதட்டத்துடன் எனது குழந்தைக்கு எவ்வாறு உதவ முடியும்?",
    "எனது குழந்தை பதிலளிக்கவில்லை என்றால் நான் என்ன செய்ய வேண்டும்?",
    "அடிப்படை தேவைகளைத் தொடர்புகொள்ள எனது குழந்தைக்கு எவ்வாறு கற்பிக்க முடியும்?",
    "துயரத்தில் இருக்கும் ஆட்டிசம் குழந்தைக்கான அவசர நுட்பங்கள் என்ன?"
  ]
};

type Message = {
  sender: "user" | "bot";
  text: string;
  audio?: string;
};

const CrisisChatbot: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages[language as keyof typeof defaultMessages]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
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
      const { text, audio } = generateBotResponse(input);
      const botMessage: Message = { sender: "bot", text, audio };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput("");
  };

  const generateBotResponse = (userInput: string): { text: string, audio?: string } => {
    const responses = calmingResponses[language as keyof typeof calmingResponses];
    const userInputLower = userInput.toLowerCase();

    // Check for trigger words
    for (const item of responses) {
      if (item.trigger.some(trigger => userInputLower.includes(trigger))) {
        return { text: item.response, audio: item.audio };
      }
    }

    // Check for FAQ matches
    const faqs = faqSuggestions[language as keyof typeof faqSuggestions];
    for (let i = 0; i < faqs.length; i++) {
      if (userInputLower.includes(faqs[i].toLowerCase())) {
        return generateBotResponse(responses[i].trigger[0]);
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
    return { text: defaultResponses[language as keyof typeof defaultResponses][randomIndex] };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFAQClick = (faq: string) => {
    setInput(faq);
    // Automatically send after a short delay to simulate typing
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  const toggleAudioPlayback = (audioSrc?: string) => {
    if (!audioSrc) return;
    
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setIsAudioPlaying(false);
    } else {
      const audio = new Audio(audioSrc);
      audio.onended = () => {
        setIsAudioPlaying(false);
        setCurrentAudio(null);
      };
      audio.play().catch(error => {
        toast({
          title: language === 'en' ? "Error playing audio" : "ஒலி இயக்குவதில் பிழை",
          description: language === 'en' ? "Please try again later" : "பின்னர் மீண்டும் முயற்சிக்கவும்",
          variant: "destructive",
        });
        console.error("Error playing audio:", error);
      });
      setCurrentAudio(audio);
      setIsAudioPlaying(true);
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
                  "max-w-[80%] rounded-lg p-3 flex flex-col",
                  message.sender === "user" 
                    ? "bg-agam-blue text-white" 
                    : "bg-gray-100 text-agam-neutral-800",
                  language === "ta" && "font-tamil"
                )}
              >
                {message.text}
                {message.audio && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center mt-2 self-end"
                    onClick={() => toggleAudioPlayback(message.audio)}
                  >
                    {isAudioPlaying && currentAudio && message.audio === currentAudio.src ? (
                      <>
                        <VolumeX className="h-4 w-4 mr-1" />
                        {language === "en" ? "Stop Audio" : "ஒலியை நிறுத்து"}
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 mr-1" />
                        {language === "en" ? "Play Audio" : "ஒலியை இயக்கு"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t">
          <div className="mb-3 overflow-x-auto whitespace-nowrap pb-2">
            <div className="flex gap-2">
              {faqSuggestions[language as keyof typeof faqSuggestions].map((faq, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "text-xs whitespace-normal flex-shrink-0",
                    language === "ta" && "font-tamil"
                  )}
                  onClick={() => handleFAQClick(faq)}
                >
                  {faq}
                </Button>
              ))}
            </div>
          </div>
          
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
