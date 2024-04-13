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
import { useQueryLanguageData } from "../api/language-data/getLanguageData";
import { useConversation } from "../../../hooks/useConversation";


export const Conversation = () => {
  
  const { 
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
  } = useConversation();
  
  return (
    <div className="border w-full h-full grow flex flex-col gap-4 rounded-md">
      <LanguageDataSelect 
      languageDataState={{ languageData, setLanguageData }}
      />

      <Messages 
      messagesState={{messages, setMessages}}
      />

      <VoiceAndTextInput 
      languageData={languageData}
      inputState={{input, setInput}}
      // setUserVoiceBase64={setUserVoiceBase64}
      getGptResponse={handleCreateGptResponse}
      submitUserInput={submitUserInput}
      />
      
    </div>
  );
};