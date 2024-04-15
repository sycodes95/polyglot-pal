import { useEffect, useState, useRef, useCallback } from 'react';
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation, ConversationId } from '../features/chat/api/conversation/createConversation';
import { useUpdateLanguageData, updateLanguageData } from '../features/chat/api/language-data/updateLanguageData';
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

  const { conversationId } = useParams();

  const queryClient = useQueryClient();

  const cIdRef = useRef<string | undefined>(undefined); 

  const [languageData, setLanguageData] = useState<LanguageData>(defaultLanguageData);

  const googleVoiceData = useGoogleVoiceData();

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const [messages, setMessages] = useState<Message[]>([]);

  const [stateIsInit, setStateIsInit] = useState(false);

  const [initialPrompt, setInitialPrompt] = useState({
    role: "user",
    content: getGptPrompt(languageData, settings.cefrLevel)
  })

  const [lastMsg, setLastMsg] = useState<Message | undefined>(messages[messages.length - 1] ?? undefined);

  useEffect(() => {
    if(messages.length > 0) {
      setLastMsg(messages[messages.length - 1]);
    }
  },[messages]);

  const [input, setInput] = useState("");

  const updateLanguageData = useUpdateLanguageData(languageData);

  const deleteAllMsgs = useDeleteAllMsgs(Number(conversationId));

  const createMsg = useCreateMessage(lastMsg);

  const createGptResponse = useGPTResponse(messages, input);

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);
  };

  const handleCreateGptResponse = useCallback( async () => {
    const gptTranscript = await createGptResponse.mutateAsync();
    if(gptTranscript) {
      gptTranscript.conversationId = Number(conversationId);
      // check if user has quickly switched to different conversation while gptresponse was fetching or loading
      if(conversationId === cIdRef.current) {
        setMessages(prev => [...prev, gptTranscript]);
      };
    };

  },[conversationId]);

  useEffect(()=> {
    // save messages if not saved already by checking for id.
    if(conversationId && lastMsg && lastMsg.conversationId && !lastMsg.id) {
      createMsg.mutateAsync();
    };

    if(conversationId && lastMsg && lastMsg.conversationId) {
      if(lastMsg.role === "user") {
        handleCreateGptResponse();
      } else if(lastMsg.role === "assistant") {
        //do tts
      }
    } 
  },[lastMsg])

  useEffect(()=> {

    if(conversationId && languageData.conversationId && languageData.id && !stateIsInit) {
      updateLanguageData.mutateAsync();
    };

    // if state is initial fetch set it to false after first call of useEffect
    setStateIsInit(false);

  },[languageData]);

  const handleOnLangSelect = async (voiceName: string) => {

    const [languageCode, countryCode, _, __] = voiceName.split("-");
    const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
    const name = googleVoiceData.data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.name;
    const ssmlGender = googleVoiceData.data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.ssmlGender;

    if(!name || !languageCode || !countryCode || !languageName || !ssmlGender) {
      return 
    };
    
    deleteAllMsgs.mutateAsync()

    setMessages([
      { 
        role: "user", 
        content: getGptPrompt({
          languageName,
          languageCode,
          countryCode,
          voiceName: name,
          ssmlGender,
          }, 
          settings.cefrLevel
        ), 
        conversationId: Number(conversationId)
      }
    ]);

    setSettings(defaultSettings);
    
    setLanguageData(prev => ({
      ...prev,
      languageName,
      languageCode,
      countryCode,
      voiceName: name,
      ssmlGender,
    }));
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
      setStateIsInit(true);
      
      // resetState()네네티비
      getLanguageData(Number(conversationId)).then(data => {
        console.log(data)
        if(data ) {
          setLanguageData(data)
        }
      });
      getAllMessages(Number(conversationId)).then(data => data ? setMessages(data) : setMessages([]));
      getSettings(Number(conversationId)).then(data => data && setSettings(data));
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
    handleCreateGptResponse,
    submitUserInput,
    handleOnLangSelect,
    googleVoiceData
  };

};