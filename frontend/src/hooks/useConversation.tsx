import { useEffect, useState, useRef, useCallback } from 'react';
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation, ConversationId } from '../features/chat/api/conversation/createConversation';
import { useUpdateLanguageData, updateLanguageData} from '../features/chat/api/language-data/updateLanguageData';
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSettings } from "../features/chat/api/settings/createSettings";
import {  useInitNewConversation } from "./useInitNewConversation";
import { getLanguageData, useQueryLanguageData } from '../features/chat/api/language-data/getLanguageData';
import { getAllMessages, useQueryMessages } from "../features/chat/api/message/getAllMessages";
import { getSettings, useQuerySettings } from "../features/chat/api/settings/getSettings";
import { useQueryClient } from "react-query";
import { createGPTResponse, useGPTResponse } from '../features/chat/api/openAI/createGPTResponse';
import { set } from 'date-fns';
import { useGoogleVoiceData } from '../features/chat/api/google/getVoiceDatas';
import { languageNameAndCodes } from '../constants/languageNameAndCodes';
import { useDeleteAllMsgs } from '../features/chat/api/message/deleteAllMessages';
import { useCreateMessage } from '../features/chat/api/message/createMessage';
import { useMessages } from './useMessages';
import { useLanguageData } from './useLanguageData';
import { getConversationById } from '../features/chat/api/conversation/getConversationById';
import { useSettings } from './useSettings';

// interface UseInitConversationProps {
//   messages: Message[];
//   isNewConversation: boolean;
//   languageData: LanguageData;

// }

export type InitConversationParam = "language-data" | "settings";

const defaultLanguageData: LanguageData = {
  languageName: "",
  languageCode: "",
  countryCode: "",
  voiceName: "",
  ssmlGender: "",
};

const defaultSettings: Settings = {
  cefrLevel: "C2",
  ttsEnabled: true
};



export const useConversation = () => {

  const navigate = useNavigate();

  const { conversationId } = useParams();

  const queryClient = useQueryClient();

  const cIdRef = useRef<string | undefined>(undefined); 

  const googleVoiceData = useGoogleVoiceData();

  function initConversation (
    initializer: InitConversationParam,
    data: {
      langData?: LanguageData,
      cefrLevel?: Settings["cefrLevel"]
    }
  ) {

    /*
    initConversation essentially resets and starts the conversation by
    deleting all messages tied to this conversation using conversationId
    and also resetting messages state and injecting the prompt as the first message
    */

    const { langData, cefrLevel} = data;

    // reset settings if function was called from useLanguageData hook
    if(initializer === "language-data" && langData) {
      console.log("check")
      setSettings(defaultSettings);
      setLanguageData(prev => ({
        ...prev,
        languageName: langData.languageName,
        languageCode: langData.languageCode,
        countryCode: langData.countryCode,
        voiceName: langData.voiceName,
        ssmlGender: langData.ssmlGender
      }));
    }

    deleteAllMsgs.mutateAsync();

    setMessages([
      { 
        role: "user", 
        content: getGptPrompt(langData ?? languageData, cefrLevel ?? settings.cefrLevel), 
        conversationId: Number(conversationId)
      }
    ]);

  };

  const [ isInitialFetchData, setIsInitialFetchData ] = useState(false);

  const [ input, setInput ] = useState("");

  const { 
    messages, 
    setMessages, 
    deleteAllMsgs,
    gptResIsLoading
  } = useMessages({ conversationId, input, cIdRef });

  const { 
    languageData, 
    setLanguageData, 
    handleLanguageSelect 
  } = useLanguageData({ 
    conversationId, 
    initConversation, 
    isInitialFetchData, 
    setIsInitialFetchData,
    googleVoiceData
  });

  const {
    settings,
    setSettings,
    handleLevelChange,
    handleTtsEnabled
  } = useSettings({conversationId, initConversation});

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);
  };

  const submitUserInput = async () => {
    setMessages(prev => [...prev, { content: input, role: "user", conversationId: Number(conversationId)}]);
    setInput("");
  };

  const checkIfParamIsValid = async () => {
    const convo = await getConversationById(Number(conversationId));
    if(convo && convo.id !== Number(conversationId)) {
      navigate("/");
    };
  };

  const { errorCreating } = useInitNewConversation({
    conversationId,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    settings,
    setSettings,
    resetState,
    
  });

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["all-conversations"]});
  // },[languageData, settings.cefrLevel])

  useEffect(() => {
    // console.log(conversationId)
    // queryClient.invalidateQueries({queryKey: ["language-data"]});
    cIdRef.current = conversationId;
    if(conversationId) {
      checkIfParamIsValid();
      setIsInitialFetchData(true);
      getLanguageData(Number(conversationId)).then(data => setLanguageData(data ?? defaultLanguageData));
      getAllMessages(Number(conversationId)).then(data => setMessages(data ?? []));
      getSettings(Number(conversationId)).then(data => setSettings(data ?? defaultSettings));
    } else {
      resetState();
    };
  },[conversationId]);

  return {
    settings,
    setSettings,
    handleLevelChange,
    handleTtsEnabled,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    gptResIsLoading,
    input,
    setInput,
    // handleCreateGptResponse,
    submitUserInput,
    handleLanguageSelect,
    googleVoiceData
  };

};

