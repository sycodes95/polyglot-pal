import { useEffect, useState } from "react";
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation } from "../features/chat/api/conversation/createConversation";
import { useUpdateLanguageData } from "../features/chat/api/language-data/updateLanguageData";
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import { useGPTResponse } from "../features/chat/api/openAI/createGPTResponse";
import { useCreateMessage } from "../features/chat/api/message/createMessage";
import { useCreateSettings } from "../features/chat/api/settings/createSettings";
import {  useInitCreateConversation } from "./useCreateNewConversation";

// interface UseInitConversationProps {
//   messages: Message[];
//   isNewConversation: boolean;
//   languageData: LanguageData;

// }
export const useConversation = () => {

  const { conversationId } = useParams();

  const isNewConversation = !conversationId;

  const isExistingConversation = !!conversationId;

  const [ initDone, setInitDone ] = useState(false);

  const [settings, setSettings] = useState<Settings>({
    cefrLevel: "C2",
    ttsEnabled: true
  });

  const [languageData, setLanguageData] = useState<LanguageData>({
    languageName: "",
    languageCode: "",
    countryCode: "",
    voiceName: "",
    ssmlGender: "",
  });

  const [messages, setMessages] = useState<Message[]>([])

  const [input, setInput] = useState("");

  const { errorCreating } = useInitCreateConversation({
    isNewConversation,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    settings,
    setSettings
  });

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