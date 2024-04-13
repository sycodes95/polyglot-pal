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

  const [isNewConversation, setIsNewConversation] = useState(!conversationId);

  const [isExistingConversation, setIsExistingConversation] = useState(!!conversationId);

  const queryClient = useQueryClient();

  const cIdAtGptRequest = useRef<string | undefined>(undefined); 

  // const [ initDone, setInitDone ] = useState(false);

  // const [cId, setCId] = useState<undefined | number>(undefined)

  // const queryLanguageData = useQueryLanguageData(Number(conversationId));
  const [languageData, setLanguageData] = useState<LanguageData>(defaultLanguageData);

  // const querySettings = useQuerySettings(Number(conversationId));
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // const queryMessages = useQueryMessages(Number(conversationId));
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
  },[])

  const [input, setInput] = useState("");

  const createGptResponse = useGPTResponse(messages, input);

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);
  };

  const handleCreateGptResponse = async () => {
    // cIdAtGptRequest = conversationId;
    const gptTranscript = await createGptResponse.mutateAsync();
    if(gptTranscript) {
      // check if user has quickly switched to different conversation while gptresponse was fetching or loading
      if(conversationId === cIdAtGptRequest.current) {
        setMessages(prev => [...prev, gptTranscript]);
      }
    };
  };

  useEffect(() => {
    if(conversationId && messages.length > 0 && messages[messages.length - 1].role === "user") {
      handleCreateGptResponse();
    };
  },[messages])

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
    cIdAtGptRequest.current = conversationId;
    if(conversationId) {
      // resetState()
      getLanguageData(Number(conversationId)).then(data => data && setLanguageData(data));
      getAllMessages(Number(conversationId)).then(data => data ? setMessages(data) : setMessages([]));
      getSettings(Number(conversationId)).then(data => data && setSettings(data));
    } else {
      resetState()
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