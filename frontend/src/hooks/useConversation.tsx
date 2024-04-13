import { useEffect, useState, useRef } from 'react';
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation } from "../features/chat/api/conversation/createConversation";
import { useUpdateLanguageData } from "../features/chat/api/language-data/updateLanguageData";
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSettings } from "../features/chat/api/settings/createSettings";
import {  useInitNewConversation } from "./useInitNewConversation";
import { getLanguageData, useQueryLanguageData } from '../features/chat/api/language-data/getLanguageData';
import { getAllMessages, useQueryMessages } from "../features/chat/api/message/getAllMessages";
import { getSettings, useQuerySettings } from "../features/chat/api/settings/getSettings";
import { useQueryClient } from "react-query";
import { createGPTResponse, useGPTResponse } from '../features/chat/api/openAI/createGPTResponse';

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

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
  },[]);

  const [input, setInput] = useState("");
  
  const initialPrompt = {
    role: "user",
    content: getGptPrompt(languageData, settings.cefrLevel)
  };

  const createGptResponse = useGPTResponse(messages, input);

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);
  };

  const handleCreateGptResponse = async () => {
    console.log("check")
    // cIdRef = conversationId;
    const gptTranscript = await createGptResponse.mutateAsync();
    if(gptTranscript) {
      // check if user has quickly switched to different conversation while gptresponse was fetching or loading
      if(conversationId === cIdRef.current) {
        setMessages(prev => [...prev, gptTranscript]);
      };
    };
  };

  // const initializeConversation = () => {
  // };

  useEffect(() => {
    if(conversationId && messages.length > 0 && messages[messages.length - 1].role === "user") {
      console.log("gptresponse call")
      handleCreateGptResponse();
    } else if(conversationId && messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      //do tts
    }

    // save message if conversationId does not exist.
  },[messages]);

  useEffect(()=> {
    // initialize conversation
    if(languageData.voiceName && conversationId && !languageData.conversationId) {
      console.log("languagedatadep")
      setSettings(defaultSettings);
      setMessages([initialPrompt]);
    };
  },[languageData]);

  const submitUserInput = async () => {
    setMessages(prev => [...prev, { content: input, role: "user"}]);
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
    resetState
  });

  useEffect(() => {
    // console.log(conversationId)
    queryClient.invalidateQueries({queryKey: ["language-data"]});
    cIdRef.current = conversationId;
    if(conversationId) {
      // resetState()
      getLanguageData(Number(conversationId)).then(data => data && setLanguageData(data));
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
    submitUserInput
  };

};