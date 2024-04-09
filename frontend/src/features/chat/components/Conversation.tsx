import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryConversation } from "../api/conversation/getConversationById";
import { useCreateConversation } from "../api/conversation/createConversation";
import { LanguageDataSelect } from "./LanguageDataSelect";
import { LanguageData, Message, Settings } from "../types/types";
import { Messages } from "./Messages";
import { createGPTResponse, useGPTResponse } from "../api/openAI/createGPTResponse";
import { getGptPrompt } from "../utils/getGptPrompt";
import { VoiceAndTextInput } from "./VoiceAndTextInput";


export const Conversation = () => {
  const { conversationId } = useParams();
  const [isNewConversation ] = useState(!conversationId);

  const [userVoiceBase64, setUserVoiceBase64] = useState("");

  const [input, setInput] = useState("");
  // const []
  // const [conversationData, setConversationData] = useState<ConversationDto>(defaultConversationData);
  const [messages, setMessages] = useState<Message[]>([])

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

  const getGptResponse = async () => {
    console.log("getgptresponse")
    await createGptResponse.mutateAsync();
    
  };

  const initializeConversation = async () => {

    setMessages([{
      role: "user",
      content: getGptPrompt(languageData, settings.cefrLevel)
    }]);

    // setInput(prev => prev + getGptPrompt(languageData, settings.cefrLevel));
  }

  useEffect(() => {
    //initialize new conversation when language data changes
    if(languageData.voiceName) {
      initializeConversation();
      
    }
  },[languageData])

  useEffect(() => {
    console.log(messages)
    if(messages.length > 0 && messages[messages.length - 1].role === "user") {
      createGptResponse.mutateAsync();
    }
  },[messages])

  useEffect(() => {
    if(createGptResponse.isSuccess && createGptResponse.data) {
      console.log(createGptResponse.data)
      const message = createGptResponse.data;

      setMessages(prev => {
        const msgs = [...prev];
        msgs.push(message)
        return msgs;
      });


    };

  },[createGptResponse.isSuccess])
  
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
      getGptResponse={getGptResponse}
      submitUserInput={submitUserInput}
      />
      
    </div>
  );
};