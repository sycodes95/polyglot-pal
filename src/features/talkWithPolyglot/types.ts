export type Message = {
  content: string;
  role: string;
}

export type VoiceData = {
  languageCodes: string[] 
  name: string,
  ssmlGender: string,
  naturalSampleRateHertz: number
}

export type LanguageOption = {
  languageCode: string,
  countryCode: string,
  voiceName: string,
  languageName: string,
  ssmlGender: string
}