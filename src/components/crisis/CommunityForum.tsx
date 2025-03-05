
import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Flag, PlusCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "../../lib/utils";
import { useToast } from "@/hooks/use-toast";

// Sample forum posts
const forumPosts = {
  en: [
    {
      id: 1,
      author: "ParentSupport123",
      avatar: "PS",
      title: "Strategies for sensory sensitivity in public places",
      content: "My 7-year-old son gets overwhelmed in shopping malls and other busy places. We've tried noise-cancelling headphones but he still struggles. Any other strategies that have worked for your children?",
      time: "2 hours ago",
      likes: 8,
      comments: 4,
      tags: ["Sensory", "Public spaces"]
    },
    {
      id: 2,
      author: "AutismJourney",
      avatar: "AJ",
      title: "Success with visual schedules",
      content: "I wanted to share a win! After implementing a visual schedule for our morning routine, my daughter's anxiety has reduced significantly. We use removable picture cards that she can take off once each task is complete.",
      time: "Yesterday",
      likes: 15,
      comments: 6,
      tags: ["Visual supports", "Success story"]
    },
    {
      id: 3,
      author: "CaregiverandTeacher",
      avatar: "CT",
      title: "Managing meltdowns at school",
      content: "I'm both a parent and a special education teacher. Recently dealt with a challenging meltdown situation at school. I found that creating a quiet corner with familiar objects helped tremendously. Happy to share more specific techniques.",
      time: "3 days ago",
      likes: 24,
      comments: 12,
      tags: ["School", "Meltdowns", "Teaching strategies"]
    }
  ],
  ta: [
    {
      id: 1,
      author: "பெற்றோர்ஆதரவு123",
      avatar: "பஆ",
      title: "பொது இடங்களில் உணர்திறன் உணர்திறனுக்கான உத்திகள்",
      content: "என் 7 வயது மகன் ஷாப்பிங் மால்களிலும் பிற பரபரப்பான இடங்களிலும் மிகைப்படுத்தப்படுகிறார். நாங்கள் சத்தம்-ரத்து செய்யும் ஹெட்போன்களை முயற்சித்தோம், ஆனால் அவர் இன்னும் போராடுகிறார். உங்கள் குழந்தைகளுக்காக வேறு ஏதேனும் உத்திகள் வேலை செய்ததா?",
      time: "2 மணிநேரத்திற்கு முன்பு",
      likes: 8,
      comments: 4,
      tags: ["உணர்திறன்", "பொது இடங்கள்"]
    },
    {
      id: 2,
      author: "ஆட்டிசம்பயணம்",
      avatar: "ஆப",
      title: "காட்சி அட்டவணைகளுடன் வெற்றி",
      content: "ஒரு வெற்றியைப் பகிர்ந்து கொள்ள விரும்பினேன்! எங்கள் காலை வழக்கத்திற்கான காட்சி அட்டவணையை செயல்படுத்திய பிறகு, என் மகளின் பதற்றம் குறிப்பிடத்தக்க அளவு குறைந்துள்ளது. ஒவ்வொரு பணியும் முடிந்ததும் அவள் அகற்றக்கூடிய அகற்றக்கூடிய படம் அட்டைகளைப் பயன்படுத்துகிறோம்.",
      time: "நேற்று",
      likes: 15,
      comments: 6,
      tags: ["காட்சி ஆதரவு", "வெற்றிக் கதை"]
    },
    {
      id: 3,
      author: "பராமரிப்பாளர்மற்றும்ஆசிரியர்",
      avatar: "பஆ",
      title: "பள்ளியில் உருகுதல்களை நிர்வகித்தல்",
      content: "நான் ஒரு பெற்றோர் மற்றும் ஒரு சிறப்பு கல்வி ஆசிரியர். சமீபத்தில் பள்ளியில் ஒரு சவாலான உருகுதல் சூழ்நிலையை சமாளித்தேன். பரிச்சயமான பொருட்களுடன் ஒரு அமைதியான மூலையை உருவாக்குவது மிகவும் உதவியது என்று கண்டேன். மேலும் குறிப்பிட்ட நுட்பங்களைப் பகிர்ந்து கொள்ள மகிழ்ச்சி.",
      time: "3 நாட்களுக்கு முன்பு",
      likes: 24,
      comments: 12,
      tags: ["பள்ளி", "உருகுதல்", "கற்பித்தல் உத்திகள்"]
    }
  ]
};

