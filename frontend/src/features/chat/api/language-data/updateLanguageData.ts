import { useMutation } from "react-query"
import { config } from '../../../../config';
import { LanguageData } from "../../types/types";
import axios from "axios";

export const updateLanguageData = async (languageData: LanguageData) => {
  try {
    const data = await axios.put(config.API_DOMAIN + `language-data?id=${languageData.id}`);
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
    mutationKey: ["update-language-data"],
    mutationFn: async ()=> updateLanguageData(languageData)
  });
};