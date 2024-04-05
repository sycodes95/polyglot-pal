import axios from "axios"
import { Conversation, NativeLanguage } from '../../types/types';
import { config } from "../../../../config";
import { useQuery } from "react-query";

export const getNativeLanguage = async () => {
  try {
    const data = await axios.get(config.API_DOMAIN + "native-language");

    if(data) return data.data as NativeLanguage;
    // if(data) return data.data;
    return null;    
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const useNativeLanguage = () => {
  return useQuery({
    ...config,
    queryKey: ["native-language"],
    queryFn: async ()=> getNativeLanguage(),
  });
}