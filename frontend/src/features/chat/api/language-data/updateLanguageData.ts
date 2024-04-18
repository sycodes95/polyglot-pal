import { useMutation } from "react-query"
import { config } from '../../../../config';
import { LanguageData } from "../../types/types";
import axios from "axios";
// export interface LanguageData {
//   id?: number;
//   languageName: string;
//   languageCode: string;
//   countryCode: string;
//   voiceName: string;
//   ssmlGender: string;
//   conversationId?: number;
// };
export const updateLanguageData = async (languageData: LanguageData) => {
  try {
    if(!languageData.id || !languageData.conversationId) return null;
    const data = await axios.put(config.API_DOMAIN + `language-data/${languageData.id}`, {
      languageName: languageData.languageName,
      languageCode: languageData.languageCode,
      countryCode: languageData.countryCode,
      voiceName: languageData.voiceName,
      ssmlGender: languageData.ssmlGender,
    } as LanguageData);
    if(data && data.data) return data.data as LanguageData;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export const useUpdateLanguageData = (languageData: LanguageData) => {
  return useMutation({
    ...config,
    mutationKey: ["language-data"],
    mutationFn: async ()=> updateLanguageData(languageData)
  });
};