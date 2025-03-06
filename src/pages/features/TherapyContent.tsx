
import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Printer, 
  Upload, 
  Music, 
  FolderPlus,
  FileDown
} from "lucide-react";

// Sample therapy resources data
const therapyResources = {
  en: [
    {
      id: "social-skills",
      title: "Social Skills Development",
      description: "Comprehensive guide for developing social interaction abilities",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "sensory-regulation",
      title: "Sensory Regulation Techniques",
      description: "Practical strategies for managing sensory sensitivities",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "daily-routines",
      title: "Daily Routines & Schedules",
      description: "Visual schedules and routine management tools",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "emotional-regulation",
      title: "Emotional Regulation",
      description: "Techniques to recognize and manage emotions effectively",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    }
  ],
  ta: [
    {
      id: "social-skills",
      title: "சமூக திறன் மேம்பாடு",
      description: "சமூக தொடர்பு திறன்களை வளர்ப்பதற்கான விரிவான வழிகாட்டி",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "sensory-regulation",
      title: "உணர் ஒழுங்குமுறை நுட்பங்கள்",
      description: "உணர் உணர்திறன்களை நிர்வகிப்பதற்கான நடைமுறை உத்திகள்",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "daily-routines",
      title: "தினசரி வழக்கங்கள் & அட்டவணைகள்",
      description: "காட்சி அட்டவணைகள் மற்றும் வழக்க மேலாண்மை கருவிகள்",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "emotional-regulation",
      title: "உணர்ச்சி ஒழுங்குமுறை",
      description: "உணர்வுகளை அங்கீகரிக்க மற்றும் திறம்பட நிர்வகிக்க நுட்பங்கள்",
      type: "pdf",
      thumbnail: "/placeholder.svg"
    }
  ]
};

// Sample Tamil cultural content
const culturalContent = {
  en: [
    {
      id: "aathichudi",
      title: "Aathichudi for Children",
      description: "Simplified moral couplets from Avvaiyar for children with autism",
      type: "rhymes",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "thirukkural",
      title: "Thirukkural Simplified",
      description: "Adapted Thirukkural verses with social skills lessons",
      type: "rhymes",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "tenali",
      title: "Tenali Raman Stories",
      description: "Stories that teach social understanding and problem-solving",
      type: "stories",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "panchatantra",
      title: "Tamil Panchatantra",
      description: "Animal fables that help understand social dynamics",
      type: "stories",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "pongal",
      title: "Pongal Celebration Guide",
      description: "Visual guide to Pongal traditions and activities",
      type: "customs",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "kolam",
      title: "Kolam Drawing Tutorial",
      description: "Step-by-step visual guide for drawing kolam patterns",
      type: "customs",
      thumbnail: "/placeholder.svg"
    }
  ],
  ta: [
    {
      id: "aathichudi",
      title: "குழந்தைகளுக்கான ஆத்திசூடி",
      description: "ஆட்டிசம் உள்ள குழந்தைகளுக்கான அவ்வையாரின் எளிமையான நீதி இரட்டைக் குறள்கள்",
      type: "rhymes",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "thirukkural",
      title: "எளிமைப்படுத்தப்பட்ட திருக்குறள்",
      description: "சமூக திறன் பாடங்களுடன் தழுவப்பட்ட திருக்குறள் பாடல்கள்",
      type: "rhymes",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "tenali",
      title: "தெனாலி ராமன் கதைகள்",
      description: "சமூக புரிதல் மற்றும் பிரச்சினை தீர்த்தலை கற்பிக்கும் கதைகள்",
      type: "stories",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "panchatantra",
      title: "தமிழ் பஞ்சதந்திரம்",
      description: "சமூக இயக்கவியலைப் புரிந்துகொள்ள உதவும் விலங்கு கதைகள்",
      type: "stories",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "pongal",
      title: "பொங்கல் கொண்டாட்ட வழிகாட்டி",
      description: "பொங்கல் பாரம்பரியம் மற்றும் செயல்பாடுகளுக்கான காட்சி வழிகாட்டி",
      type: "customs",
      thumbnail: "/placeholder.svg"
    },
    {
      id: "kolam",
      title: "கோலம் வரைதல் பயிற்சி",
      description: "கோலம் வடிவங்களை வரைவதற்கான படிப்படியான காட்சி வழிகாட்டி",
      type: "customs",
      thumbnail: "/placeholder.svg"
    }
  ]
};

