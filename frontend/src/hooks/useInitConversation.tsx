import { useEffect, useState } from "react";
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation } from "../features/chat/api/conversation/createConversation";
import { useUpdateLanguageData } from "../features/chat/api/language-data/updateLanguageData";
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate, useParams } from "react-router-dom";
import { useGPTResponse } from "../features/chat/api/openAI/createGPTResponse";
import { useCreateMessage } from "../features/chat/api/message/createMessage";

interface UseInitConversationProps {
  messages: Message[];
  isNewConversation: boolean;
  languageData: LanguageData;

}
export const useInitConversation = ({} : UseInitConversationProps) => {

  const { conversationId } = useParams();

  const [ isNewConversation, setIsNewConversation ] = useState(!conversationId);

  const [ initDone, setInitDone ] = useState(false);

  const [ errorCreating, setErrorCreating ] = useState(false);

  const [ readyToCreate, setReadyToCreate ] = useState(false);

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

  

  const createGptResponse = useGPTResponse( messages, isNewConversation ? messages[0].content : input);


  // CREATE ----------------------------------------------------------------------------
  const navigate = useNavigate();
  
  const initialPrompt = {
    role: "user",
    content: getGptPrompt(languageData, settings.cefrLevel)
  };
  const createConversation = useCreateConversation();

  const createLangData = useCreateLanguageData(languageData);

  const createMessage = useCreateMessage();

  const [convoId, setConvoId] = useState<number | null>(null);

  const [ isSaved, setIsSaved ] = useState({
    conversation: false,
    languageData: false,
    settings: false,
    message: false
  })

  useEffect(() => {
    if(isNewConversation && languageData.voiceName) {
      const handleConversationCreate = async () => {
        // create conversation
        const conversationData = await createConversation.mutateAsync();
        if(conversationData) {
          // if conversation is created, insert convo id as foreign key into children tables
          setLanguageData(prev => ({...prev, conversationId: conversationData.id}));
          setSettings(prev => ({...prev, conversationId: conversationData.id}));
          setMessages([{...initialPrompt, conversationId: conversationData.id}])
        } else {
          setErrorCreating(true);
        };
      };

      handleConversationCreate();
      
    }
  },[languageData.voiceName, isNewConversation])

  // useEffect(()=> {
  //   // check if prompt was inserted and got a response from open ai that initializes conversation
  //   if(messages.length === 2
  //     && messages[0].role === "user"
  //     && messages[1].role === "assistant"
  //     && isNewConversation
  //   ) {
  //     setReadyToCreate(true);
  //   }
  // },[messages]);

  useEffect(() => {
    if(isNewConversation && languageData.conversationId) {
      const handleLanguageDataCreate = async () => {
        const langData = await createLangData.mutateAsync();
        if(!langData) {
          setErrorCreating(true);
        };
      };
      handleLanguageDataCreate();
    };

  },[languageData.conversationId, isNewConversation])

  useEffect(() => {
    if(isNewConversation && settings.conversationId) {
      const handleSettingsCreate = async () => {
        const langData = await createLangData.mutateAsync();
        if(!langData) {
          setErrorCreating(true);
        };
      };
      handleSettingsCreate();
    };

  },[settings.conversationId, isNewConversation])

  useEffect(() => {
    if(
      isSaved.conversation &&
      isSaved.languageData &&
      isSaved.message &&
      isSaved.settings &&
      convoId
    ) {
      navigate(`/c/${convoId}`)
    }
  },[isSaved.conversation, isSaved.languageData, isSaved.message, isSaved.settings, convoId]);



  return {

  };

}