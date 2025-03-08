// This file contains utility functions for interacting with the Twilio SMS API

interface SMSMessage {
  to: string;
  body: string;
  language?: 'en' | 'ta';
}

// Twilio credentials - in a production environment,
// these should be stored securely in environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'YOUR_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'YOUR_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+1234567890'; // Replace with your Twilio phone number

// Language-specific response templates
const responseTemplates = {
  en: {
    help: "Thank you for reaching out to AGAM Crisis Support. We're here to help. A counselor will contact you shortly. For immediate support, reply with: \n1 - Sensory meltdown\n2 - Aggressive behavior\n3 - Anxiety\n4 - Non-responsive child\n5 - Communication help",
    sensory: "For sensory meltdowns: Find a quiet space, reduce sensory input, offer deep pressure, use minimal language, provide comfort items, and stay calm. A counselor will call you soon.",
    aggression: "For handling aggression: Ensure safety first, stay calm, give space, remove triggers if possible, wait for calm before discussing. A counselor will call you soon.",
    anxiety: "For anxiety: Deep breathing exercises (4-4-6 method), use familiar objects, give reassurance, maintain routine. A counselor will call you soon.",
    nonresponsive: "When your child is non-responsive: Ensure safety, reduce sensory input, give space and time, don't force interaction, offer comfort items. A counselor will call you soon.",
    communication: "For communication help: Use visual supports, try simple sign language, offer choices, use communication apps or create a simple needs board. A counselor will call you soon.",
    default: "Thank you for your message. A crisis counselor will contact you shortly. If this is an emergency, please call local emergency services."
  },
  ta: {
    help: "AGAM நெருக்கடி ஆதரவுக்கு அணுகியதற்கு நன்றி. நாங்கள் உதவ இங்கே இருக்கிறோம். ஒரு ஆலோசகர் விரைவில் உங்களைத் தொடர்பு கொள்வார். உடனடி ஆதரவுக்கு, பதிலளிக்கவும்: \n1 - உணர்வு உருகுதல்\n2 - ஆக்கிரமிப்பு நடத்தை\n3 - பதற்றம்\n4 - பதிலளிக்காத குழந்தை\n5 - தொடர்பு உதவி",
    sensory: "உணர்வு உருகல்களுக்கு: அமைதியான இடத்தைக் கண்டறியவும், உணர் உள்ளீட்டைக் குறைக்கவும், ஆழமான அழுத்தத்தை வழங்கவும், குறைந்தபட்ச மொழியைப் பயன்படுத்தவும், ஆறுதல் பொருட்களை வழங்கவும், அமைதியாக இருங்கள். ஒரு ஆலோசகர் விரைவில் உங்களை அழைப்பார்.",
    aggression: "ஆக்கிரமிப்பைக் கையாள்வதற்கு: முதலில் பாதுகாப்பை உறுதிப்படுத்தவும், அமைதியாக இருங்கள், இடம் கொடுங்கள், முடிந்தால் தூண்டுதல்களை அகற்றவும், விவாதிப்பதற்கு முன் அமைதிக்காக காத்திருங்கள். ஒரு ஆலோசகர் விரைவில் உங்களை அழைப்பார்.",
    anxiety: "பதற்றத்திற்கு: ஆழ்ந்த சுவாசப் பயிற்சிகள் (4-4-6 முறை), பழக்கமான பொருட்களைப் பயன்படுத்துங்கள், உறுதியளிக்கவும், வழக்கத்தை பராமரிக்கவும். ஒரு ஆலோசகர் விரைவில் உங்களை அழைப்பார்.",
    nonresponsive: "உங்கள் குழந்தை பதிலளிக்காதபோது: பாதுகாப்பை உறுதிப்படுத்தவும், உணர் உள்ளீட்டைக் குறைக்கவும், இடமும் நேரமும் கொடுங்கள், தொடர்பைக் கட்டாயப்படுத்த வேண்டாம், ஆறுதல் பொருட்களை வழங்கவும். ஒரு ஆலோசகர் விரைவில் உங்களை அழைப்பார்.",
    communication: "தொடர்பு உதவிக்கு: காட்சி ஆதரவைப் பயன்படுத்தவும், எளிய சைகை மொழியை முயற்சிக்கவும், தேர்வுகளை வழங்கவும், தொடர்பு பயன்பாடுகளைப் பயன்படுத்தவும் அல்லது எளிய தேவைகள் பலகையை உருவாக்கவும். ஒரு ஆலோசகர் விரைவில் உங்களை அழைப்பார்.",
    default: "உங்கள் செய்திக்கு நன்றி. ஒரு நெருக்கடி ஆலோசகர் விரைவில் உங்களைத் தொடர்பு கொள்வார். இது ஒரு அவசரநிலை எனில், உள்ளூர் அவசர சேவைகளை அழைக்கவும்."
  }
};

