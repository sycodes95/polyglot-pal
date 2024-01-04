import { useCallback, useEffect, useRef, useState } from "react";
import {
  LanguageOption,
  MessageData,
} from "../features/talkWithPolyglot/types";
import { useAction, useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import TalkMessageInput from "../features/talkWithPolyglot/components/talkMessageInput/talkMessageInput";
import TalkMessages from "../features/talkWithPolyglot/components/talkMessages/talkMessages";
import TalkSetupOptions from "../features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions";
import { getGPTPrompt } from "../features/talkWithPolyglot/services/getGPTPrompt";
import { combineLangAndCountryCode } from "../utils/combineLangAndCountryCode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { Id } from "convex/dist/cjs-types/values/value";

import Icon from '@mdi/react';
import { mdiAlphaXBoxOutline } from '@mdi/js';
import useLanguageOptions from "../features/talkWithPolyglot/hooks/useLanguageOptions";

type Params = {
  c_id: Id<'conversation'>,
}

export type TalkWithPolyGlotProps = {
  showMobileSideBar: boolean,
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

export type PalVoiceData = {
  element: HTMLAudioElement | null;
  messageIndex: number;
  isLoading: boolean;
}

export type Conversation = {
  messages: MessageData[] | [];
  selectedLanguageData: LanguageOption | null;
  cefrLevel: string;
  ttsEnabled: boolean;
}

export default function TalkWithPolyGlot({ showMobileSideBar, setShowMobileSideBar} : TalkWithPolyGlotProps) {

  const location = useLocation()

  const navigate = useNavigate()

  const { user } = useAuth0();

  const { c_id } = useParams<Params>()
  
  const conversation_id = useRef(null) 

  const getGPTMsg = useAction(api.actions.getGPTMessageResponse.getGPTMessageResponseConvex);
    
  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech);
  
  const getSpeechToText = useAction(api.actions.getSpeechToText.getSpeechToText);

  const mutateConversation = useMutation(api.mutation.mutateConversation.mutateConversation);
 
  const { languageOptions } = useLanguageOptions()

  const [input, setInput] = useState("");

  const [conversation, setConversation] = useState<Conversation>({
    messages: [],
    selectedLanguageData: null,
    cefrLevel: 'C2',
    ttsEnabled: true
  })

  //Gonna put all these states into one state, since I am saving it all in one table in the db, better consistency and better readability IMO
  const [userMessageIsLoading, setUserMessageIsLoading] = useState(false)
  const [palMessageIsLoading, setPalMessageIsLoading] = useState(false);

  const [userVoiceBase64, setUserVoiceBase64] = useState("");
  const [userVoiceError, setUserVoiceError] = useState(false)

  const [palVoiceData, setPalVoiceData] = useState<PalVoiceData>({
    element: null,
    messageIndex: -1,
    isLoading: false
  });  

  const [initialConvoLoaded, setInitialConvoLoaded] = useState(false)

  const getConversation = useQuery(api.query.getConversation.getConversation, 
    !initialConvoLoaded 
    ? { id: c_id, sub: (user && user.sub) ? user.sub : '' }
    : "skip"
  )

  //useQuery does not update when data is mutated, only gets the data once when c_id changes.
  

  const pausePalVoice = useCallback(() => {
    palVoiceData.element?.pause()
  },[palVoiceData.element])

  const playPalVoice = useCallback(() => {
    palVoiceData.element?.play()
  },[palVoiceData.element])

  const resetPalVoiceData = useCallback(() => {
    setPalVoiceData({
      element: null,
      messageIndex: -1,
      isLoading: false
    });
  },[setPalVoiceData]);
  
  useEffect(()=> {

    conversation_id.current = c_id
    setPalMessageIsLoading(false)
    resetPalVoiceData()
    setInitialConvoLoaded(false)
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
        pausePalVoice()

        setConversation({
          messages: convo.messages,
          selectedLanguageData: convo.selectedLanguageData,
          cefrLevel: convo.cefrLevel,
          ttsEnabled: convo.ttsEnabled
        })

        setInitialConvoLoaded(true)
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
    if(palVoiceData.element && conversation.ttsEnabled) {
      palVoiceData.element.volume = 1
    } else if (palVoiceData.element && !conversation.ttsEnabled) {
      palVoiceData.element.volume = 0
    }
      
  },[conversation.ttsEnabled]);

  useEffect(() => {

    async function getFirstMessageFromPal () {

      try {
        //pause pal's previous voice audio if playing atm.
        palVoiceData.element?.pause()
        //check if no messages has been sent or received and user has selected a language
        //then get first message from gpt using prompt and add to messages state
        if (conversation.messages.length < 1 && conversation.selectedLanguageData) { 

          setPalMessageIsLoading(true);
          
          const selectedLanguageName = conversation.selectedLanguageData.languageName;
          const selectedVoiceGender = conversation.selectedLanguageData.ssmlGender;
          const selectedCefrLevel = conversation.cefrLevel

          const prompt = getGPTPrompt(selectedLanguageName, selectedCefrLevel, selectedVoiceGender)

          const messages = conversation.messages

          const palMsg = await getGPTMsg({ messages, input: prompt })

          if(conversation_id.current === c_id) {
            setPalMessageIsLoading(false);
            setConversation({
              ...conversation,
              messages: [
                { role: "user", content: prompt },
                { role: "assistant", content: palMsg },
              ]
            });

          }
          
        }

      } catch (error) {
        console.error('Error getting first message from Pal' , error)
        setPalMessageIsLoading(false);
      } 
        
    }


    getFirstMessageFromPal();
  
  }, [conversation.selectedLanguageData, conversation.cefrLevel]);

  useEffect(() => {
    
    async function getTTSFromPalMessage() {
      
      try {

        pausePalVoice()
        
        // Check if TTS is enabled and there are any messages
        if (conversation.messages.length === 0 || conversation.selectedLanguageData === null) return;

        // Check if the last message is from Pal
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (lastMessage.role !== "assistant") return;

        // resetPalVoiceData();
        const { languageCode, countryCode, voiceName } = conversation.selectedLanguageData;
        const combinedLanguageCode = combineLangAndCountryCode(languageCode, countryCode);
        setPalVoiceData((prev) => ({ ...prev, messageIndex: conversation.messages.length - 1, isLoading: true }));

        // Get text-to-speech from Pal's last message
        const ttsBase64 = await getTextToSpeech({
          input: { text: lastMessage.content },
          voice: { languageCode: combinedLanguageCode, name: voiceName },
        });

        // Check if conversation ID matches and TTS data is available
        if (!ttsBase64 || conversation_id.current !== c_id) return;
        
        // Create and set Pal voice data
        const palVoiceAudio = new Audio(ttsBase64);
        setPalVoiceData((prev) => {
          return {
            ...prev,
            element: palVoiceAudio, 
            isLoading: false
          } 
          
        });

      } catch (error) {
        console.error("Error getting text-to-speech from Pal", error);
      }
    }

    getTTSFromPalMessage()
    
  }, [conversation.messages]);

  useEffect(() => {
    handleConvoSave()
  },[conversation.messages])

  useEffect(() => {

    async function getUserSTTAndSendToOpenAI () {
      
      try {
      
        if (!userVoiceBase64 || !conversation.selectedLanguageData) return

        setUserVoiceError(false)
        setUserMessageIsLoading(true);

        const selectedLanguageCode = combineLangAndCountryCode(conversation.selectedLanguageData?.languageCode, conversation.selectedLanguageData?.countryCode)

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

        setConversation((prev) => {
          return {
            ...conversation,
            messages: [...prev.messages, { role: "user", content: transcript }]
          }
        })

        setUserMessageIsLoading(false);

        setPalMessageIsLoading(true);
        
        const messages = conversation.messages

        const palResponse = await getGPTMsg({ messages, input : transcript });

        if(conversation_id.current === c_id) {
          //if user hasn't switched to a different conversation while this function was fetching data, then proceed and set messages

          setConversation((prev) => {
            return {
              ...prev,
              messages: [...prev.messages, { role: "assistant", content: palResponse }]
            }
          })
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

  const handleConvoSave = useCallback(async () => {

    try {
    
      if(!user || !user.sub || !conversation.selectedLanguageData) return
      const args = {
        messages: conversation.messages,
        sub: user.sub,
        selectedLanguageData: conversation.selectedLanguageData,
        cefrLevel: conversation.cefrLevel,   
        ttsEnabled: conversation.ttsEnabled 
      } 
      if(c_id) {
        //if convo exists add id to args object
        args.id = c_id
      }
      const convoId = await mutateConversation(args);
      const updatedURL = `/c/${convoId}`
      if((location.state !== updatedURL) && convoId){
        navigate(`/c/${convoId}`)
      }
    } catch (error) {
      console.error('error saving convo', error)
    }
    
  },[c_id, conversation.cefrLevel, location.state, conversation.messages, mutateConversation, navigate, conversation.selectedLanguageData, conversation.ttsEnabled, user])

  const handleMessageSend = async () => {
    //sends user message to open ai to get response from ai assistant.

    try {
        
      setPalMessageIsLoading(true);

      let userInput = input;

      if (conversation.messages.length < 1) userInput = prompt + input;

      setConversation((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, { role: "user", content: userInput }]
        }
      })

      setInput("");

      const messages = conversation.messages
      const msg = await getGPTMsg({ messages, input });

      setConversation((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, { role: "assistant", content: msg }]
        }
      })

      setPalMessageIsLoading(false);

    } catch (error) {
      console.error('Error getting response to message from Pal', error);

      setPalMessageIsLoading(false);    
      
    }
    
  }; 

  const resetState = () => {
    setInput("")
    setUserMessageIsLoading(false)
    setPalMessageIsLoading(false)

    setConversation({
      messages: [],
      selectedLanguageData: null,
      cefrLevel: 'C2',
      ttsEnabled: true
    })
    setUserVoiceBase64("")
    setUserVoiceError(false)
    setPalVoiceData({
      element: null, 
      messageIndex: -1,
      isLoading: false
    })

  }     

  return (

    <>
    <div className="relative flex w-full pt-2 md:pt-4 md:pb-4 max-w-7xl">
      
      <Sidebar className="flex-col hidden md:flex" 
      resetState={resetState}
      pausePalVoice={pausePalVoice}
      />

      <div className={`fixed flex md:hidden ${showMobileSideBar ? 'left-0' : '-left-full'} w-full z-50 top-0 transition-all duration-500  max-w-sm`} >
        <Sidebar className={` flex-col min-h-screen-d  bg-background max-h-screen`} 
        resetState={resetState}
        setShowMobileSideBar={setShowMobileSideBar}
        pausePalVoice={pausePalVoice}
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
          languageOptions={languageOptions}
          conversationContext={{ conversation, setConversation }}
          palVoiceDataContext={{ palVoiceData, setPalVoiceData }}
        />

        <TalkMessages 
          conversationContext={{ conversation, setConversation }}
          palVoiceDataContext={{ palVoiceData, setPalVoiceData }}
          palMessageIsLoading={palMessageIsLoading} 
          userMessageIsLoading={userMessageIsLoading}
          userVoiceError={userVoiceError}
          setUserVoiceError={setUserVoiceError}
          pausePalVoice={pausePalVoice}
        />

        <TalkMessageInput
          palMessageIsLoading={palMessageIsLoading}
          input={input}
          setInput={setInput}
          handleMessageSend={handleMessageSend}
          setUserVoiceBase64={setUserVoiceBase64}
          ttsEnabled={conversation.ttsEnabled}
          selectedLanguageData={conversation.selectedLanguageData}
        />

      </div>
    </div>
    
    </>
  );
}
