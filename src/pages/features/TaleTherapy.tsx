
import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookOpen, 
  Download, 
  Volume2, 
  VolumeX,
  BookText,
  Route,
  FileDown,
  Heart,
  Smile,
  Users
} from "lucide-react";

// Sample therapy stories data
const therapyStories = {
  en: [
    {
      id: "panchatantra-1",
      title: "The Lion and the Mouse: Learning Kindness",
      description: "A story about helping others and showing kindness",
      category: "social-skills",
      progress: 0,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "tenali-1",
      title: "Tenali Rama and the Thieves",
      description: "A story about clever problem-solving in difficult situations",
      category: "problem-solving",
      progress: 25,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "bharatanatyam-1",
      title: "Meena Learns Bharatanatyam",
      description: "A story about perseverance and expressing emotions through dance",
      category: "emotional-expression",
      progress: 0,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "pongal-1",
      title: "Pongal Celebration: A Social Story",
      description: "Preparing for sensory experiences during Pongal celebrations",
      category: "sensory",
      progress: 50,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    }
  ],
  ta: [
    {
      id: "panchatantra-1",
      title: "சிங்கமும் எலியும்: கருணையைக் கற்றல்",
      description: "மற்றவர்களுக்கு உதவுதல் மற்றும் கருணை காட்டுதல் பற்றிய கதை",
      category: "social-skills",
      progress: 0,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "tenali-1",
      title: "தெனாலி ராமாவும் திருடர்களும்",
      description: "கடினமான சூழ்நிலைகளில் புத்திசாலித்தனமான பிரச்சினை தீர்ப்பு பற்றிய கதை",
      category: "problem-solving",
      progress: 25,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "bharatanatyam-1",
      title: "மீனா பரதநாட்டியம் கற்றுக்கொள்கிறாள்",
      description: "விடாமுயற்சி மற்றும் நடனம் மூலம் உணர்வுகளை வெளிப்படுத்துதல் பற்றிய கதை",
      category: "emotional-expression",
      progress: 0,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    },
    {
      id: "pongal-1",
      title: "பொங்கல் கொண்டாட்டம்: ஒரு சமூக கதை",
      description: "பொங்கல் கொண்டாட்டங்களின் போது உணர் அனுபவங்களுக்கு தயாராகுதல்",
      category: "sensory",
      progress: 50,
      thumbnail: "/placeholder.svg",
      hasAudio: true,
      isInteractive: false
    }
  ]
};

// Sample interactive stories data
const interactiveStories = {
  en: [
    {
      id: "playground-1",
      title: "Making Friends at the Playground",
      description: "Navigate social interactions at a busy playground",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      difficulty: "easy"
    },
    {
      id: "classroom-1",
      title: "A Day at School",
      description: "Navigate classroom challenges and interactions",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      difficulty: "medium"
    },
    {
      id: "festival-1",
      title: "The Crowded Festival",
      description: "Handle sensory overload during a traditional Tamil festival",
      category: "sensory",
      thumbnail: "/placeholder.svg",
      difficulty: "hard"
    }
  ],
  ta: [
    {
      id: "playground-1",
      title: "விளையாட்டு மைதானத்தில் நண்பர்களை உருவாக்குதல்",
      description: "பிஸியான விளையாட்டு மைதானத்தில் சமூக தொடர்புகளை வழிநடத்துங்கள்",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      difficulty: "easy"
    },
    {
      id: "classroom-1",
      title: "பள்ளியில் ஒரு நாள்",
      description: "வகுப்பறை சவால்கள் மற்றும் தொடர்புகளை வழிநடத்துங்கள்",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      difficulty: "medium"
    },
    {
      id: "festival-1",
      title: "நெரிசலான திருவிழா",
      description: "பாரம்பரிய தமிழ் திருவிழாவின் போது உணர் அதிகப்படியை கையாளுங்கள்",
      category: "sensory",
      thumbnail: "/placeholder.svg",
      difficulty: "hard"
    }
  ]
};

