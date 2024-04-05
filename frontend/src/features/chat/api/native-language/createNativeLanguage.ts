import axios from "axios"
import { NativeLanguageOption } from "../../constants/nativeLanguageOptions"
import { config } from "../../../../config"
import { useMutation } from "react-query";

export const createNativeLanguage = async (nativeLanguageOption: NativeLanguageOption) => {
  try {
    const data = await axios.post<NativeLanguageOption>(config.API_DOMAIN + "native-language", nativeLanguageOption);

    if(data) return data.data;

    return null;

  } catch (err) {
    console.error(err);
    return null;
  }
}

export const useCreateNativeLanguage = (nativeLanguageOption: NativeLanguageOption) => {
  return useMutation({
    ...config,
    mutationKey: ["create-native-language"],
    mutationFn: async ()=> createNativeLanguage(nativeLanguageOption),
  });

};