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
import { SettingsBar } from "./SettingsBar";


export const Conversation = () => {
  
  const { 
    settings,
    setSettings,
    handleLevelChange,
    handleTtsEnabled,
    languageData,
    setLanguageData,
    messages,
    setMessages,
    input,
    setInput,
    submitUserInput,
    handleLanguageSelect,
    googleVoiceData
  } = useConversation();
  
  return ( 
    <div className="w-full flex flex-col  items-center bg-black/10  relative ">

      <div className="flex flex-col w-fit gap-4 absolute top-4 left-4 z-10 backdrop-blur-md rounded-md">
        <LanguageDataSelect 
        googleVoiceData={googleVoiceData}
        handleLanguageSelect={handleLanguageSelect}
        languageDataState={{ languageData, setLanguageData }}
        />
    
        <SettingsBar 
        settings={settings} 
        setSettings={setSettings} 
        languageData={languageData} 
        handleLevelChange={handleLevelChange}
        />
      </div>
  
      <div className="  h-full w-full grow flex flex-col rounded-md relative overflow-y-auto">

        <div className="h-full w-full flex justify-center absolute top-0 pb-[4rem]">
          <Messages 
          messagesState={{messages, setMessages}}
          />
        </div>
      </div>

      <VoiceAndTextInput 
        languageData={languageData}
        inputState={{input, setInput}}
        // setUserVoiceBase64={setUserVoiceBase64}
        // getGptResponse={handleCreateGptResponse}
        submitUserInput={submitUserInput}
        />

    </div>

  );
};