// Sample flashcards data
const flashcards = {
  en: [
    {
      id: "daily-routines",
      title: "Daily Routines",
      description: "18 flashcards for common daily activities",
      cards: ["Brushing teeth", "Eating breakfast", "Getting dressed", "Greeting elders"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: "emotions",
      title: "Emotions",
      description: "12 flashcards for identifying feelings",
      cards: ["Happy", "Sad", "Angry", "Excited", "Scared", "Calm"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: "social-interactions",
      title: "Social Interactions",
      description: "15 flashcards for common social scenarios",
      cards: ["Asking for help", "Sharing toys", "Waiting your turn", "Saying thank you"],
      thumbnail: "/placeholder.svg"
    }
  ],
  ta: [
    {
      id: "daily-routines",
      title: "தினசரி வழக்கங்கள்",
      description: "பொதுவான தினசரி செயல்பாடுகளுக்கான 18 ஃபிளாஷ்கார்டுகள்",
      cards: ["பல் துலக்குதல்", "காலை உணவு", "உடை அணிதல்", "பெரியவர்களை வணங்குதல்"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: "emotions",
      title: "உணர்ச்சிகள்",
      description: "உணர்வுகளை அடையாளம் காண 12 ஃபிளாஷ்கார்டுகள்",
      cards: ["மகிழ்ச்சி", "துக்கம்", "கோபம்", "உற்சாகம்", "பயம்", "அமைதி"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: "social-interactions",
      title: "சமூக தொடர்புகள்",
      description: "பொதுவான சமூக சூழல்களுக்கான 15 ஃபிளாஷ்கார்டுகள்",
      cards: ["உதவி கேட்பது", "பொம்மைகளை பகிர்வது", "உங்கள் முறைக்காக காத்திருப்பது", "நன்றி சொல்வது"],
      thumbnail: "/placeholder.svg"
    }
  ]
};

const TherapyContent: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [culturalFilter, setCulturalFilter] = useState("all");

  const handleDownload = (resourceId: string) => {
    toast({
      title: language === "en" ? "Downloading Resource" : "ஆதாரத்தை பதிவிறக்குகிறது",
      description: language === "en" 
        ? "Resource is being downloaded for offline use." 
        : "ஆஃப்லைன் பயன்பாட்டிற்காக ஆதாரம் பதிவிறக்கப்படுகிறது.",
    });
    
    // In a real app, this would download the actual resource
    setTimeout(() => {
      toast({
        title: language === "en" ? "Download Complete" : "பதிவிறக்கம் முடிந்தது",
        description: language === "en" 
          ? "Resource is now available offline." 
          : "ஆதாரம் இப்போது ஆஃப்லைனில் கிடைக்கிறது.",
        variant: "success"
      });
    }, 1500);
  };

  const handleUpload = () => {
    toast({
      title: language === "en" ? "Upload Feature" : "பதிவேற்ற அம்சம்",
      description: language === "en" 
        ? "This feature allows you to upload custom therapy materials." 
        : "இந்த அம்சம் தனிப்பயன் சிகிச்சை பொருட்களை பதிவேற்ற அனுமதிக்கிறது.",
    });
  };

  const handlePrint = (flashcardId: string) => {
    toast({
      title: language === "en" ? "Preparing for Print" : "அச்சிடுவதற்கு தயாராகிறது",
      description: language === "en" 
        ? "Preparing flashcards for printing..." 
        : "ஃபிளாஷ்கார்டுகளை அச்சிடுவதற்கு தயாராகிறது...",
    });
    
    // In a real app, this would prepare a printable version
    setTimeout(() => {
      toast({
        title: language === "en" ? "Print Ready" : "அச்சிட தயார்",
        description: language === "en" 
          ? "Flashcards are ready to print. Check your downloads." 
          : "ஃபிளாஷ்கார்டுகள் அச்சிட தயாராக உள்ளன. உங்கள் பதிவிறக்கங்களைச் சரிபார்க்கவும்.",
        variant: "success"
      });
    }, 1500);
  };

  const handleDownloadAll = () => {
    toast({
      title: language === "en" ? "Downloading All Resources" : "அனைத்து ஆதாரங்களையும் பதிவிறக்குகிறது",
      description: language === "en" 
        ? "All therapy resources are being prepared for download." 
        : "அனைத்து சிகிச்சை ஆதாரங்களும் பதிவிறக்கத்திற்கு தயாராகின்றன.",
    });
    
    // In a real app, this would download all resources
    setTimeout(() => {
      toast({
        title: language === "en" ? "Download Complete" : "பதிவிறக்கம் முடிந்தது",
        description: language === "en" 
          ? "All resources are now available offline." 
          : "அனைத்து ஆதாரங்களும் இப்போது ஆஃப்லைனில் கிடைக்கின்றன.",
        variant: "success"
      });
    }, 3000);
  };

  const filteredCulturalContent = culturalFilter === "all" 
    ? culturalContent[language === "en" ? "en" : "ta"]
    : culturalContent[language === "en" ? "en" : "ta"].filter(item => item.type === culturalFilter);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Therapy Content" : "சிகிச்சை உள்ளடக்கம்"}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "Culturally relevant therapy guides and resources" 
            : "கலாச்சார சம்பந்தமான சிகிச்சை வழிகாட்டிகள் மற்றும் ஆதாரங்கள்"}
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleDownloadAll} className="gap-2 bg-agam-blue hover:bg-agam-blue/90">
          <Download className="h-4 w-4" />
          <span className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Download All Resources" : "அனைத்து ஆதாரங்களையும் பதிவிறக்கவும்"}
          </span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="resources" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Therapy Resources" : "சிகிச்சை ஆதாரங்கள்"}
          </TabsTrigger>
          <TabsTrigger value="cultural" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Tamil Cultural Content" : "தமிழ் கலாச்சார உள்ளடக்கம்"}
          </TabsTrigger>
          <TabsTrigger value="flashcards" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Printable Flashcards" : "அச்சிடக்கூடிய ஃபிளாஷ்கார்டுகள்"}
          </TabsTrigger>
          <TabsTrigger value="custom" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Custom Materials" : "தனிப்பயன் பொருட்கள்"}
          </TabsTrigger>
        </TabsList>
        
        {/* Therapy Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapyResources[language === "en" ? "en" : "ta"].map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {resource.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{language === "en" ? "View" : "பார்க்க"}</span>
                  </Button>
                  <Button onClick={() => handleDownload(resource.id)} className="gap-2">
                    <Download className="h-4 w-4" />
                    <span>{language === "en" ? "Download" : "பதிவிறக்கம்"}</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Tamil Cultural Content Tab */}
        <TabsContent value="cultural" className="space-y-6">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button 
              variant={culturalFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCulturalFilter("all")}
            >
              {language === "en" ? "All" : "அனைத்தும்"}
            </Button>
            <Button 
              variant={culturalFilter === "rhymes" ? "default" : "outline"}
              size="sm"
              onClick={() => setCulturalFilter("rhymes")}
            >
              {language === "en" ? "Rhymes" : "பாடல்கள்"}
            </Button>
            <Button 
              variant={culturalFilter === "stories" ? "default" : "outline"}
              size="sm"
              onClick={() => setCulturalFilter("stories")}
            >
              {language === "en" ? "Stories" : "கதைகள்"}
            </Button>
            <Button 
              variant={culturalFilter === "customs" ? "default" : "outline"}
              size="sm"
              onClick={() => setCulturalFilter("customs")}
            >
              {language === "en" ? "Customs" : "பழக்க வழக்கங்கள்"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCulturalContent.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={cn(
                      language === "ta" && "font-tamil",
                      item.type === "rhymes" ? "bg-blue-50 text-blue-600 border-blue-200" :
                      item.type === "stories" ? "bg-green-50 text-green-600 border-green-200" :
                      "bg-amber-50 text-amber-600 border-amber-200"
                    )}>
                      {item.type === "rhymes" 
                        ? (language === "en" ? "Rhymes" : "பாடல்கள்")
                        : item.type === "stories"
                          ? (language === "en" ? "Stories" : "கதைகள்")
                          : (language === "en" ? "Customs" : "பழக்க வழக்கங்கள்")
                      }
                    </Badge>
                    {item.type === "rhymes" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Music className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{language === "en" ? "Read" : "படிக்க"}</span>
                  </Button>
                  <Button onClick={() => handleDownload(item.id)} className="gap-2">
                    <Download className="h-4 w-4" />
                    <span>{language === "en" ? "Download" : "பதிவிறக்கம்"}</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Printable Flashcards Tab */}
        <TabsContent value="flashcards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards[language === "en" ? "en" : "ta"].map((flashcard) => (
              <Card key={flashcard.id}>
                <CardHeader>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {flashcard.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {flashcard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {flashcard.cards.slice(0, 4).map((card, idx) => (
                      <Badge key={idx} variant="outline" className={cn(
                        "py-1.5",
                        language === "ta" && "font-tamil"
                      )}>
                        {card}
                      </Badge>
                    ))}
                    {flashcard.cards.length > 4 && (
                      <Badge variant="outline" className="py-1.5 bg-gray-50">
                        +{flashcard.cards.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{language === "en" ? "Preview" : "முன்னோட்டம்"}</span>
                  </Button>
                  <Button onClick={() => handlePrint(flashcard.id)} className="gap-2">
                    <Printer className="h-4 w-4" />
                    <span>{language === "en" ? "Print" : "அச்சிடுக"}</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Custom Materials Tab */}
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={cn(language === "ta" && "font-tamil")}>
                {language === "en" ? "Upload Custom Materials" : "தனிப்பயன் பொருட்களைப் பதிவேற்றவும்"}
              </CardTitle>
              <CardDescription className={cn(language === "ta" && "font-tamil")}>
                {language === "en" 
                  ? "Add your own therapy materials for personalized learning" 
                  : "தனிப்பயன் கற்றலுக்கான உங்கள் சொந்த சிகிச்சை பொருட்களைச் சேர்க்கவும்"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="material-type" className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Material Type" : "பொருள் வகை"}
                </Label>
                <select id="material-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="pdf">PDF Document</option>
                  <option value="image">Image</option>
                  <option value="audio">Audio</option>
                  <option value="text">Text File</option>
                </select>
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="material-title" className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Title" : "தலைப்பு"}
                </Label>
                <Input id="material-title" placeholder={language === "en" ? "Enter a title" : "தலைப்பை உள்ளிடவும்"} />
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="material-description" className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Description" : "விளக்கம்"}
                </Label>
                <Input id="material-description" placeholder={language === "en" ? "Enter a description" : "விளக்கத்தை உள்ளிடவும்"} />
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="material-file" className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "File" : "கோப்பு"}
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="material-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        {language === "en" ? "Click to upload or drag and drop" : "பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "en" ? "PDF, PNG, JPG, MP3 (MAX. 10MB)" : "PDF, PNG, JPG, MP3 (அதிகபட்சம் 10MB)"}
                      </p>
                    </div>
                    <input id="material-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpload} className="gap-2">
                <FolderPlus className="h-4 w-4" />
                <span className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Upload Material" : "பொருளைப் பதிவேற்றவும்"}
                </span>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example of a custom uploaded material */}
            <Card>
              <CardHeader>
                <CardTitle className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "My Therapy Cards" : "எனது சிகிச்சை அட்டைகள்"}
                </CardTitle>
                <CardDescription className={cn(language === "ta" && "font-tamil")}>
                  {language === "en" ? "Uploaded on May 15, 2023" : "மே 15, 2023 அன்று பதிவேற்றப்பட்டது"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center border-y">
                  <FileDown className="h-16 w-16 text-gray-400" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{language === "en" ? "View" : "பார்க்க"}</span>
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>{language === "en" ? "Download" : "பதிவிறக்கம்"}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TherapyContent;
