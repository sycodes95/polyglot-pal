import { LanguageDataSelect } from "./LanguageDataSelect";
import { Messages } from "./Messages";
import { VoiceAndTextInput } from "./VoiceAndTextInput";
import { useConversation } from "../../../hooks/useConversation";
import { SettingsBar } from "./SettingsBar";
import { OptionsLayout } from "./OptionsLayout";


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

      <OptionsLayout>
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

      </OptionsLayout>
      
      <Messages 
      messagesState={{messages, setMessages}}
      />
        
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