// Sample emotion-based story modules
const emotionStories = {
  en: [
    {
      id: "sensory-overload",
      title: "When Everything Gets Too Loud",
      description: "A story about handling sensory overwhelm",
      category: "sensory",
      thumbnail: "/placeholder.svg",
      emotion: "overwhelmed"
    },
    {
      id: "making-friends",
      title: "The New Friend",
      description: "Learn strategies for making friends",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      emotion: "shy"
    },
    {
      id: "expressing-anger",
      title: "When I Feel Angry",
      description: "Healthy ways to express and manage anger",
      category: "emotional-expression",
      thumbnail: "/placeholder.svg",
      emotion: "angry"
    },
    {
      id: "handling-changes",
      title: "When Plans Change",
      description: "Coping with unexpected changes in routine",
      category: "flexibility",
      thumbnail: "/placeholder.svg",
      emotion: "anxious"
    }
  ],
  ta: [
    {
      id: "sensory-overload",
      title: "எல்லாம் மிகவும் சத்தமாக இருக்கும் போது",
      description: "உணர் அதிகப்படியை கையாளுவது பற்றிய கதை",
      category: "sensory",
      thumbnail: "/placeholder.svg",
      emotion: "overwhelmed"
    },
    {
      id: "making-friends",
      title: "புதிய நண்பர்",
      description: "நண்பர்களை உருவாக்குவதற்கான உத்திகளைக் கற்றுக்கொள்ளுங்கள்",
      category: "social-skills",
      thumbnail: "/placeholder.svg",
      emotion: "shy"
    },
    {
      id: "expressing-anger",
      title: "நான் கோபமாக உணரும் போது",
      description: "கோபத்தை வெளிப்படுத்தவும் நிர்வகிக்கவும் ஆரோக்கியமான வழிகள்",
      category: "emotional-expression",
      thumbnail: "/placeholder.svg",
      emotion: "angry"
    },
    {
      id: "handling-changes",
      title: "திட்டங்கள் மாறும் போது",
      description: "வழக்கத்தில் எதிர்பாராத மாற்றங்களை சமாளித்தல்",
      category: "flexibility",
      thumbnail: "/placeholder.svg",
      emotion: "anxious"
    }
  ]
};

