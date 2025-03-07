
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  MessageCircle, 
  Users, 
  BookOpen,
  Smartphone
} from "lucide-react";
import { cn } from "../../lib/utils";
import CrisisChatbot from "../../components/crisis/CrisisChatbot";
import CommunityForum from "../../components/crisis/CommunityForum";
import HelpGuides from "../../components/crisis/HelpGuides";
import CrisisSMSSupport from "../../components/crisis/CrisisSMSSupport";

// Translations for the Crisis Support page
const translations = {
  en: {
    title: "Crisis Support & Community Assistance",
    description: "Access crisis support, connect with the community, and find help guides for managing difficult situations",
    tabs: {
      chatbot: "Crisis Support Chatbot",
      community: "Community Forum",
      guides: "Help Guides",
      sms: "SMS Support"
    },
    note: "The crisis support chatbot provides immediate guidance for caregivers and individuals with autism during difficult moments. Common FAQs are available as buttons below the chat."
  },
  ta: {
    title: "நெருக்கடி ஆதரவு & சமூக உதவி",
    description: "நெருக்கடி ஆதரவை அணுகவும், சமூகத்துடன் இணையவும், மற்றும் கடினமான சூழ்நிலைகளை நிர்வகிக்க உதவி வழிகாட்டிகளைக் கண்டறியவும்",
    tabs: {
      chatbot: "நெருக்கடி ஆதரவு அரட்டை",
      community: "சமூக மன்றம்",
      guides: "உதவி வழிகாட்டிகள்",
      sms: "SMS ஆதரவு"
    },
    note: "நெருக்கடி ஆதரவு அரட்டை கடினமான தருணங்களில் பராமரிப்பாளர்கள் மற்றும் ஆட்டிசம் உள்ள தனிநபர்களுக்கு உடனடி வழிகாட்டுதலை வழங்குகிறது. பொதுவான கேள்விகள் அரட்டைக்கு கீழே பொத்தான்களாக கிடைக்கின்றன."
  }
};

const CrisisSupport: React.FC = () => {
  const { language } = useLanguage();
  
  const t = (path: string): string => {
    const keys = path.split(".");
    let result: any = translations[language as keyof typeof translations];
    
    for (const key of keys) {
      if (result && result[key as keyof typeof result]) {
        result = result[key as keyof typeof result];
      } else {
        return path; // Return the path if translation is missing
      }
    }
    
    return result as string;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {t("title")}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {t("description")}
        </p>
      </div>

      <Tabs defaultValue="chatbot" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger 
            value="chatbot" 
            className={cn(language === "ta" && "font-tamil")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("tabs.chatbot")}
          </TabsTrigger>
          <TabsTrigger 
            value="sms"
            className={cn(language === "ta" && "font-tamil")}
          >
            <Smartphone className="mr-2 h-4 w-4" />
            {t("tabs.sms")}
          </TabsTrigger>
          <TabsTrigger 
            value="community"
            className={cn(language === "ta" && "font-tamil")}
          >
            <Users className="mr-2 h-4 w-4" />
            {t("tabs.community")}
          </TabsTrigger>
          <TabsTrigger 
            value="guides"
            className={cn(language === "ta" && "font-tamil")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {t("tabs.guides")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chatbot">
          <div className="mb-4">
            <p className={cn(
              "text-sm text-agam-neutral-600",
              language === "ta" && "font-tamil"
            )}>
              {t("note")}
            </p>
          </div>
          <CrisisChatbot />
        </TabsContent>

        <TabsContent value="sms">
          <CrisisSMSSupport />
        </TabsContent>

        <TabsContent value="community">
          <CommunityForum />
        </TabsContent>

        <TabsContent value="guides">
          <HelpGuides />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrisisSupport;
