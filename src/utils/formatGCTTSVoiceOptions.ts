import { LanguageOption, VoiceData } from "../features/talkWithPolyglot/types";
import ISO6391 from "iso-639-1";


export const formatGCTTSVoiceOptions = (voiceList: any[]) => {
  const voices : LanguageOption[] = []

  voiceList.forEach((voiceData: VoiceData) => {
    const [languageCode, countryCode] = voiceData.languageCodes[0].split("-");
    if(!voices.find(voice => voice.voiceName == voiceData.name)){
      voices.push({
        languageCode,
        countryCode,
        voiceName: voiceData.name,
        languageName: ISO6391.getName(languageCode),
        ssmlGender: voiceData.ssmlGender,
      });
    }
  })

  
  
  return voices.filter((option: LanguageOption) => 
    option.languageCode.length < 3 )
  .sort((a: LanguageOption, b: LanguageOption) => {
    if (a.languageName < b.languageName) {
      return -1;
    } else if (a.languageName > b.languageName) {
      return 1;
    }
    return 0;
  });
}
