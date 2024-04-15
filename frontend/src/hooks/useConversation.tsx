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

// interface UseInitConversationProps {
//   messages: Message[];
//   isNewConversation: boolean;
//   languageData: LanguageData;

// }

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

  const cIdRef = useRef<string | undefined>(undefined); 

  const googleVoiceData = useGoogleVoiceData();

  function initConversation (langData: LanguageData) {

    deleteAllMsgs.mutateAsync();

    setSettings(defaultSettings);

    setMessages([
      { 
        role: "user", 
        content: getGptPrompt(langData, settings.cefrLevel), 
        conversationId: Number(conversationId)
      }
    ]);

    setLanguageData(prev => ({
      ...prev,
      languageName: langData.languageName,
      languageCode: langData.languageCode,
      countryCode: langData.countryCode,
      voiceName: langData.voiceName,
      ssmlGender: langData.ssmlGender,
    }));

  };

  const [ settings, setSettings ] = useState<Settings>(defaultSettings);

  const [ isInitialFetchData, setIsInitialFetchData ] = useState(false);

  const [ input, setInput ] = useState("");

  const { messages, setMessages, deleteAllMsgs } = useMessages({ conversationId, input, cIdRef });

  const { languageData, setLanguageData, handleLanguageSelect } = useLanguageData({ 
    conversationId, 
    initConversation, 
    isInitialFetchData, 
    setIsInitialFetchData,
    googleVoiceData
  });

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);
  };

  const submitUserInput = async () => {
    setMessages(prev => [...prev, { content: input, role: "user", conversationId: Number(conversationId)}]);
    setInput("");
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

  useEffect(() => {
    // console.log(conversationId)
    // queryClient.invalidateQueries({queryKey: ["language-data"]});
    cIdRef.current = conversationId;
    if(conversationId) {
      getConversationById(Number(conversationId)).then(conv => {
        console.log(conv, conversationId)
        if(conv?.id !== Number(conversationId)) {
          navigate("/");
        };
      });
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
    languageData,
    setLanguageData,
    messages,
    setMessages,
    input,
    setInput,
    // handleCreateGptResponse,
    submitUserInput,
    handleLanguageSelect,
    googleVoiceData
  };

};