// Function to send SMS using Twilio
export const sendSMS = async (message: SMSMessage): Promise<boolean> => {
  console.log(`Sending SMS to ${message.to}: ${message.body}`);
  
  // Format Indian phone number if needed (add +91 if not present)
  let formattedNumber = message.to;
  if (!formattedNumber.startsWith('+')) {
    // If the number doesn't start with +, add India country code
    if (formattedNumber.startsWith('91')) {
      formattedNumber = '+' + formattedNumber;
    } else {
      formattedNumber = '+91' + formattedNumber;
    }
  }
  
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)
      },
      body: new URLSearchParams({
        To: formattedNumber,
        From: TWILIO_PHONE_NUMBER,
        Body: message.body
      })
    });
    
    const data = await response.json();
    console.log('Twilio API response:', data);
    
    if (data.error_code) {
      console.error('Twilio error:', data.error_message);
      return false;
    }
    
    return data.status === 'queued' || data.status === 'sent';
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

// Process incoming SMS messages and provide appropriate responses
export const processIncomingSMS = (body: string, from: string, language: 'en' | 'ta' = 'en'): string => {
  const templates = responseTemplates[language];
  const lowerBody = body.toLowerCase().trim();
  
  // Check for keywords in the message
  if (lowerBody.includes('help') || lowerBody.includes('உதவி') || lowerBody === '0') {
    return templates.help;
  } else if (lowerBody.includes('sensory') || lowerBody.includes('உணர்வு') || lowerBody === '1') {
    return templates.sensory;
  } else if (lowerBody.includes('aggress') || lowerBody.includes('ஆக்கிரமிப்பு') || lowerBody === '2') {
    return templates.aggression;
  } else if (lowerBody.includes('anx') || lowerBody.includes('பதற்றம்') || lowerBody === '3') {
    return templates.anxiety;
  } else if (lowerBody.includes('non-resp') || lowerBody.includes('பதிலளிக்காத') || lowerBody === '4') {
    return templates.nonresponsive;
  } else if (lowerBody.includes('commun') || lowerBody.includes('தொடர்பு') || lowerBody === '5') {
    return templates.communication;
  }
  
  // Default response if no keywords match
  return templates.default;
};

// Mock database of crisis counselors
const crisisCounselors = [
  { id: 1, name: "Dr. Anitha", languages: ["en", "ta"], specialty: "sensory processing" },
  { id: 2, name: "Mr. Rajan", languages: ["ta"], specialty: "aggression management" },
  { id: 3, name: "Ms. Sarah", languages: ["en"], specialty: "anxiety" },
  { id: 4, name: "Dr. Kumar", languages: ["en", "ta"], specialty: "communication" }
];

// Function to find available counselors based on message content and language
export const findAvailableCounselor = (messageContent: string, language: 'en' | 'ta'): typeof crisisCounselors[0] | null => {
  const lowerContent = messageContent.toLowerCase();
  
  // Match counselors based on message content and language preference
  const matchingCounselors = crisisCounselors.filter(counselor => {
    const languageMatch = counselor.languages.includes(language);
    let specialtyMatch = false;
    
    if (lowerContent.includes('sensory') || lowerContent.includes('meltdown') || lowerContent.includes('உணர்வு')) {
      specialtyMatch = counselor.specialty === 'sensory processing';
    } else if (lowerContent.includes('aggress') || lowerContent.includes('ஆக்கிரமிப்பு')) {
      specialtyMatch = counselor.specialty === 'aggression management';
    } else if (lowerContent.includes('anx') || lowerContent.includes('பதற்றம்')) {
      specialtyMatch = counselor.specialty === 'anxiety';
    } else if (lowerContent.includes('commun') || lowerContent.includes('தொடர்பு')) {
      specialtyMatch = counselor.specialty === 'communication';
    }
    
    return languageMatch && specialtyMatch;
  });
  
  // Return the first matching counselor or null if none found
  return matchingCounselors.length > 0 ? matchingCounselors[0] : null;
};

// Validate Indian phone numbers
export const validateIndianPhoneNumber = (number: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = number.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number (10 digits, or 11-12 with country code)
  if (digitsOnly.length === 10) {
    // 10-digit number starting with 6, 7, 8, or 9
    return /^[6-9]\d{9}$/.test(digitsOnly);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    // 11-digit number starting with 0 followed by 6, 7, 8, or 9
    return /^0[6-9]\d{9}$/.test(digitsOnly);
  } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    // 12-digit number with 91 country code
    return /^91[6-9]\d{9}$/.test(digitsOnly);
  }
  
  return false;
};
