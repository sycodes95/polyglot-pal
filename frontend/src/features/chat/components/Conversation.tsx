import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryConversation } from "../api/conversation/getConversationById";
import { useCreateConversation } from "../api/conversation/createConversation";
import { LanguageDataSelect } from "./LanguageDataSelect";
import { LanguageData, Message, Settings } from "../types/types";
import { Messages } from "./Messages";
import { createGPTResponse, useGPTResponse } from "../api/openAI/createGPTResponse";
import { getGptPrompt } from "../utils/getGptPrompt";
import { VoiceAndTextInput } from "./VoiceAndTextInput";
import { useMutateMessage } from "../api/message/createMessage";
import { useMutateLanguageData, createLanguageData } from '../api/language-data/createLanguageData';


export const Conversation = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [isNewConversation, setIsNewConversation ] = useState(!conversationId);

  const [userVoiceBase64, setUserVoiceBase64] = useState("");

  const [input, setInput] = useState("");
  // const []
  // const [conversationData, setConversationData] = useState<ConversationDto>(defaultConversationData);

  const [messages, setMessages] = useState<Message[]>([])

  const [lastMsg, setLastMsg] = useState<Message | undefined>(messages[messages.length - 1]);

  const createMessage = useMutateMessage(lastMsg);


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
  const createLanguageData = useMutateLanguageData(languageData);


  // const queryConversation = useQueryConversation(Number(conversationId));

  const createConversation = useCreateConversation();

  const createGptResponse = useGPTResponse(
    messages, 
    messages.length == 1 ?
    messages[0].content
    :
    input
  );

  const submitUserInput = () => {
    // add input to messages then reset input
    setMessages(prev => {
      const msgs = [...prev];
      msgs.push({
        content: input,
        role: "user"
      })
      return msgs;
    });

    setInput("");

  };
 
  const initializeConversation = async () => {

    setMessages(prev => [...prev, {
      role: "user",
      content: getGptPrompt(languageData, settings.cefrLevel)
    }]);
    // setInput(prev => prev + getGptPrompt(languageData, settings.cefrLevel));
  }

  useEffect(() => {
    //initialize new conversation when language data changes
    if(languageData.voiceName && isNewConversation) {
      handleConversationCreate();
    } else if(languageData.voiceName) {
      initializeConversation();
    }
  },[languageData])

  // useEffect(() => {
  //   if(lastMsg && !lastMsg.id && !lastMsg.conversationId) {
  //     createMessage.mutateAsync();
  //   }
  // },[lastMsg])

  const handleCreateGptResponse = async () => {
    const data = await createGptResponse.mutateAsync();
    
    if(data) {
      
      const message = data;
      setMessages(prev => {
        const msgs = [...prev];
        msgs.push(message)
        return msgs;
      });
    };
  };

  useEffect(() => {
    
    //if messages has length and last msg has user role get gpt response
    if(messages.length >= 1 && messages[messages.length - 1].role === "user") {
      handleCreateGptResponse()
    };
  },[messages]);

  const handleConversationCreate = async () => {
    const conversationData = await createConversation.mutateAsync();
    

    if(conversationData) {
      console.log(conversationData)
      setLanguageData(prev => ({...prev, conversationId: conversationData.id}));
    }
  }

  const handleLanguageDataCreate = async () => {
    const langData = await createLanguageData.mutateAsync();
    if(langData) {
      console.log(langData)
      navigate(`/c/${languageData.conversationId}`);
    }
  }

  useEffect(() => {
    console.log(languageData)
    if(languageData.conversationId && isNewConversation) {
      setIsNewConversation(prev => !prev);
    console.log("lang")
      handleLanguageDataCreate()
    }
  },[languageData.conversationId])
  
  return (
    <div className="border w-full h-full grow flex flex-col gap-4">
      <LanguageDataSelect 
      isNewConversation={isNewConversation} 
      createMutationConversation={createConversation} 
      languageDataState={{ languageData, setLanguageData }}
      />

      <Messages 
      isNewConversation={isNewConversation}
      messagesState={{messages, setMessages}}
      />

      <VoiceAndTextInput 
      languageData={languageData}
      inputState={{input, setInput}}
      setUserVoiceBase64={setUserVoiceBase64}
      getGptResponse={handleCreateGptResponse}
      submitUserInput={submitUserInput}
      />
      
    </div>
  );
};