import { useEffect, useState, useRef,  } from 'react';
import { LanguageData, Settings } from '../features/chat/types/types';
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import {  useInitNewConversation } from "./useInitNewConversation";
import { getLanguageData,  } from '../features/chat/api/language-data/getLanguageData';
import { getAllMessages,  } from "../features/chat/api/message/getAllMessages";
import { getSettings,  } from "../features/chat/api/settings/getSettings";
import { useGoogleVoiceData } from '../features/chat/api/google/getVoiceDatas';
import { useMessages } from './useMessages';
import { useLanguageData } from './useLanguageData';
import { getConversationById } from '../features/chat/api/conversation/getConversationById';
import { useSettings } from './useSettings';
import { useTts } from './useTts';



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

  const [ ttsBase64, setTtsBase64 ] = useState(""); 

  const { ttsBase64IsEmpty, ttsAudio, resetUseTts } = useTts({ttsBase64});

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
    messages, 
    setMessages, 
    deleteAllMsgs,
    gptResIsLoading
  } = useMessages({ conversationId, input, cIdRef, languageData, setTtsBase64 });

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

  const getValidLanguageData = async () => {
    const data = await getLanguageData(Number(conversationId));
    if(data) {
      const dataCId = data.conversationId;
      if(languageData.conversationId !== dataCId) {
        setLanguageData(data);
      };
    };
  };

  const getAllValidMessages = async () => {
    const data = await getAllMessages(Number(conversationId));
    console.log(data)
    if(!data || data.length < 1) return
    if(data[0].conversationId == conversationId || (data[0].conversationId === messages[0].conversationId)  ) {
      setMessages(data);
    };
  };

  const getValidSettings = async () => {
    const data = await getSettings(Number(conversationId));
    if(data) {
      const dataCId = data.conversationId;
      if(settings.conversationId !== dataCId) {
        setSettings(data);
      };
    };
  };

  useEffect(() => {
    // queryClient.invalidateQueries({queryKey: ["language-data"]});
    cIdRef.current = conversationId;
    if(conversationId) {
      checkIfParamIsValid();
      setIsInitialFetchData(true);
      getValidLanguageData();
      getAllValidMessages();
      getValidSettings();
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
    googleVoiceData,
    ttsBase64IsEmpty, 
    ttsAudio, 
    resetUseTts
  };

};

