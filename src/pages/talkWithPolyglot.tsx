import { useCallback, useEffect, useRef, useState } from "react";
import {
  LanguageOption,
  MessageData,
} from "../features/talkWithPolyglot/types";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import TalkMessageInput from "../features/talkWithPolyglot/components/talkMessageInput/talkMessageInput";
import TalkMessages from "../features/talkWithPolyglot/components/talkMessages/talkMessages";
import TalkSetupOptions from "../features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions";
import { getGPTPrompt } from "../features/talkWithPolyglot/services/getGPTPrompt";
import { combineLangAndCountryCode } from "../utils/combineLangAndCountryCode";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { Id } from "convex/dist/cjs-types/values/value";

import Icon from '@mdi/react';
import { mdiAlphaXBoxOutline } from '@mdi/js';
import useLanguageOptions from "../features/talkWithPolyglot/hooks/useLanguageOptions";

type Params = {
  c_id: Id<'conversation'>,
}

type TalkWithPolyGlotProps = {
  showMobileSideBar: boolean,
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

export type PalVoiceData = {
  element: HTMLAudioElement | null;
  messageIndex: number;
}
export default function TalkWithPolyGlot({ showMobileSideBar, setShowMobileSideBar} : TalkWithPolyGlotProps) {

  const { user } = useAuth0();

  const { c_id } = useParams<Params>()
  
  const conversation_id = useRef(null) 

  const getGPTMsg = useAction(api.actions.getGPTMessageResponse.getGPTMessageResponseConvex);
    
  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech);
  
  const getSpeechToText = useAction(api.actions.getSpeechToText.getSpeechToText);

  const getConvoArgs : {
    id?: Id<'conversation'>,
    sub: string
  } = {
    sub: (user && user.sub) ? user.sub : ''
  }
  if(c_id) getConvoArgs.id = c_id
  
  const getConversation = useQuery(api.query.getConversation.getConversation, getConvoArgs)
 
  const { languageOptions } = useLanguageOptions()

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageData[] | []>([]);
  const [userMessageIsLoading, setUserMessageIsLoading] = useState(false)
  const [palMessageIsLoading, setPalMessageIsLoading] = useState(false);
  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null);
  const [cefrLevel, setCefrLevel] = useState("C2");
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const [userVoiceBase64, setUserVoiceBase64] = useState("");

  const [userVoiceError, setUserVoiceError] = useState(false)

  const [palVoiceData, setPalVoiceData] = useState<PalVoiceData>({
    element: null,
    messageIndex: -1
  });


  const pausePalVoice = useCallback(() => {
    palVoiceData.element?.pause()
  },[palVoiceData.element])

  const playPalVoice = useCallback(() => {
    palVoiceData.element?.play()
  },[palVoiceData.element])

  const resetPalVoiceData = useCallback(() => {
    setPalVoiceData({
      element: null,
      messageIndex: -1
    });
  },[setPalVoiceData]);

  useEffect(()=> {
    // setConversationId({current: c_id})
    conversation_id.current = c_id
    setPalMessageIsLoading(false)
    resetPalVoiceData()
    pausePalVoice()
    if(!c_id) {
      //if c_id doesn't exist it means user is on a new conversation, not a saved one. So reset all state to default state
      resetState()
    }
  },[c_id]);
  
  useEffect(()=> {
    if(getConversation) {
      const convo = getConversation[0]
      
      if(convo) {
        setMessages(convo.messages)
        setSelectedLanguageData(convo.selectedLanguageData)
        setCefrLevel(convo.cefrLevel)
        setTtsEnabled(convo.ttsEnabled)
      } else {
        resetState()
      }
    }
    
  },[getConversation]);

  useEffect(()=> {
    // once AudioElement is added, it is played
    playPalVoice()
  },[palVoiceData.element, playPalVoice])

  useEffect(()=> {
    (palVoiceData.element && ttsEnabled) 
    ? !palVoiceData.element.ended && playPalVoice() 
    : pausePalVoice(); 
      
  },[ttsEnabled]);

  useEffect(() => {


    async function getFirstMessageFromPal () {

      try {
        //pause pal's previous voice audio if playing atm.
        pausePalVoice()

        //check if no messages has been sent or received and user has selected a language
        //then get first message from gpt using prompt and add to messages state
        if (messages.length < 1 && selectedLanguageData) { 
          setPalMessageIsLoading(true);

          const selectedLanguageName = selectedLanguageData.languageName;

          const selectedVoiceGender = selectedLanguageData.ssmlGender

          const prompt = getGPTPrompt(selectedLanguageName, cefrLevel, selectedVoiceGender)

          const palMsg = await getGPTMsg({ messages, input: prompt })

          if(conversation_id.current === c_id) {
            setMessages([
              { role: "user", content: prompt },
              { role: "assistant", content: palMsg },
            ]);

          }
          setPalMessageIsLoading(false);
        }

      } catch (error) {
        console.error('Error getting first message from Pal' , error)
        setPalMessageIsLoading(false);
      } 
        
    }
    getFirstMessageFromPal();
  
  }, [selectedLanguageData, cefrLevel]);

  

  useEffect(() => {
    //sends last user input message to TTS api, receives audio in base64 string format then plays the audio

    async function getTTSFromPalMessage () {

      try {
      
        resetPalVoiceData();
        
        const lastMsg = messages[messages.length - 1];
        //check if messages exist, if last message was from pal (gpt), and user has TTS enabled
        //then get TTS from last msg from pal and play audio

        if (
          selectedLanguageData 
          && messages.length > 0 
          && lastMsg.role === "assistant"
          && ttsEnabled
        ) {

          setUserVoiceError(false);

          const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode);

          const selectedVoice = selectedLanguageData.voiceName;

          const ttsBase64 = await getTextToSpeech({
            input: {
              text: lastMsg.content,
            },
            voice: {
              languageCode: selectedLanguageCode,
              name: selectedVoice,
            },
          });

          if(ttsBase64 && conversation_id.current === c_id) {

            const palVoiceAudio = new Audio(ttsBase64);

            setPalVoiceData({
              element: palVoiceAudio,
              messageIndex: messages.length - 1
            });
            
          }


        }

      } catch (error) {
        console.error('Error getting text-to-speech from Pal', error);
      }

    }
    getTTSFromPalMessage();
    
  }, [messages, selectedLanguageData, ttsEnabled, resetPalVoiceData]);


  useEffect(() => {

    async function getUserSTTAndSendToOpenAI () {
      //lol
      try {
      
        if (!userVoiceBase64 || !selectedLanguageData) return

        setUserVoiceError(false)
        setUserMessageIsLoading(true);

        const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode)

        // gets transcript from user's voice recording
        const userSTT = await getSpeechToText({
          base64: userVoiceBase64,
          languageCode: selectedLanguageCode,
          sampleRate: 48000,
        });
        
        const transcript = userSTT?.results?.[0]?.alternatives?.[0]?.transcript;
        
        if(!userSTT || !transcript) {
          setUserMessageIsLoading(false);
          return setUserVoiceError(true);
        } 

        setMessages([...messages, { role: "user", content: transcript }]);

        setUserMessageIsLoading(false);

        setPalMessageIsLoading(true);
        
        const palResponse = await getGPTMsg({ messages, input : transcript });

        if(conversation_id.current === c_id) {
          setMessages((messages) => [
            ...messages,
            { role: "assistant", content: palResponse },
          ]);
        }
        setPalMessageIsLoading(false);

      } catch (error) {
        console.error('')
        setUserMessageIsLoading(false);
        setPalMessageIsLoading(false);
        
      }
        
    }

    getUserSTTAndSendToOpenAI();
    
  }, [userVoiceBase64]);
  

  const handleMessageSend = async () => {
    //sends user message to open ai to get response from ai assistant.

    try {
        
      setPalMessageIsLoading(true);

      let userInput = input;

      if (messages.length < 1) userInput = prompt + input;
      
      setMessages([...messages, { role: "user", content: userInput }]);

      setInput("");

      const msg = await getGPTMsg({ messages, input });

      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: msg },
      ]);

      setPalMessageIsLoading(false);

    } catch (error) {
      console.error('Error getting response to message from Pal', error);

      setPalMessageIsLoading(false);    
      
    }
    
  };

  const resetState = () => {
    setInput("")
    setMessages([])
    setUserMessageIsLoading(false)
    setPalMessageIsLoading(false)
    setSelectedLanguageData(null)
    setCefrLevel("C2")
    setTtsEnabled(true)
    setUserVoiceBase64("")
    setUserVoiceError(false)
    setPalVoiceData({
      element: null,
      messageIndex: -1
    })

  }

  return (

    <>
    
    <div className="relative flex w-full pt-2 md:pt-4 md:pb-4 max-w-7xl">
      
      <Sidebar className="flex-col hidden md:flex" 
      resetState={resetState}/>

      <div className={`fixed flex md:hidden ${showMobileSideBar ? 'left-0' : '-left-full'} w-full z-50 top-0 transition-all duration-500  max-w-sm`} >
        <Sidebar className={` flex-col min-h-screen-d  bg-background max-h-screen`} 
        resetState={resetState}
        setShowMobileSideBar={setShowMobileSideBar}
        />
        <div className="top-0 right-0 z-50 text-2xl text-black" onClick={()=> setShowMobileSideBar(false)}>
          <Icon className={`pt-1 text-white  `}  path={mdiAlphaXBoxOutline} size={2} />
        </div>
      </div>
      {
      showMobileSideBar &&
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-opacity-50 md:hidden bg-stone-700 backdrop-blur-sm" onClick={()=> setShowMobileSideBar(false)} >
      </div>
      }
      
      <div className="relative flex flex-col flex-grow w-full h-full gap-4 p-0 md:pl-2">
        <TalkSetupOptions
          className="flex flex-col gap-2 p-2 bg-background h-fit top-20 "
          c_id={c_id}
          selectedLanguageData={selectedLanguageData}
          setSelectedLanguageData={setSelectedLanguageData}
          languageOptions={languageOptions}
          cefrLevel={cefrLevel}
          setCefrLevel={setCefrLevel}
          setMessages={setMessages}
          ttsEnabled={ttsEnabled}
          setTtsEnabled={setTtsEnabled}
          messages={messages}
          palVoiceData={palVoiceData}
          setPalVoiceData={setPalVoiceData}
        />

        <TalkMessages 
          selectedLanguageData={selectedLanguageData}
          messages={messages}
          palMessageIsLoading={palMessageIsLoading} 
          ttsEnabled={ttsEnabled}
          userMessageIsLoading={userMessageIsLoading}
          palVoiceData={palVoiceData}
          setPalVoiceData={setPalVoiceData}
          userVoiceError={userVoiceError}
          setUserVoiceError={setUserVoiceError}
        />

        <TalkMessageInput
          palMessageIsLoading={palMessageIsLoading}
          input={input}
          setInput={setInput}
          handleMessageSend={handleMessageSend}
          setUserVoiceBase64={setUserVoiceBase64}
          ttsEnabled={ttsEnabled}
          selectedLanguageData={selectedLanguageData}
        />

        


      </div>
    </div>
    
    </>
  );
}
