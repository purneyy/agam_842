
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { 
  MessageCircle, 
  Stethoscope, 
  BookOpen, 
  BookText, 
  HeartHandshake 
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Feature data with icons and routes
  const features = [
    {
      title: language === "en" ? "Communication Assistant" : "தொடர்பு உதவியாளர்",
      description: language === "en" 
        ? "Text-to-symbol converter and speech tools for non-verbal communication" 
        : "வாய்மொழியற்ற தொடர்புக்கான உரை-குறியீடு மாற்றி மற்றும் பேச்சு கருவிகள்",
      icon: <MessageCircle className="h-6 w-6" />,
      route: "/dashboard/communication",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: language === "en" ? "Screening & Diagnosis" : "திரையிடல் & கண்டறிதல்",
      description: language === "en" 
        ? "On-device AI risk assessment using M-CHAT-R screening" 
        : "M-CHAT-R திரையிடலைப் பயன்படுத்தி சாதனத்தில் AI அபாய மதிப்பீடு",
      icon: <Stethoscope className="h-6 w-6" />,
      route: "/dashboard/screening",
      color: "bg-green-100 text-green-700"
    },
    {
      title: language === "en" ? "Therapy Content" : "சிகிச்சை உள்ளடக்கம்",
      description: language === "en" 
        ? "Culturally relevant therapy guides in Tamil & English" 
        : "தமிழ் & ஆங்கிலத்தில் கலாச்சார சம்பந்தமான சிகிச்சை வழிகாட்டிகள்",
      icon: <BookOpen className="h-6 w-6" />,
      route: "/dashboard/therapy",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: language === "en" ? "Tale Therapy" : "கதை சிகிச்சை",
      description: language === "en" 
        ? "Interactive therapy stories featuring Tamil culture" 
        : "தமிழ் கலாச்சாரத்தை சித்தரிக்கும் தொடர்புடைய சிகிச்சை கதைகள்",
      icon: <BookText className="h-6 w-6" />,
      route: "/dashboard/tale-therapy",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: language === "en" ? "Crisis Support" : "நெருக்கடி ஆதரவு",
      description: language === "en" 
        ? "Chatbot, community forum, and help guides" 
        : "அரட்டை, சமூக மன்றம், மற்றும் உதவி வழிகாட்டிகள்",
      icon: <HeartHandshake className="h-6 w-6" />,
      route: "/dashboard/crisis-support",
      color: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Dashboard" : "டாஷ்போர்டு"}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "Welcome to AGAM. Select a module to get started." 
            : "அகம்க்கு வரவேற்கிறோம். தொடங்க ஒரு தொகுதியைத் தேர்ந்தெடுக்கவும்."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(feature.route)}
          >
            <CardHeader className="pb-2">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-2", feature.color)}>
                {feature.icon}
              </div>
              <CardTitle className={cn("text-xl", language === "ta" && "font-tamil")}>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={cn("text-sm", language === "ta" && "font-tamil")}>
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
