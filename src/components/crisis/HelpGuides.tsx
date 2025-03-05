
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Heart, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  Bookmark, 
  Download
} from "lucide-react";
import { cn } from "../../lib/utils";

// Help guides content
const helpGuides = {
  en: {
    calming: [
      {
        id: "deep-breathing",
        title: "Deep Breathing Techniques",
        content: `
          <h3>5-4-3-2-1 Breathing Exercise</h3>
          <p>This simple technique can help during moments of overwhelm:</p>
          <ol>
            <li>Sit comfortably and take a slow, deep breath.</li>
            <li>Inhale for 5 counts.</li>
            <li>Hold for 4 counts.</li>
            <li>Exhale for 3 counts.</li>
            <li>Pause for 2 counts.</li>
            <li>Repeat the cycle for 1 minute or more.</li>
          </ol>
          <h3>Progressive Muscle Relaxation</h3>
          <p>Starting from your toes and working upward:</p>
          <ol>
            <li>Tense the muscle group for 5 seconds</li>
            <li>Release and feel the tension flow away</li>
            <li>Rest for 10 seconds before moving to the next muscle group</li>
          </ol>
        `
      },
      {
        id: "sensory-regulation",
        title: "Sensory Regulation Techniques",
        content: `
          <h3>Creating a Sensory Calm-Down Space</h3>
          <p>Set up a dedicated space with:</p>
          <ul>
            <li>Soft, comfortable seating or cushions</li>
            <li>Gentle, dimmable lighting</li>
            <li>Noise-cancelling headphones</li>
            <li>Weighted blanket or lap pad</li>
            <li>Fidget toys and sensory tools</li>
            <li>Visual schedule for calming routine</li>
          </ul>
          <h3>Sensory Diet Activities</h3>
          <p>Regular sensory activities can help maintain regulation:</p>
          <ul>
            <li>Deep pressure: weighted blankets, tight hugs (if comfortable)</li>
            <li>Proprioceptive input: pushing against walls, jumping, heavy work</li>
            <li>Vestibular activities: swinging, rocking chair</li>
          </ul>
        `
      },
      {
        id: "visual-supports",
        title: "Visual Supports for Emotional Regulation",
        content: `
          <h3>Creating a Calm-Down Visual Sequence</h3>
          <p>Use simple picture cards showing the steps to calm down:</p>
          <ol>
            <li>Recognize feeling (use emotion chart)</li>
            <li>Find quiet space</li>
            <li>Deep breathing (use visual breathing prompt)</li>
            <li>Use a sensory tool</li>
            <li>Ask for help if needed</li>
          </ol>
          <h3>Emotion Thermometer</h3>
          <p>Create a visual scale from 1-5 showing:</p>
          <ol>
            <li>1 = Calm and happy</li>
            <li>2 = Starting to feel uncomfortable</li>
            <li>3 = Getting stressed</li>
            <li>4 = Very upset, close to meltdown</li>
            <li>5 = Meltdown/crisis</li>
          </ol>
          <p>For each level, provide suggested coping strategies.</p>
        `
      }
    ],
    emergency: [
      {
        id: "meltdown-response",
        title: "Responding to Meltdowns",
        content: `
          <h3>During a Meltdown:</h3>
          <ul>
            <li>Ensure physical safety first</li>
            <li>Reduce sensory input (dim lights, reduce noise)</li>
            <li>Give space but remain present</li>
            <li>Use minimal, clear language</li>
            <li>Avoid making demands</li>
            <li>Wait for the meltdown to pass before discussing</li>
          </ul>
          <h3>After a Meltdown:</h3>
          <ul>
            <li>Allow time for recovery</li>
            <li>Offer hydration and comfort</li>
            <li>Use visual supports to process what happened</li>
            <li>Return to routine gradually</li>
          </ul>
        `
      },
      {
        id: "safety-planning",
        title: "Creating a Safety Plan",
        content: `
          <h3>Essential Elements of a Safety Plan:</h3>
          <ol>
            <li>List of warning signs/triggers</li>
            <li>Preventive strategies for each trigger</li>
            <li>Calming techniques that work</li>
            <li>Safe spaces at home, school, and community</li>
            <li>Contact information for supporters</li>
            <li>When to seek professional help</li>
          </ol>
          <h3>Emergency Contact Information:</h3>
          <p>Keep a printed list with:</p>
          <ul>
            <li>Family members/caregivers</li>
            <li>Trusted neighbors</li>
            <li>Medical professionals</li>
            <li>Local emergency services</li>
            <li>Autism support helpline</li>
          </ul>
        `
      }
    ],
    parenting: [
      {
        id: "self-care",
        title: "Caregiver Self-Care Strategies",
        content: `
          <h3>Daily Self-Care Practices:</h3>
          <ul>
            <li>Schedule short breaks throughout the day</li>
            <li>Practice deep breathing for 5 minutes</li>
            <li>Stay hydrated and maintain regular meals</li>
            <li>Connect with a supportive friend or family member</li>
            <li>Write in a gratitude journal</li>
          </ul>
          <h3>Longer-Term Self-Care:</h3>
          <ul>
            <li>Join a parent support group</li>
            <li>Consider respite care options</li>
            <li>Seek therapy or counseling if needed</li>
            <li>Develop a hobby unrelated to caregiving</li>
            <li>Set boundaries and ask for help</li>
          </ul>
        `
      },
      {
        id: "positive-reinforcement",
        title: "Positive Reinforcement Techniques",
        content: `
          <h3>Effective Praise:</h3>
          <ul>
            <li>Be specific about what was done well</li>
            <li>Praise effort and process, not just results</li>
            <li>Use genuine enthusiasm</li>
            <li>Praise immediately after the behavior</li>
            <li>Match praise style to your child's preference</li>
          </ul>
          <h3>Reward Systems:</h3>
          <ul>
            <li>Visual token boards</li>
            <li>First-Then boards</li>
            <li>Special interest-based rewards</li>
            <li>Choice boards for selecting rewards</li>
            <li>Immediate small rewards vs. delayed larger rewards</li>
          </ul>
        `
      },
      {
        id: "communication-strategies",
        title: "Effective Communication Strategies",
        content: `
          <h3>Speaking Clearly:</h3>
          <ul>
            <li>Use simple, concrete language</li>
            <li>Give one instruction at a time</li>
            <li>Allow extra processing time</li>
            <li>Supplement verbal with visual supports</li>
            <li>Check for understanding</li>
          </ul>
          <h3>Supporting Language Development:</h3>
          <ul>
            <li>Model appropriate language</li>
            <li>Expand on what your child says</li>
            <li>Use special interests as conversation starters</li>
            <li>Create opportunities for communication</li>
            <li>Respect all forms of communication (verbal, AAC, gestures)</li>
          </ul>
        `
      }
    ]
  },
  ta: {
    calming: [
      {
        id: "deep-breathing",
        title: "ஆழ்ந்த சுவாசப் பயிற்சிகள்",
        content: `
          <h3>5-4-3-2-1 சுவாசப் பயிற்சி</h3>
          <p>இந்த எளிய நுட்பம் மிகைப்படுத்தப்பட்ட தருணங்களில் உதவும்:</p>
          <ol>
            <li>வசதியாக அமர்ந்து மெதுவாக, ஆழமாக சுவாசிக்கவும்.</li>
            <li>5 எண்ணிக்கைக்கு உள்ளிழுங்கள்.</li>
            <li>4 எண்ணிக்கைக்கு வைத்திருங்கள்.</li>
            <li>3 எண்ணிக்கைக்கு வெளியேற்றவும்.</li>
            <li>2 எண்ணிக்கைக்கு இடைநிறுத்தம் செய்யவும்.</li>
            <li>1 நிமிடம் அல்லது அதற்கு மேற்பட்ட நேரத்திற்கு சுழற்சியை மீண்டும் செய்யவும்.</li>
          </ol>
          <h3>முற்போக்கு தசை தளர்வு</h3>
          <p>உங்கள் கால் விரல்களில் இருந்து மேல்நோக்கி வேலை செய்வது:</p>
          <ol>
            <li>தசை குழுவை 5 வினாடிகளுக்கு இறுக்கவும்</li>
            <li>விடுவித்து இறுக்கம் வெளியேறுவதை உணருங்கள்</li>
            <li>அடுத்த தசை குழுவுக்கு நகர்வதற்கு முன் 10 வினாடிகள் ஓய்வெடுக்கவும்</li>
          </ol>
        `
      },
      {
        id: "sensory-regulation",
        title: "உணர்திறன் ஒழுங்குமுறை நுட்பங்கள்",
        content: `
          <h3>உணர் அமைதி-கீழ் இடத்தை உருவாக்குதல்</h3>
          <p>அர்ப்பணிப்பு இடத்தை அமைக்கவும்:</p>
          <ul>
            <li>மென்மையான, வசதியான இருக்கை அல்லது தலையணைகள்</li>
            <li>மெதுவான, மங்கலான ஒளி</li>
            <li>சத்தம்-ரத்து செய்யும் ஹெட்போன்கள்</li>
            <li>எடை போர்வை அல்லது மடி பேட்</li>
            <li>ஃபிட்ஜெட் பொம்மைகள் மற்றும் உணர் கருவிகள்</li>
            <li>அமைதியான வழக்கத்திற்கான காட்சி அட்டவணை</li>
          </ul>
          <h3>உணர் உணவு செயல்பாடுகள்</h3>
          <p>வழக்கமான உணர் செயல்பாடுகள் ஒழுங்குமுறையை பராமரிக்க உதவும்:</p>
          <ul>
            <li>ஆழமான அழுத்தம்: எடையுள்ள போர்வைகள், இறுக்கமான கட்டிப்பிடிப்புகள் (வசதியாக இருந்தால்)</li>
            <li>உரிமையுடைய உள்ளீடு: சுவர்களுக்கு எதிராக தள்ளுதல், குதித்தல், கனரக வேலை</li>
            <li>வெஸ்டிபுலர் செயல்பாடுகள்: ஊஞ்சல், ஆட்டுநாற்காலி</li>
          </ul>
        `
      },
      {
        id: "visual-supports",
        title: "உணர்ச்சி ஒழுங்குமுறைக்கான காட்சி ஆதரவு",
        content: `
          <h3>அமைதி-கீழ் காட்சி வரிசையை உருவாக்குதல்</h3>
          <p>அமைதிப்படுத்துவதற்கான படிகளைக் காட்டும் எளிய படம் அட்டைகளைப் பயன்படுத்தவும்:</p>
          <ol>
            <li>உணர்வை அங்கீகரிக்கவும் (உணர்ச்சி விளக்கப்படத்தைப் பயன்படுத்தவும்)</li>
            <li>அமைதியான இடத்தைக் கண்டறியவும்</li>
            <li>ஆழ்ந்த சுவாசம் (காட்சி சுவாசத்தைப் பயன்படுத்தவும்)</li>
            <li>ஒரு உணர் கருவியைப் பயன்படுத்தவும்</li>
            <li>தேவைப்பட்டால் உதவி கேட்கவும்</li>
          </ol>
          <h3>உணர்ச்சி வெப்பமானி</h3>
          <p>1-5 வரை ஒரு காட்சி அளவீட்டை உருவாக்கவும்:</p>
          <ol>
            <li>1 = அமைதியாகவும் மகிழ்ச்சியாகவும் இருங்கள்</li>
            <li>2 = அசௌகரியமாக உணரத் தொடங்குகிறது</li>
            <li>3 = மன அழுத்தம் ஏற்படுகிறது</li>
            <li>4 = மிகவும் கலக்கமாக, உருகுதலுக்கு அருகில்</li>
            <li>5 = உருகுதல்/நெருக்கடி</li>
          </ol>
          <p>ஒவ்வொரு நிலைக்கும், பரிந்துரைக்கப்பட்ட சமாளிக்கும் உத்திகளை வழங்கவும்.</p>
        `
      }
    ],
    emergency: [
      {
        id: "meltdown-response",
        title: "உருகுதல்களுக்கு பதிலளித்தல்",
        content: `
          <h3>உருகுதலின் போது:</h3>
          <ul>
            <li>முதலில் உடல் பாதுகாப்பை உறுதி செய்யுங்கள்</li>
            <li>உணர் உள்ளீட்டைக் குறைக்கவும் (மங்கலான விளக்குகள், சத்தத்தைக் குறைக்கவும்)</li>
            <li>இடம் கொடுங்கள் ஆனால் முன்னிலையில் இருங்கள்</li>
            <li>குறைந்தபட்ச, தெளிவான மொழியைப் பயன்படுத்தவும்</li>
            <li>கோரிக்கைகளை வைப்பதைத் தவிர்க்கவும்</li>
            <li>விவாதிப்பதற்கு முன் உருகுதல் கடந்து செல்ல காத்திருங்கள்</li>
          </ul>
          <h3>உருகுதலுக்குப் பிறகு:</h3>
          <ul>
            <li>மீட்பு நேரத்தை அனுமதிக்கவும்</li>
            <li>நீரேற்றம் மற்றும் ஆறுதல் வழங்குங்கள்</li>
            <li>என்ன நடந்தது என்பதை செயலாக்க காட்சி ஆதரவைப் பயன்படுத்தவும்</li>
            <li>வழக்கத்திற்கு படிப்படியாக திரும்பவும்</li>
          </ul>
        `
      },
      {
        id: "safety-planning",
        title: "பாதுகாப்புத் திட்டத்தை உருவாக்குதல்",
        content: `
          <h3>பாதுகாப்புத் திட்டத்தின் அத்தியாவசிய கூறுகள்:</h3>
          <ol>
            <li>எச்சரிக்கை அறிகுறிகள்/தூண்டுதல்களின் பட்டியல்</li>
            <li>ஒவ்வொரு தூண்டுதலுக்கும் தடுப்பு உத்திகள்</li>
            <li>வேலை செய்யும் அமைதிப்படுத்தும் நுட்பங்கள்</li>
            <li>வீடு, பள்ளி மற்றும் சமூகத்தில் பாதுகாப்பான இடங்கள்</li>
            <li>ஆதரவாளர்களுக்கான தொடர்பு தகவல்</li>
            <li>தொழில்முறை உதவியை எப்போது நாடுவது</li>
          </ol>
          <h3>அவசரகால தொடர்பு தகவல்:</h3>
          <p>அச்சிடப்பட்ட பட்டியலை வைத்திருங்கள்:</p>
          <ul>
            <li>குடும்ப உறுப்பினர்கள்/பராமரிப்பாளர்கள்</li>
            <li>நம்பகமான அண்டை வீட்டார்</li>
            <li>மருத்துவ நிபுணர்கள்</li>
            <li>உள்ளூர் அவசர சேவைகள்</li>
            <li>ஆட்டிசம் ஆதரவு உதவி எண்</li>
          </ul>
        `
      }
    ],
    parenting: [
      {
        id: "self-care",
        title: "பராமரிப்பாளர் சுய பராமரிப்பு உத்திகள்",
        content: `
          <h3>தினசரி சுய பராமரிப்பு நடைமுறைகள்:</h3>
          <ul>
            <li>நாள் முழுவதும் குறுகிய இடைவேளைகளை திட்டமிடுங்கள்</li>
            <li>5 நிமிடங்கள் ஆழ்ந்த சுவாசத்தை பயிற்சி செய்யுங்கள்</li>
            <li>நீரேற்றத்துடன் இருங்கள் மற்றும் வழக்கமான உணவுகளை பராமரிக்கவும்</li>
            <li>ஆதரவான நண்பர் அல்லது குடும்ப உறுப்பினருடன் இணைக்கவும்</li>
            <li>நன்றி நாட்குறிப்பில் எழுதுங்கள்</li>
          </ul>
          <h3>நீண்ட கால சுய பராமரிப்பு:</h3>
          <ul>
            <li>பெற்றோர் ஆதரவு குழுவில் சேரவும்</li>
            <li>ஓய்வு பராமரிப்பு விருப்பங்களைக் கருத்தில் கொள்ளுங்கள்</li>
            <li>தேவைப்பட்டால் சிகிச்சை அல்லது ஆலோசனையை நாடுங்கள்</li>
            <li>பராமரிப்புடன் தொடர்பில்லாத ஒரு பொழுதுபோக்கை உருவாக்குங்கள்</li>
            <li>எல்லைகளை அமைத்து உதவியைக் கேளுங்கள்</li>
          </ul>
        `
      },
      {
        id: "positive-reinforcement",
        title: "நேர்மறை வலுப்படுத்தல் நுட்பங்கள்",
        content: `
          <h3>பயனுள்ள பாராட்டு:</h3>
          <ul>
            <li>எது நன்றாக செய்யப்பட்டது என்பது குறித்து குறிப்பிட்டதாக இருங்கள்</li>
            <li>முடிவுகளை மட்டுமல்ல, முயற்சி மற்றும் செயல்முறையைப் பாராட்டுங்கள்</li>
            <li>உண்மையான ஆர்வத்தைப் பயன்படுத்துங்கள்</li>
            <li>நடத்தைக்குப் பிறகு உடனடியாக பாராட்டுங்கள்</li>
            <li>உங்கள் குழந்தையின் விருப்பத்திற்கு ஏற்ப பாராட்டு பாணியை பொருத்துங்கள்</li>
          </ul>
          <h3>வெகுமதி அமைப்புகள்:</h3>
          <ul>
            <li>காட்சி டோக்கன் பலகைகள்</li>
            <li>முதல்-பின் பலகைகள்</li>
            <li>சிறப்பு ஆர்வம் சார்ந்த வெகுமதிகள்</li>
            <li>வெகுமதிகளைத் தேர்ந்தெடுப்பதற்கான தேர்வு பலகைகள்</li>
            <li>உடனடி சிறிய வெகுமதிகள் vs தாமதமான பெரிய வெகுமதிகள்</li>
          </ul>
        `
      },
      {
        id: "communication-strategies",
        title: "பயனுள்ள தகவல்தொடர்பு உத்திகள்",
        content: `
          <h3>தெளிவாக பேசுவது:</h3>
          <ul>
            <li>எளிய, கான்கிரீட் மொழியைப் பயன்படுத்தவும்</li>
            <li>ஒரு நேரத்தில் ஒரு வழிமுறையை கொடுங்கள்</li>
            <li>கூடுதல் செயலாக்க நேரத்தை அனுமதிக்கவும்</li>
            <li>காட்சி ஆதரவுடன் வாய்மொழி ஆதரவை துணைபுரியவும்</li>
            <li>புரிதலை சரிபார்க்கவும்</li>
          </ul>
          <h3>மொழி வளர்ச்சிக்கு ஆதரவளித்தல்:</h3>
          <ul>
            <li>பொருத்தமான மொழியை மாடலிங் செய்யுங்கள்</li>
            <li>உங்கள் குழந்தை சொல்வதை விரிவுபடுத்துங்கள்</li>
            <li>உரையாடல் தொடக்கிகளாக சிறப்பு ஆர்வங்களைப் பயன்படுத்தவும்</li>
            <li>தகவல்தொடர்புக்கான வாய்ப்புகளை உருவாக்குங்கள்</li>
            <li>அனைத்து வகையான தகவல்தொடர்புகளையும் மதிக்கவும் (வாய்மொழி, AAC, சைகைகள்)</li>
          </ul>
        `
      }
    ]
  }
};

