export interface ConversationDto {
  id: number;
  createdAt: Date;
  messages: Message[];
  languageData: LanguageData | null;
  settings: Settings | null;
};

export interface Message {
  id?: number;
  content: string;
  role: string;
  conversationId?: number;
};

export interface LanguageData {
  id?: number;
  languageName: string;
  languageCode: string;
  countryCode: string;
  voiceName: string;
  ssmlGender: string;
  conversationId?: number;
};

export interface Settings {
  id?: number;
  cefrLevel: "C2" | "C1" | "B2" | "B1" | "A2" | "A1";
  ttsEnabled: boolean;
  conversationId?: number;
};

export interface NativeLanguage {
  id: number;
  languageName: string;
  languageCode: string;
};

export interface VoiceData {
  voices: {
    languageCodes: string[];
    name: string;
    ssmlGender: string;
    naturalSampleRateHertz: number;
  }[];
}

export interface GptResponseData {
  
}

