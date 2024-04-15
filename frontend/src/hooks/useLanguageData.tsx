import { useEffect, useState } from "react";
import { LanguageData, VoiceData } from "../features/chat/types/types";
import { useUpdateLanguageData } from '../features/chat/api/language-data/updateLanguageData';
import { useGoogleVoiceData } from "../features/chat/api/google/getVoiceDatas";
import { languageNameAndCodes } from "../constants/languageNameAndCodes";
import { ConversationId } from '../features/chat/api/conversation/createConversation';
import { inject } from "vitest";
import { cefrLevels } from '../constants/cefrLevels';
import { UseQueryResult } from "react-query";
import { InitConversationParam } from "./useConversation";

const defaultLanguageData: LanguageData = {
  languageName: "",
  languageCode: "",
  countryCode: "",
  voiceName: "",
  ssmlGender: "",
};

interface UseLanguageDataProps {
  conversationId: string | undefined;
  initConversation: (initializer: InitConversationParam)=> void;
  isInitialFetchData: boolean;
  setIsInitialFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  googleVoiceData: UseQueryResult<VoiceData, unknown>;
}

export const useLanguageData = ( { 
  conversationId, 
  initConversation,
  isInitialFetchData,
  setIsInitialFetchData,
  googleVoiceData
}: UseLanguageDataProps) => {
   
  const [languageData, setLanguageData] = useState<LanguageData>(defaultLanguageData);

  const updateLanguageData = useUpdateLanguageData(languageData);

  const handleLanguageSelect = async (voiceName: string) => {

    const [languageCode, countryCode, _, __] = voiceName.split("-");
    const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
    const name = googleVoiceData.data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.name;
    const ssmlGender = googleVoiceData.data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.ssmlGender;

    if(!name || !languageCode || !countryCode || !languageName || !ssmlGender) {
      return 
    };

    setLanguageData(prev => ({
      ...prev,
      languageName,
      languageCode,
      countryCode,
      voiceName: name,
      ssmlGender
    }));

  };

  useEffect(()=> {
    if(conversationId && languageData.conversationId && languageData.id && !isInitialFetchData) {
      initConversation("language-data");
      updateLanguageData.mutateAsync();
    };
    // if state is initial fetch set it to false after first call of useEffect
    setIsInitialFetchData(false);
  },[languageData]);


  return {
    languageData,
    setLanguageData,
    handleLanguageSelect
  };
}