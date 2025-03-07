import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessageSquareText, Send, CheckCircle2, AlertCircle, Smartphone, Phone } from "lucide-react";
import { cn } from "../../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendSMS, processIncomingSMS, findAvailableCounselor } from "../../utils/TwilioService";

// Mock SMS conversation for demo purposes
interface SMSMessage {
  content: string;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
}

const CrisisSMSSupport: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mockConversation, setMockConversation] = useState<SMSMessage[]>([]);
  const [showDemo, setShowDemo] = useState(false);
  
  // Crisis support phone number
  const crisisNumber = "+1-800-AGAM-HELP";
  
  // Handle sending a demo SMS message
  const handleSendDemoSMS = async () => {
    if (!phoneNumber) {
      toast({
        title: language === "en" ? "Phone number required" : "தொலைபேசி எண் தேவை",
        description: language === "en" 
          ? "Please enter a phone number to continue" 
          : "தொடர தொலைபேசி எண்ணை உள்ளிடவும்",
        variant: "destructive"
      });
      return;
    }
    
    if (!message) {
      toast({
        title: language === "en" ? "Message required" : "செய்தி தேவை",
        description: language === "en" 
          ? "Please enter a message to send" 
          : "அனுப்ப ஒரு செய்தியை உள்ளிடவும்",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Add outgoing message to conversation
    const outgoingMessage: SMSMessage = {
      content: message,
      timestamp: new Date(),
      type: 'outgoing'
    };
    
    setMockConversation(prev => [...prev, outgoingMessage]);
    
    try {
      // Process the message as if it was received by our system
      const responseText = processIncomingSMS(message, phoneNumber, language as 'en' | 'ta');
      
      // Simulate a delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add system response to conversation
      const incomingMessage: SMSMessage = {
        content: responseText,
        timestamp: new Date(),
        type: 'incoming'
      };
      
      setMockConversation(prev => [...prev, incomingMessage]);
      
      // Find an appropriate counselor based on the message
      const counselor = findAvailableCounselor(message, language as 'en' | 'ta');
      
      if (counselor) {
        // Notify that a counselor will be in touch
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const counselorMessage: SMSMessage = {
          content: language === "en" 
            ? `A counselor specializing in ${counselor.specialty} will contact you shortly. Counselor name: ${counselor.name}` 
            : `${counselor.specialty} இல் நிபுணத்துவம் பெற்ற ஆலோசகர் விரைவில் உங்களைத் தொடர்பு கொள்வார். ஆலோசகர் பெயர்: ${counselor.name}`,
          timestamp: new Date(),
          type: 'incoming'
        };
        
        setMockConversation(prev => [...prev, counselorMessage]);
      }
      
      // Clear the message input
      setMessage("");
      
      toast({
        title: language === "en" ? "Message sent" : "செய்தி அனுப்பப்பட்டது",
        description: language === "en" 
          ? "Your message has been sent successfully" 
          : "உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது",
        variant: "default"
      });
      
    } catch (error) {
      console.error("Error in demo SMS flow:", error);
      toast({
        title: language === "en" ? "Error" : "பிழை",
        description: language === "en" 
          ? "There was an error sending your message" 
          : "உங்கள் செய்தியை அனுப்புவதில் பிழை ஏற்பட்டது",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle starting a new demo conversation
  const handleStartDemo = () => {
    setShowDemo(true);
    setMockConversation([
      {
        content: language === "en" 
          ? `Welcome to AGAM Crisis Support. You can text HELP to ${crisisNumber} anytime for crisis assistance.` 
          : `AGAM நெருக்கடி ஆதரவுக்கு வரவேற்கிறோம். நெருக்கடி உதவிக்கு எந்த நேரத்திலும் ${crisisNumber} க்கு HELP என்று SMS அனுப்பலாம்.`,
        timestamp: new Date(),
        type: 'incoming'
      }
    ]);
  };
  
  // Format phone number as user types
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only digits
    const digits = e.target.value.replace(/\D/g, '');
    
    // Format the phone number as: (123) 456-7890
    if (digits.length <= 3) {
      setPhoneNumber(digits);
    } else if (digits.length <= 6) {
      setPhoneNumber(`(${digits.slice(0, 3)}) ${digits.slice(3)}`);
    } else {
      setPhoneNumber(`(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`);
    }
  };
  
  return (
    <Card className="border bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className={cn(
          "flex items-center gap-2 text-xl",
          language === "ta" && "font-tamil"
        )}>
          <Smartphone className="h-5 w-5" />
          {language === "en" ? "SMS Crisis Support" : "SMS நெருக்கடி ஆதரவு"}
        </CardTitle>
        <CardDescription className={cn(
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? `Text HELP to ${crisisNumber} from any mobile phone - works even on 2G networks` 
            : `எந்த மொபைல் போனிலிருந்தும் ${crisisNumber} க்கு HELP என்று SMS அனுப்பவும் - 2G நெட்வொர்க்குகளிலும் செயல்படும்`}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!showDemo ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-md">
              <div className="text-center max-w-md">
                <MessageSquareText className="h-12 w-12 mb-4 mx-auto text-agam-blue" />
                <h3 className={cn(
                  "text-lg font-medium mb-2",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" ? "Low-Bandwidth Crisis Support" : "குறைந்த-அலைவரிசை நெருக்கடி ஆதரவு"}
                </h3>
                <p className={cn(
                  "text-sm text-gray-600 mb-4",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Our SMS support system works on any mobile phone and network, even in remote areas with limited connectivity." 
                    : "எங்கள் SMS ஆதரவு அமைப்பு எந்த மொபைல் போனிலும் நெட்வொர்க்கிலும் செயல்படும், வரம்பப்படுத்தப்பட்ட இணைப்புடன் தொலைதூர பகுதிகளிலும் கூட."}
                </p>
                <Button 
                  onClick={handleStartDemo} 
                  className="bg-agam-blue hover:bg-agam-blue/90"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span className={cn(language === "ta" && "font-tamil")}>
                    {language === "en" ? "Try SMS Support Demo" : "SMS ஆதரவு டெமோவை முயற்சிக்கவும்"}
                  </span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className={cn(
                  "font-medium mb-2 flex items-center",
                  language === "ta" && "font-tamil"
                )}>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  {language === "en" ? "Works on All Networks" : "அனைத்து நெட்வொர்க்குகளிலும் செயல்படுகிறது"}
                </h4>
                <p className={cn(
                  "text-sm text-gray-600",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Optimized for 2G/3G networks with minimal data requirements." 
                    : "குறைந்தபட்ச தரவு தேவைகளுடன் 2G/3G நெட்வொர்க்குகளுக்கு உகந்ததாக்கப்பட்டது."}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className={cn(
                  "font-medium mb-2 flex items-center",
                  language === "ta" && "font-tamil"
                )}>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  {language === "en" ? "Multilingual Support" : "பல மொழி ஆதரவு"}
                </h4>
                <p className={cn(
                  "text-sm text-gray-600",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Automated responses in both Tamil and English." 
                    : "தமிழ் மற்றும் ஆங்கிலம் ஆகிய இரண்டிலும் தானியங்கி பதில்கள்."}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className={cn(
                  "font-medium mb-2 flex items-center",
                  language === "ta" && "font-tamil"
                )}>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  {language === "en" ? "Human Connection" : "மனித இணைப்பு"}
                </h4>
                <p className={cn(
                  "text-sm text-gray-600",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Routes critical cases to specialized crisis counselors." 
                    : "முக்கியமான வழக்குகளை சிறப்பு நெருக்கடி ஆலோசகர்களுக்கு வழிசெலுத்துகிறது."}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className={cn(
                  "font-medium mb-2 flex items-center",
                  language === "ta" && "font-tamil"
                )}>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  {language === "en" ? "Immediate Response" : "உடனடி பதில்"}
                </h4>
                <p className={cn(
                  "text-sm text-gray-600",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Automated responses within seconds, 24/7 availability." 
                    : "நொடிகளில் தானியங்கி பதில்கள், 24/7 கிடைக்கும் தன்மை."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className={cn(language === "ta" && "font-tamil")}>
                {language === "en" ? "Your Phone Number" : "உங்கள் தொலைபேசி எண்"}
              </Label>
              <Input 
                id="phone"
                placeholder={language === "en" ? "(123) 456-7890" : "தொலைபேசி எண்ணை உள்ளிடவும்"}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={cn(language === "ta" && "font-tamil")}
              />
            </div>
            
            <div className="border rounded-md p-3 h-80 overflow-y-auto flex flex-col gap-3">
              {mockConversation.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    msg.type === 'outgoing' 
                      ? "ml-auto bg-agam-blue text-white" 
                      : "mr-auto bg-gray-100 text-agam-neutral-800",
                    language === "ta" && "font-tamil"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder={language === "en" ? "Type your message..." : "உங்கள் செய்தியை தட்டச்சு செய்யவும்..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(language === "ta" && "font-tamil")}
                onKeyPress={(e) => e.key === 'Enter' && handleSendDemoSMS()}
              />
              <Button
                onClick={handleSendDemoSMS}
                disabled={isSubmitting}
                className="bg-agam-blue hover:bg-agam-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <p className={cn(
              "text-xs text-agam-neutral-600",
              language === "ta" && "font-tamil"
            )}>
              {language === "en" 
                ? "Try texting 'HELP', '1', '2', '3', '4', or '5' to see different automated responses." 
                : "'HELP', '1', '2', '3', '4', அல்லது '5' என்று SMS அனுப்பி வெவ்வேறு தானியங்கி பதில்களைக் காண முயற்சிக்கவும்."}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 mt-4">
        <div className={cn(
          "text-sm text-agam-neutral-600 w-full",
          language === "ta" && "font-tamil"
        )}>
          <AlertCircle className="h-4 w-4 inline-block mr-1 text-yellow-500" />
          {language === "en" 
            ? "This is a demonstration. In a real implementation, messages would be sent through the Twilio API." 
            : "இது ஒரு செயல்விளக்கம். உண்மையான அமலாக்கத்தில், செய்திகள் Twilio API மூலம் அனுப்பப்படும்."}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CrisisSMSSupport;
