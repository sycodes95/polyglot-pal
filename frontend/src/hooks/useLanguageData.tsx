import { useEffect, useState } from "react";
import { LanguageData, Settings, VoiceData } from "../features/chat/types/types";
import { useUpdateLanguageData } from '../features/chat/api/language-data/updateLanguageData';
import { useGoogleVoiceData } from "../features/chat/api/google/getVoiceDatas";
import { languageNameAndCodes } from "../constants/languageNameAndCodes";
import { ConversationId } from '../features/chat/api/conversation/createConversation';
import { inject } from "vitest";
import { cefrLevels } from '../constants/cefrLevels';
import { UseQueryResult, useQueryClient } from "react-query";
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
  initConversation: (initializer: InitConversationParam,
    data: {
      langData?: LanguageData,
      cefrLevel?: Settings["cefrLevel"]
    })=> void;
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

  const queryClient = useQueryClient();
   
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

    const langData: LanguageData = {
      languageName,
      languageCode,
      countryCode,
      voiceName: name,
      ssmlGender
    }; 

    initConversation("language-data", { langData });
  };

  useEffect(()=> {
    if(conversationId && languageData.conversationId && languageData.id && !isInitialFetchData) {
      updateLanguageData.mutateAsync();
    };
    // if state is initial fetch set it to false after first call of useEffect
    setIsInitialFetchData(false);
  },[languageData]);

  useEffect(()=> {
    if(updateLanguageData.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["all-conversations"]});
    }

  },[updateLanguageData.isSuccess])


  return {
    languageData,
    setLanguageData,
    handleLanguageSelect
  };
}