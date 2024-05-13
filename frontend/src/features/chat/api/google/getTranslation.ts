import axios from "axios";
import { config } from "../../../../config";

interface TranslationReqData {
  targetLanguage: string;
  text: string;
};

export const getTranslation = async (translationReqData: TranslationReqData ) => {
  try {
    const {data} = await axios.post(config.API_DOMAIN + "google-api/translation", translationReqData);

    console.log(data);
  } catch (error) {
    
  }
};