const CommunityForum: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = () => {
    if (!postTitle || !postContent) {
      toast({
        title: language === "en" ? "Missing information" : "தகவல் இல்லை",
        description: language === "en" 
          ? "Please provide both a title and content for your post" 
          : "உங்கள் இடுகைக்கு தலைப்பு மற்றும் உள்ளடக்கம் இரண்டையும் வழங்கவும்",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: language === "en" ? "Post submitted" : "இடுகை சமர்ப்பிக்கப்பட்டது",
      description: language === "en" 
        ? "Your post has been submitted for moderation" 
        : "உங்கள் இடுகை மதிப்பாய்வுக்காக சமர்ப்பிக்கப்பட்டுள்ளது",
      variant: "default"
    });

    // Reset form
    setPostTitle("");
    setPostContent("");
    setShowNewPostForm(false);
  };

  const handleLikePost = (postId: number) => {
    toast({
      title: language === "en" ? "Post liked" : "இடுகை விரும்பப்பட்டது",
      description: language === "en" ? "You've liked this post" : "நீங்கள் இந்த இடுகையை விரும்பியுள்ளீர்கள்",
      variant: "default"
    });
  };

  const filtered = forumPosts[language as keyof typeof forumPosts].filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Input
            placeholder={language === "en" ? "Search discussions..." : "விவாதங்களைத் தேடுங்கள்..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(language === "ta" && "font-tamil")}
          />
        </div>
        <Button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-agam-blue hover:bg-agam-blue-dark flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span className={cn(language === "ta" && "font-tamil")}>
            {language === "en" ? "New Discussion" : "புதிய விவாதம்"}
          </span>
        </Button>
      </div>

      {showNewPostForm && (
        <Card className="border bg-card">
          <CardHeader>
            <CardTitle className={cn(language === "ta" && "font-tamil")}>
              {language === "en" ? "Create New Discussion" : "புதிய விவாதத்தை உருவாக்கவும்"}
            </CardTitle>
            <CardDescription className={cn(language === "ta" && "font-tamil")}>
              {language === "en" 
                ? "Share your experiences or ask for advice from the community" 
                : "உங்கள் அனுபவங்களைப் பகிர்ந்து கொள்ளுங்கள் அல்லது சமூகத்திடம் ஆலோசனை கேளுங்கள்"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className={cn(
                "text-sm font-medium",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Title" : "தலைப்பு"}
              </label>
              <Input
                id="title"
                placeholder={language === "en" ? "Discussion title" : "விவாத தலைப்பு"}
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className={cn(language === "ta" && "font-tamil")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className={cn(
                "text-sm font-medium",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Content" : "உள்ளடக்கம்"}
              </label>
              <Textarea
                id="content"
                placeholder={language === "en" 
                  ? "Share your experience or question..." 
                  : "உங்கள் அனுபவம் அல்லது கேள்வியைப் பகிர்ந்து கொள்ளுங்கள்..."}
                rows={5}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className={cn(language === "ta" && "font-tamil")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowNewPostForm(false)}
              className={cn(language === "ta" && "font-tamil")}
            >
              {language === "en" ? "Cancel" : "ரத்து செய்"}
            </Button>
            <Button 
              onClick={handleCreatePost}
              className="bg-agam-blue hover:bg-agam-blue-dark"
            >
              <span className={cn(language === "ta" && "font-tamil")}>
                {language === "en" ? "Submit" : "சமர்ப்பி"}
              </span>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <Card key={post.id} className="border bg-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className={cn(
                        "font-semibold text-lg",
                        language === "ta" && "font-tamil"
                      )}>
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-agam-neutral-600">
                        <span className={cn(language === "ta" && "font-tamil")}>
                          {post.author}
                        </span>
                        <span className="mx-1">•</span>
                        <span className={cn(language === "ta" && "font-tamil")}>
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={cn(
                  "text-agam-neutral-700 mb-4",
                  language === "ta" && "font-tamil"
                )}>
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className={cn(
                      "bg-agam-blue/10 text-agam-blue border-agam-blue/30",
                      language === "ta" && "font-tamil"
                    )}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-4 text-sm text-agam-neutral-600">
                  <button 
                    className="flex items-center gap-1 hover:text-agam-blue"
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className="h-4 w-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {post.likes}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-agam-blue">
                    <MessageCircle className="h-4 w-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {post.comments}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-agam-blue ml-auto">
                    <Flag className="h-4 w-4" />
                    <span className={cn(language === "ta" && "font-tamil")}>
                      {language === "en" ? "Report" : "புகார்"}
                    </span>
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="border bg-card p-8 text-center">
            <CardContent>
              <p className={cn(
                "text-agam-neutral-600",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" 
                  ? "No discussions found. Start a new one!" 
                  : "விவாதங்கள் எதுவும் கிடைக்கவில்லை. ஒரு புதியதைத் தொடங்குங்கள்!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;
