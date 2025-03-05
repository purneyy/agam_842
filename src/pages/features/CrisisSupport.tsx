
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  MessageCircle, 
  Users, 
  BookOpen 
} from "lucide-react";
import { cn } from "../../lib/utils";
import CrisisChatbot from "../../components/crisis/CrisisChatbot";
import CommunityForum from "../../components/crisis/CommunityForum";
import HelpGuides from "../../components/crisis/HelpGuides";

// Translations for the Crisis Support page
const translations = {
  en: {
    title: "Crisis Support & Community Assistance",
    description: "Access crisis support, connect with the community, and find help guides",
    tabs: {
      chatbot: "Crisis Support Chatbot",
      community: "Community Forum",
      guides: "Help Guides"
    }
  },
  ta: {
    title: "நெருக்கடி ஆதரவு & சமூக உதவி",
    description: "நெருக்கடி ஆதரவை அணுகவும், சமூகத்துடன் இணையவும், மற்றும் உதவி வழிகாட்டிகளைக் கண்டறியவும்",
    tabs: {
      chatbot: "நெருக்கடி ஆதரவு அரட்டை",
      community: "சமூக மன்றம்",
      guides: "உதவி வழிகாட்டிகள்"
    }
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
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger 
            value="chatbot" 
            className={cn(language === "ta" && "font-tamil")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("tabs.chatbot")}
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
          <CrisisChatbot />
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
