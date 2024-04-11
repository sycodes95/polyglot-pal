import { useEffect, useState } from "react";
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation } from "../features/chat/api/conversation/createConversation";
import { useUpdateLanguageData } from "../features/chat/api/language-data/updateLanguageData";
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSettings } from "../features/chat/api/settings/createSettings";
import {  useInitCreateConversation } from "./useCreateNewConversation";
import { getLanguageData, useQueryLanguageData } from '../features/chat/api/language-data/getLanguageData';
import { getAllMessages, useQueryMessages } from "../features/chat/api/message/getAllMessages";
import { getSettings, useQuerySettings } from "../features/chat/api/settings/getSettings";
import { useQueryClient } from "react-query";

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

  // const [ initDone, setInitDone ] = useState(false);

  // const [cId, setCId] = useState<undefined | number>(undefined)

  // const queryLanguageData = useQueryLanguageData(Number(conversationId));
  const [languageData, setLanguageData] = useState<LanguageData>(defaultLanguageData);

  // const querySettings = useQuerySettings(Number(conversationId));
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // const queryMessages = useQueryMessages(Number(conversationId));
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("mount")
  },[])

  // const [lastMsg, setLastMsg] = useState(
  //   messages.length > 0 
  //   ? messages[messages.length - 1] 
  //   : null
  // )

  const [input, setInput] = useState("");

  const resetState = () => {
    setSettings(defaultSettings);
    setLanguageData(defaultLanguageData);
    setMessages([]);

  };

  const { errorCreating } = useInitCreateConversation({
    conversationId,
    setIsNewConversation,
    isExistingConversation,
    setIsExistingConversation,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    settings,
    setSettings,
    resetState
  });

  


  //  QUERY USEEFFECTS
  // useEffect(() => {
  //   console.log("waaa")
  //   if(queryLanguageData.isSuccess && queryLanguageData.data) {
  //     console.log(queryLanguageData.data)
  //     setLanguageData(queryLanguageData.data);
  //   }
  // },[queryLanguageData.isSuccess, queryLanguageData.data, queryLanguageData.isFetched]);

  // useEffect(() => {
  //   if(queryMessages.isSuccess && queryMessages.data) {
  //     setMessages(queryMessages.data);
  //   }
  // },[queryMessages.isSuccess]);

  // useEffect(() => {
  //   if(querySettings.isSuccess && querySettings.data) {
  //     setSettings(querySettings.data);
  //   }
  // },[querySettings.isSuccess]);



  useEffect(() => {
    // queryClient.invalidateQueries({queryKey: ["language-data"]})

    getLanguageData(Number(conversationId)).then(data => data && setLanguageData(data));
    getAllMessages(Number(conversationId)).then(data => data && setMessages(data));
    getSettings(Number(conversationId)).then(data => data && setSettings(data));


  },[conversationId]);

  // useEffect(() => {
  //   if(isExistingConversation) {
  //     queryClient.invalidateQueries({ queryKey: ["language-data"]})
  //   }
  // },[isExistingConversation])

  // useEffect(() => {
  //   console.log(cId)
  //   if(cId) {
  //     setIsNewConversation(false);
  //     setIsExistingConversation(true);
  //   } else {
  //     setIsNewConversation(true);
  //     setIsExistingConversation(false);
  //   }
  // },[cId])



  return {
    settings,
    setSettings,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    input,
    setInput
  };
  

  // const createGptResponse = useGPTResponse( messages, isNewConversation ? messages[0].content : input);


  // CREATE ----------------------------------------------------------------------------
  // const navigate = useNavigate();

  // const initialPrompt = {
  //   role: "user",
  //   content: getGptPrompt(languageData, settings.cefrLevel)
  // };

  // const [ errorCreating, setErrorCreating ] = useState(false);

  // const createConversation = useCreateConversation();

  // const createLangData = useCreateLanguageData(languageData);

  // const createMessage = useCreateMessage(messages[0]);

  // const createSettings = useCreateSettings(settings);

  // const [navigateParam, setNavigateParam] = useState<number | null>(null);

  // const [ isSaved, setIsSaved ] = useState({
  //   conversation: false,
  //   languageData: false,
  //   settings: false,
  //   message: false,
  // });

  // useEffect(() => {
  //   if(isNewConversation && languageData.voiceName) {
  //       // create conversation after user selects language & voice
  //     const handleConversationCreate = async () => {
  //       const conversationData = await createConversation.mutateAsync();
  //       if(conversationData) {
  //         // if conversation is created, insert convo id as foreign key into children tables
  //         setLanguageData(prev => ({...prev, conversationId: conversationData.id}));
  //         setSettings(prev => ({...prev, conversationId: conversationData.id}));
  //         setMessages([{...initialPrompt, conversationId: conversationData.id}]);
  //         setNavigateParam(conversationData.id);
  //       } else {
  //         setErrorCreating(true);
  //       };
  //     };

  //     handleConversationCreate();
  //   };
  // },[languageData.voiceName, isNewConversation]);

  // useEffect(()=> {
  //   // save prompt msg
  //   if(
  //     isNewConversation &&
  //     messages.length === 1 &&
  //     messages[0].role === "user"
  //   ) {
  //     const handleMessageCreate = async () => {
  //       const msgData = await createMessage.mutateAsync();
  //       if(msgData) {
  //         setIsSaved(prev => ({...prev, message: true}));
  //       } else {
  //         setErrorCreating(true);
  //       }
  //     };
  //     handleMessageCreate();
  //   };
  // },[messages, isNewConversation]);

  // useEffect(() => {
  //   // save language data
  //   if(isNewConversation && languageData.conversationId) {
  //     const handleLanguageDataCreate = async () => {
  //       const langData = await createLangData.mutateAsync();
  //       if(langData) {
  //         setIsSaved(prev => ({...prev, languageData: true}));
  //       } else {
  //         setErrorCreating(true);
  //       }
  //     };
  //     handleLanguageDataCreate();
  //   };

  // },[languageData.conversationId, isNewConversation])

  // useEffect(() => {
  //   // save settings
  //   if(isNewConversation && settings.conversationId) {
  //     const handleSettingsCreate = async () => {
  //       const settings = await createSettings.mutateAsync();
  //       if(settings) {
  //         setIsSaved(prev => ({...prev, settings: true}));
  //       } else {
  //         setErrorCreating(true);
  //       }
  //     };
  //     handleSettingsCreate();
  //   };

  // },[settings.conversationId, isNewConversation]);

  // useEffect(() => {
  //   if(
  //     isSaved.conversation &&
  //     isSaved.languageData &&
  //     isSaved.message &&
  //     isSaved.settings &&
  //     navigateParam
  //   ) {
  //     navigate(`/c/${navigateParam}`);
  //   }
  // },[isSaved.conversation, isSaved.languageData, isSaved.message, isSaved.settings, navigateParam]);

  // NORMAL


  

}