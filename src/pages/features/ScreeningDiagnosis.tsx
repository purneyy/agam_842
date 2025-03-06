
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { mchatQuestions, assessRisk } from "../../data/mchat-questions";

const ScreeningDiagnosis: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<{ level: number; description: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Reset assessment if language changes
  useEffect(() => {
    resetAssessment();
  }, [language]);
  
  const resetAssessment = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setResult(null);
    setIsComplete(false);
  };
  
  const handleAnswer = (answer: boolean) => {
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    // Move to next question or complete assessment
    if (currentQuestion < mchatQuestions[language === "en" ? "en" : "ta"].length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };
  
  const completeAssessment = () => {
    // Ensure all questions are answered
    if (Object.keys(answers).length === mchatQuestions[language === "en" ? "en" : "ta"].length) {
      const assessmentResult = assessRisk(answers);
      setResult(assessmentResult);
      setIsComplete(true);
      
      toast({
        title: language === "en" ? "Assessment Complete" : "மதிப்பீடு முடிந்தது",
        description: language === "en" 
          ? "Your M-CHAT-R assessment has been processed." 
          : "உங்கள் M-CHAT-R மதிப்பீடு செயலாக்கப்பட்டது.",
      });
    }
  };
  
  const getCurrentQuestion = () => {
    return mchatQuestions[language === "en" ? "en" : "ta"][currentQuestion - 1];
  };
  
  const renderResultDescription = () => {
    if (!result) return null;
    
    const descriptions = {
      en: {
        0: "Your responses suggest minimal to no risk factors for autism spectrum disorder. Continue monitoring your child's development.",
        1: "Your responses suggest some mild risk factors for autism spectrum disorder. Consider discussing with a healthcare provider.",
        2: "Your responses suggest moderate risk factors for autism spectrum disorder. It is recommended to consult with a healthcare provider for further evaluation.",
        3: "Your responses suggest significant risk factors for autism spectrum disorder. It is strongly recommended to consult with a healthcare provider for comprehensive evaluation."
      },
      ta: {
        0: "உங்கள் பதில்கள் ஆட்டிசம் ஸ்பெக்ட்ரம் குறைபாட்டிற்கான குறைந்தபட்ச அல்லது எந்த ஆபத்து காரணிகளையும் குறிக்கவில்லை. உங்கள் குழந்தையின் வளர்ச்சியை தொடர்ந்து கண்காணியுங்கள்.",
        1: "உங்கள் பதில்கள் ஆட்டிசம் ஸ்பெக்ட்ரம் குறைபாட்டிற்கான சில லேசான ஆபத்து காரணிகளைக் குறிக்கின்றன. ஒரு சுகாதார வழங்குநருடன் விவாதிப்பதைக் கருத்தில் கொள்ளுங்கள்.",
        2: "உங்கள் பதில்கள் ஆட்டிசம் ஸ்பெக்ட்ரம் குறைபாட்டிற்கான மிதமான ஆபத்து காரணிகளைக் குறிக்கின்றன. மேலும் மதிப்பீட்டிற்கு ஒரு சுகாதார வழங்குநரை ஆலோசிக்க பரிந்துரைக்கப்படுகிறது.",
        3: "உங்கள் பதில்கள் ஆட்டிசம் ஸ்பெக்ட்ரம் குறைபாட்டிற்கான குறிப்பிடத்தக்க ஆபத்து காரணிகளைக் குறிக்கின்றன. விரிவான மதிப்பீட்டிற்கு ஒரு சுகாதார வழங்குநரை ஆலோசிக்க கடுமையாக பரிந்துரைக்கப்படுகிறது."
      }
    };
    
    return descriptions[language === "en" ? "en" : "ta"][result.level];
  };
  
  const getResultColor = () => {
    if (!result) return "bg-gray-100";
    
    switch (result.level) {
      case 0: return "bg-green-50 border-green-200";
      case 1: return "bg-blue-50 border-blue-200";
      case 2: return "bg-yellow-50 border-yellow-200";
      case 3: return "bg-red-50 border-red-200";
      default: return "bg-gray-100";
    }
  };
  
  const getResultTextColor = () => {
    if (!result) return "text-gray-800";
    
    switch (result.level) {
      case 0: return "text-green-800";
      case 1: return "text-blue-800";
      case 2: return "text-yellow-800";
      case 3: return "text-red-800";
      default: return "text-gray-800";
    }
  };
  
  const getResultIcon = () => {
    if (!result) return null;
    
    switch (result.level) {
      case 0: 
      case 1:
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 2:
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 3:
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Autism Screening & Diagnosis" : "ஆட்டிசம் திரையிடல் & கண்டறிதல்"}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "On-device AI risk assessment using M-CHAT-R screening for early detection and intervention." 
            : "ஆரம்ப கண்டறிதல் மற்றும் தலையீட்டுக்கு M-CHAT-R ஐ பயன்படுத்தி சாதனத்தில் AI அபாய மதிப்பீடு."}
        </p>
      </div>

      <Tabs defaultValue="screening" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="screening" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "M-CHAT-R Screening" : "M-CHAT-R திரையிடல்"}
          </TabsTrigger>
          <TabsTrigger value="results" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Results & Assessment" : "முடிவுகள் & மதிப்பீடு"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="screening" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            {!isComplete ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={cn(
                    "text-xl font-medium",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en" ? "Question" : "கேள்வி"} {currentQuestion}/{mchatQuestions[language === "en" ? "en" : "ta"].length}
                  </h2>
                  
                  <span className="text-sm px-3 py-1 bg-agam-blue/10 text-agam-blue rounded-full">
                    M-CHAT-R
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className={cn(
                    "text-lg font-medium mb-2",
                    language === "ta" && "font-tamil"
                  )}>
                    {getCurrentQuestion().question}
                  </h3>
                  
                  <p className={cn(
                    "text-sm text-gray-600",
                    language === "ta" && "font-tamil"
                  )}>
                    {getCurrentQuestion().info}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => handleAnswer(true)}
                    className="flex-1 gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {language === "en" ? "Yes" : "ஆம்"}
                    </span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {language === "en" ? "No" : "இல்லை"}
                    </span>
                  </Button>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="ghost"
                    disabled={currentQuestion === 1}
                    onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                    className={cn(language === "ta" && "font-tamil")}
                  >
                    {language === "en" ? "Previous" : "முந்தைய"}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={resetAssessment}
                    className={cn(language === "ta" && "font-tamil")}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {language === "en" ? "Reset" : "மீட்டமை"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={cn(
                  "text-2xl font-medium mb-2",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" ? "Screening Complete" : "திரையிடல் முடிந்தது"}
                </h2>
                <p className={cn(
                  "text-gray-600 mb-6",
                  language === "ta" && "font-tamil"
                )}>
                  {language === "en" 
                    ? "Your responses have been processed. View your results in the Results & Assessment tab." 
                    : "உங்கள் பதில்கள் செயலாக்கப்பட்டுள்ளன. முடிவுகள் & மதிப்பீடு தாவலில் உங்கள் முடிவுகளைக் காணலாம்."}
                </p>
                <Button 
                  onClick={resetAssessment}
                  variant="outline"
                  className={cn(language === "ta" && "font-tamil")}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === "en" ? "Start New Assessment" : "புதிய மதிப்பீட்டைத் தொடங்குங்கள்"}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {result ? (
            <div className={cn("p-6 rounded-lg border", getResultColor())}>
              <div className="flex items-start gap-4">
                {getResultIcon()}
                <div>
                  <h2 className={cn(
                    "text-xl font-medium mb-2",
                    getResultTextColor(),
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en" ? "Assessment Result: " : "மதிப்பீடு முடிவு: "}
                    <span className="font-bold">
                      {language === "en" ? result.description : (
                        result.level === 0 ? "குறைந்த ஆபத்து" :
                        result.level === 1 ? "குறைவான ஆபத்து" :
                        result.level === 2 ? "நடுத்தர ஆபத்து" :
                        "அதிக ஆபத்து"
                      )}
                    </span>
                  </h2>
                  
                  <p className={cn(
                    "text-gray-700 mb-4",
                    language === "ta" && "font-tamil"
                  )}>
                    {renderResultDescription()}
                  </p>
                  
                  {result.level > 0 && (
                    <div className={cn(
                      "mt-4 p-4 bg-white bg-opacity-50 rounded-md border",
                      language === "ta" && "font-tamil"
                    )}>
                      <h3 className="font-medium mb-2">
                        {language === "en" ? "Next Steps" : "அடுத்த படிகள்"}:
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>
                          {language === "en"
                            ? "Consult with a developmental pediatrician or child psychologist"
                            : "வளர்ச்சி குழந்தை மருத்துவர் அல்லது குழந்தை உளவியலாளரை ஆலோசிக்கவும்"}
                        </li>
                        <li>
                          {language === "en"
                            ? "Consider a comprehensive developmental evaluation"
                            : "விரிவான வளர்ச்சி மதிப்பீட்டைக் கருத்தில் கொள்ளுங்கள்"}
                        </li>
                        <li>
                          {language === "en"
                            ? "Access early intervention services if available"
                            : "இருந்தால் ஆரம்ப தலையீட்டு சேவைகளை அணுகவும்"}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className={cn(
                "text-xl font-medium mb-2",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "No Results Yet" : "இன்னும் முடிவுகள் இல்லை"}
              </h2>
              <p className={cn(
                "text-gray-600 mb-6",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" 
                  ? "Complete the M-CHAT-R screening questionnaire to view your assessment results." 
                  : "உங்கள் மதிப்பீட்டு முடிவுகளைக் காண M-CHAT-R திரையிடல் கேள்வித்தாளை நிறைவு செய்யவும்."}
              </p>
              <Button 
                onClick={() => {
                  document.querySelector('[data-value="screening"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
                className={cn(
                  "gap-2",
                  language === "ta" && "font-tamil"
                )}
              >
                <ArrowRight className="w-4 h-4" />
                {language === "en" ? "Start Screening" : "திரையிடலைத் தொடங்குங்கள்"}
              </Button>
            </div>
          )}
          
          {result && (
            <div className="mt-8">
              <h3 className={cn(
                "text-lg font-medium mb-4",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Understanding Autism Support Levels" : "ஆட்டிசம் ஆதரவு நிலைகளைப் புரிந்து கொள்வது"}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-l-4 border-l-blue-500">
                  <h4 className={cn(
                    "font-medium mb-2",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en" ? "Level 1: Requiring Support" : "நிலை 1: ஆதரவு தேவை"}
                  </h4>
                  <p className={cn(
                    "text-sm text-gray-700",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en"
                      ? "Without supports in place, deficits in social communication cause noticeable impairments."
                      : "ஆதரவுகள் இல்லாமல், சமூக தொடர்பில் குறைபாடுகள் கவனிக்கத்தக்க குறைபாடுகளை ஏற்படுத்துகின்றன."}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-l-4 border-l-yellow-500">
                  <h4 className={cn(
                    "font-medium mb-2",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en" ? "Level 2: Requiring Substantial Support" : "நிலை 2: கணிசமான ஆதரவு தேவை"}
                  </h4>
                  <p className={cn(
                    "text-sm text-gray-700",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en"
                      ? "Marked deficits in verbal and nonverbal social communication skills; social impairments apparent even with supports in place."
                      : "வாய்மொழி மற்றும் வாய்மொழியற்ற சமூக தொடர்புத் திறன்களில் குறிப்பிடத்தக்க குறைபாடுகள்; ஆதரவுகள் இருந்தாலும் சமூக குறைபாடுகள் தெளிவாகத் தெரியும்."}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-l-4 border-l-red-500">
                  <h4 className={cn(
                    "font-medium mb-2",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en" ? "Level 3: Requiring Very Substantial Support" : "நிலை 3: மிகவும் கணிசமான ஆதரவு தேவை"}
                  </h4>
                  <p className={cn(
                    "text-sm text-gray-700",
                    language === "ta" && "font-tamil"
                  )}>
                    {language === "en"
                      ? "Severe deficits in verbal and nonverbal social communication skills cause severe impairments in functioning."
                      : "வாய்மொழி மற்றும் வாய்மொழியற்ற சமூக தொடர்புத் திறன்களில் கடுமையான குறைபாடுகள் செயல்பாட்டில் கடுமையான குறைபாடுகளை ஏற்படுத்துகின்றன."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-10 bg-agam-neutral-50 p-6 rounded-lg">
        <h3 className={cn(
          "text-lg font-medium text-agam-neutral-800 mb-3",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "About M-CHAT-R" : "M-CHAT-R பற்றி"}
        </h3>
        <p className={cn(
          "text-sm text-agam-neutral-600 mb-4",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "The Modified Checklist for Autism in Toddlers, Revised (M-CHAT-R) is a validated screening tool for autism spectrum disorders in children 16-30 months of age." 
            : "குழந்தைகளில் ஆட்டிசத்திற்கான திருத்தப்பட்ட சரிபார்ப்புப் பட்டியல், திருத்தப்பட்டது (M-CHAT-R) 16-30 மாதங்கள் வயதுடைய குழந்தைகளில் ஆட்டிசம் ஸ்பெக்ட்ரம் குறைபாடுகளுக்கான சரிபார்க்கப்பட்ட திரையிடல் கருவியாகும்."}
        </p>
        
        <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
          <p className={cn(
            "text-xs text-yellow-800",
            language === "ta" && "font-tamil"
          )}>
            {language === "en" 
              ? "This tool provides an initial screening only and is not a diagnostic tool. Always consult with healthcare professionals for proper diagnosis and treatment." 
              : "இந்த கருவி ஆரம்ப திரையிடலை மட்டுமே வழங்குகிறது மற்றும் நோயறிதல் கருவி அல்ல. சரியான நோயறிதல் மற்றும் சிகிச்சைக்கு எப்போதும் சுகாதார நிபுணர்களை ஆலோசிக்கவும்."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreeningDiagnosis;
