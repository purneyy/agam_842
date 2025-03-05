
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";

const CommunicationAssistant: React.FC = () => {
  const { language } = useLanguage();

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
            ? "Coming soon - Text-to-symbol converter, speech reader, and prediction AI" 
            : "விரைவில் வருகிறது - உரை-குறியீடு மாற்றி, பேச்சு வாசிப்பாளர், மற்றும் கணிப்பு AI"}
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-12 text-center">
        <h2 className={cn(
          "text-2xl font-bold text-agam-neutral-800 mb-4",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Feature Under Development" : "அம்சம் உருவாக்கத்தில் உள்ளது"}
        </h2>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "We're working hard to bring you this feature soon. Check back later!" 
            : "இந்த அம்சத்தை விரைவில் கொண்டுவர நாங்கள் கடினமாக உழைத்து வருகிறோம். பின்னர் மீண்டும் சரிபார்க்கவும்!"}
        </p>
      </div>
    </div>
  );
};

export default CommunicationAssistant;