const GuideCard: React.FC<{
  title: string;
  content: string;
  id: string;
}> = ({ title, content, id }) => {
  const { language } = useLanguage();
  
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className={cn(
        "text-lg font-semibold hover:text-agam-blue",
        language === "ta" && "font-tamil"
      )}>
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div 
          className={cn(
            "prose prose-agam max-w-none",
            language === "ta" && "font-tamil"
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-agam-blue"
          >
            <Download className="h-4 w-4" />
            <span className={cn(language === "ta" && "font-tamil")}>
              {language === "en" ? "Download PDF" : "PDF பதிவிறக்கம்"}
            </span>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const HelpGuides: React.FC = () => {
  const { language } = useLanguage();
  
  const guides = helpGuides[language as keyof typeof helpGuides];
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border bg-card">
          <CardHeader className="flex flex-row items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <CardTitle className={cn(
                "text-xl",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Calming Strategies" : "அமைதிப்படுத்தும் உத்திகள்"}
              </CardTitle>
              <CardDescription className={cn(language === "ta" && "font-tamil")}>
                {language === "en" 
                  ? "Techniques to help during overwhelming moments" 
                  : "மிகைப்படுத்தப்பட்ட தருணங்களில் உதவும் நுட்பங்கள்"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {guides.calming.map((guide) => (
                <GuideCard
                  key={guide.id}
                  id={guide.id}
                  title={guide.title}
                  content={guide.content}
                />
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <Card className="border bg-card">
          <CardHeader className="flex flex-row items-center gap-3">
            <AlertCircle className="h-8 w-8 text-amber-500" />
            <div>
              <CardTitle className={cn(
                "text-xl",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Emergency Handling" : "அவசர கையாளுதல்"}
              </CardTitle>
              <CardDescription className={cn(language === "ta" && "font-tamil")}>
                {language === "en" 
                  ? "How to respond during crisis situations" 
                  : "நெருக்கடி சூழ்நிலைகளின் போது எவ்வாறு பதிலளிப்பது"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {guides.emergency.map((guide) => (
                <GuideCard
                  key={guide.id}
                  id={guide.id}
                  title={guide.title}
                  content={guide.content}
                />
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <Card className="border bg-card">
          <CardHeader className="flex flex-row items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-agam-purple" />
            <div>
              <CardTitle className={cn(
                "text-xl",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Parenting Tips" : "பெற்றோர் குறிப்புகள்"}
              </CardTitle>
              <CardDescription className={cn(language === "ta" && "font-tamil")}>
                {language === "en" 
                  ? "Strategies for supporting autistic children" 
                  : "ஆட்டிசம் குழந்தைகளை ஆதரிப்பதற்கான உத்திகள்"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {guides.parenting.map((guide) => (
                <GuideCard
                  key={guide.id}
                  id={guide.id}
                  title={guide.title}
                  content={guide.content}
                />
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border bg-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="h-6 w-6 text-agam-blue" />
            <div>
              <h3 className={cn(
                "text-lg font-semibold",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" ? "Save for Offline Use" : "ஆஃப்லைன் பயன்பாட்டிற்காக சேமிக்கவும்"}
              </h3>
              <p className={cn(
                "text-sm text-agam-neutral-600",
                language === "ta" && "font-tamil"
              )}>
                {language === "en" 
                  ? "Download all guides for access without internet" 
                  : "இணையம் இல்லாமல் அணுகல் அனைத்து வழிகாட்டிகளையும் பதிவிறக்கவும்"}
              </p>
            </div>
          </div>
          <Button className="bg-agam-blue hover:bg-agam-blue-dark flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className={cn(language === "ta" && "font-tamil")}>
              {language === "en" ? "Download All Guides" : "அனைத்து வழிகாட்டிகளையும் பதிவிறக்கவும்"}
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HelpGuides;
