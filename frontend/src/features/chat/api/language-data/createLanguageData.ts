import axios from "axios"
import { config } from "../../../../config"
import { useMutation } from "react-query";
import { LanguageData } from "../../types/types";


export const createLanguageData = async (languageData: LanguageData) => {
  try {
    const data = await axios.post(config.API_DOMAIN + "language-data", {
      languageName: languageData.languageName,
      languageCode: languageData.languageCode,
      countryCode: languageData.countryCode,
      voiceName: languageData.voiceName,
      ssmlGender: languageData.ssmlGender,
      conversationId: languageData.conversationId
    });

    if(data && data.data) return data.data as LanguageData;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useMutateLanguageData = (languageData: LanguageData) => {
  return useMutation({
    mutationKey: ["create-language-data"],
    mutationFn: async ()=> createLanguageData(languageData),
  });
};