const TaleTherapy: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("stories");
  const [isPlaying, setIsPlaying] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handlePlayNarration = (storyId: string) => {
    setIsPlaying(prev => !prev);
    
    if (!isPlaying) {
      toast({
        title: language === "en" ? "Audio Playback Started" : "ஒலி பிளேபேக் தொடங்கியது",
        description: language === "en" 
          ? "The story narration has started. Click again to pause." 
          : "கதை விவரிப்பு தொடங்கியது. இடைநிறுத்த மீண்டும் கிளிக் செய்யவும்.",
      });
    } else {
      toast({
        title: language === "en" ? "Audio Playback Paused" : "ஒலி பிளேபேக் இடைநிறுத்தப்பட்டது",
        description: language === "en" 
          ? "The story narration has been paused." 
          : "கதை விவரிப்பு இடைநிறுத்தப்பட்டுள்ளது.",
      });
    }
  };

  const handleDownload = (storyId: string) => {
    toast({
      title: language === "en" ? "Downloading Story" : "கதையைப் பதிவிறக்குகிறது",
      description: language === "en" 
        ? "Story is being downloaded for offline access." 
        : "ஆஃப்லைன் அணுகலுக்காக கதை பதிவிறக்கப்படுகிறது.",
    });
    
    // In a real app, this would download the actual story
    setTimeout(() => {
      toast({
        title: language === "en" ? "Download Complete" : "பதிவிறக்கம் முடிந்தது",
        description: language === "en" 
          ? "Story is now available offline." 
          : "கதை இப்போது ஆஃப்லைனில் கிடைக்கிறது.",
        variant: "success"
      });
    }, 1500);
  };

  const handleStartInteractive = (storyId: string) => {
    toast({
      title: language === "en" ? "Starting Interactive Story" : "ஊடாடும் கதையைத் தொடங்குகிறது",
      description: language === "en" 
        ? "Loading your interactive story experience..." 
        : "உங்கள் ஊடாடும் கதை அனுபவத்தை ஏற்றுகிறது...",
    });
  };

  const handleContinue = (storyId: string) => {
    toast({
      title: language === "en" ? "Continuing Story" : "கதையைத் தொடர்கிறது",
      description: language === "en" 
        ? "Resuming from where you left off..." 
        : "நீங்கள் விட்ட இடத்திலிருந்து தொடர்கிறது...",
    });
  };

  const filteredTherapyStories = categoryFilter === "all" 
    ? therapyStories[language === "en" ? "en" : "ta"]
    : therapyStories[language === "en" ? "en" : "ta"].filter(story => story.category === categoryFilter);

  const filteredEmotionStories = categoryFilter === "all" 
    ? emotionStories[language === "en" ? "en" : "ta"]
    : emotionStories[language === "en" ? "en" : "ta"].filter(story => story.category === categoryFilter);

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case "easy":
        return language === "en" ? "Easy" : "எளிது";
      case "medium":
        return language === "en" ? "Medium" : "நடுத்தரம்";
      case "hard":
        return language === "en" ? "Hard" : "கடினம்";
      default:
        return "";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "easy":
        return "bg-green-50 text-green-600 border-green-200";
      case "medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "hard":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "";
    }
  };

  const getEmotionLabel = (emotion: string) => {
    switch(emotion) {
      case "overwhelmed":
        return language === "en" ? "Overwhelmed" : "அதிகப்படியான";
      case "shy":
        return language === "en" ? "Shy" : "வெட்கப்படுகிற";
      case "angry":
        return language === "en" ? "Angry" : "கோபமான";
      case "anxious":
        return language === "en" ? "Anxious" : "பதற்றமான";
      default:
        return "";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch(emotion) {
      case "overwhelmed":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "shy":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "angry":
        return "bg-red-50 text-red-600 border-red-200";
      case "anxious":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-agam-neutral-800 mb-2",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" ? "Tale Therapy" : "கதை சிகிச்சை"}
        </h1>
        <p className={cn(
          "text-agam-neutral-600",
          language === "ta" && "font-tamil"
        )}>
          {language === "en" 
            ? "Interactive therapy stories featuring Tamil culture for engaging social skills development" 
            : "ஈடுபாடான சமூக திறன் மேம்பாட்டிற்கு தமிழ் கலாச்சாரத்தை சித்தரிக்கும் தொடர்புடைய சிகிச்சை கதைகள்"}
        </p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button 
          variant={categoryFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("all")}
        >
          {language === "en" ? "All" : "அனைத்தும்"}
        </Button>
        <Button 
          variant={categoryFilter === "social-skills" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("social-skills")}
          className="gap-1"
        >
          <Users className="h-3.5 w-3.5" />
          {language === "en" ? "Social Skills" : "சமூக திறன்கள்"}
        </Button>
        <Button 
          variant={categoryFilter === "sensory" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("sensory")}
          className="gap-1"
        >
          <Volume2 className="h-3.5 w-3.5" />
          {language === "en" ? "Sensory" : "உணர்திறன்"}
        </Button>
        <Button 
          variant={categoryFilter === "emotional-expression" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("emotional-expression")}
          className="gap-1"
        >
          <Heart className="h-3.5 w-3.5" />
          {language === "en" ? "Emotional" : "உணர்ச்சி"}
        </Button>
        <Button 
          variant={categoryFilter === "problem-solving" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("problem-solving")}
          className="gap-1"
        >
          <Smile className="h-3.5 w-3.5" />
          {language === "en" ? "Problem Solving" : "பிரச்சினை தீர்த்தல்"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="stories" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Therapy Stories" : "சிகிச்சை கதைகள்"}
          </TabsTrigger>
          <TabsTrigger value="interactive" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Interactive Stories" : "ஊடாடும் கதைகள்"}
          </TabsTrigger>
          <TabsTrigger value="emotional" className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "Emotion-Based Stories" : "உணர்ச்சி-அடிப்படையிலான கதைகள்"}
          </TabsTrigger>
        </TabsList>
        
        {/* Therapy Stories Tab */}
        <TabsContent value="stories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTherapyStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={story.thumbnail} 
                    alt={story.title} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {story.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {story.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {story.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className={cn(language === "ta" && "font-tamil")}>
                          {language === "en" ? "Progress" : "முன்னேற்றம்"}
                        </span>
                        <span>{story.progress}%</span>
                      </div>
                      <Progress value={story.progress} />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {story.progress > 0 ? (
                    <Button onClick={() => handleContinue(story.id)} className="gap-2 flex-1">
                      <BookText className="h-4 w-4" />
                      <span className={cn(language === "ta" && "font-tamil")}>
                        {language === "en" ? "Continue" : "தொடரவும்"}
                      </span>
                    </Button>
                  ) : (
                    <Button onClick={() => handleContinue(story.id)} className="gap-2 flex-1">
                      <BookOpen className="h-4 w-4" />
                      <span className={cn(language === "ta" && "font-tamil")}>
                        {language === "en" ? "Read Story" : "கதையைப் படிக்கவும்"}
                      </span>
                    </Button>
                  )}
                  
                  {story.hasAudio && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handlePlayNarration(story.id)}
                    >
                      {isPlaying && story.id === "panchatantra-1" ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDownload(story.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Interactive Stories Tab */}
        <TabsContent value="interactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactiveStories[language === "en" ? "en" : "ta"].map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={story.thumbnail} 
                    alt={story.title} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={cn(
                      language === "ta" && "font-tamil",
                      getDifficultyColor(story.difficulty)
                    )}>
                      {getDifficultyLabel(story.difficulty)}
                    </Badge>
                  </div>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {story.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {story.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button onClick={() => handleStartInteractive(story.id)} className="gap-2 flex-1">
                    <Route className="h-4 w-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {language === "en" ? "Start Journey" : "பயணத்தைத் தொடங்கவும்"}
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDownload(story.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Emotion-Based Stories Tab */}
        <TabsContent value="emotional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmotionStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={story.thumbnail} 
                    alt={story.title} 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={cn(
                      language === "ta" && "font-tamil",
                      getEmotionColor(story.emotion)
                    )}>
                      {getEmotionLabel(story.emotion)}
                    </Badge>
                  </div>
                  <CardTitle className={cn(language === "ta" && "font-tamil")}>
                    {story.title}
                  </CardTitle>
                  <CardDescription className={cn(language === "ta" && "font-tamil")}>
                    {story.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button onClick={() => handleContinue(story.id)} className="gap-2 flex-1">
                    <BookOpen className="h-4 w-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {language === "en" ? "Read Story" : "கதையைப் படிக்கவும்"}
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handlePlayNarration(story.id)}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDownload(story.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
              {language === "en" ? "Download Story Modules" : "கதை தொகுதிகளை பதிவிறக்கவும்"}
            </h3>
            <p className={cn(
              "text-sm text-agam-neutral-600",
              language === "ta" && "font-tamil"
            )}>
              {language === "en" 
                ? "Access stories offline with both text and audio narration" 
                : "உரை மற்றும் ஒலி விவரிப்பு இரண்டுடனும் ஆஃப்லைனில் கதைகளை அணுகவும்"}
            </p>
          </div>
          
          <Button onClick={() => handleDownload("all")} className="gap-2 bg-agam-blue hover:bg-agam-blue/90">
            <Download className="h-4 w-4" />
            <span className={cn(language === "ta" && "font-tamil")}>
              {language === "en" ? "Download All Stories" : "அனைத்து கதைகளையும் பதிவிறக்கவும்"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaleTherapy;
