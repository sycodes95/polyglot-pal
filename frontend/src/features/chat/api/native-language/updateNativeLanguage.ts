import axios from "axios"
import { NativeLanguageOption } from "../../constants/nativeLanguageOptions"
import { config } from "../../../../config"
import { useMutation } from "react-query";

export const updateNativeLanguage = async (nativeLanguageOption: NativeLanguageOption) => {
  try {
    const data = await axios.put<NativeLanguageOption>(config.API_DOMAIN + "native-language", nativeLanguageOption);

    if(data) return data.data;

    return null;

  } catch (err) {
    console.error(err);
    return null;
  }
}

export const useUpdateNativeLanguage = (nativeLanguageOption: NativeLanguageOption) => {
  return useMutation({
    ...config,
    mutationKey: ["create-native-language"],
    mutationFn: async ()=> updateNativeLanguage(nativeLanguageOption),
  });

};