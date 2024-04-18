import { useMutation, useQuery } from "react-query"
import { config } from '../../../../config';
import axios from "axios";
import { LanguageData, VoiceData } from "../../types/types";

interface TextToSpeechData {
  input: string;
  voice: VoiceObject;
};

interface VoiceObject {
  languageCode: string;
  name: string;
  ssmlGender: string;
};

export const getTtsVoiceBase64 = async (input: string, languageData: LanguageData) => {

  if(
    !input 
    || !languageData 
    || !languageData.voiceName 
    || !languageData.ssmlGender 
    || !languageData.languageCode
  ) {
    throw new Error("Cannot get TTS Voice Base64, input is empty or necessary data in languageData does not exist");
  }

  const voiceObject: VoiceObject = {
    languageCode: languageData.languageCode,
    name: languageData.voiceName,
    ssmlGender: languageData.ssmlGender,
  };

  const textToSpeechData: TextToSpeechData = {
    input,
    voice: voiceObject
  };

  console.log(textToSpeechData)

  try {
    const data = await axios.post(config.API_DOMAIN + "google-api/text-to-speech", textToSpeechData);

    console.log(data)
    if(data && data.data) return data.data as string;

    throw new Error("Error retrieving Google TTS Voice Base64 data");
  } catch (error) {
    throw error;
  }
}

export const useGetTtsVoiceBase64 = (input: string, languageData: LanguageData) => {
  return useMutation({
    ...config,
    mutationKey: ["get-tts"],
    mutationFn: async ()=> getTtsVoiceBase64(input, languageData),
  });
};

