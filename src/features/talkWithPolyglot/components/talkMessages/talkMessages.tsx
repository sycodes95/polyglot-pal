import { ThreeDots } from "react-loader-spinner"
import { LanguageOption, MessageData } from "../../types"
import { useEffect, useRef, useState } from "react";
import { mdiAlphaXCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { combineLangAndCountryCode } from "../../../../utils/combineLangAndCountryCode";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Conversation, PalVoiceData } from "../../../../pages/talkWithPolyglot";
import { useTheme } from "@/components/themeProvider/theme-provider";
import Message from "./message/message";

type TalkMessagesProps = {
  className?: string,
  palMessageIsLoading: boolean,
  userMessageIsLoading: boolean,
  userVoiceError: boolean
  setUserVoiceError: React.Dispatch<React.SetStateAction<boolean>>,
  palVoiceDataContext: { palVoiceData : PalVoiceData, setPalVoiceData: React.Dispatch<React.SetStateAction<PalVoiceData>>},
  conversationContext: { conversation: Conversation, setConversation: React.Dispatch<React.SetStateAction<Conversation>>},
  pausePalVoice: ()=> void
}

export type TranslationData = {
  index: number; 
  trans: string;
  isLoading: boolean;
}

export default function TalkMessages ({
  className, 
  palMessageIsLoading, 
  userMessageIsLoading,
  userVoiceError,
  setUserVoiceError,
  pausePalVoice,
  palVoiceDataContext,
  conversationContext
} : TalkMessagesProps) {
  const { theme } = useTheme()
  const { user } = useAuth0();

  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech);

  const getTranslation = useAction(api.actions.getTranslation.getTranslation)

  const nativeLanguage = useQuery(api.query.getNativeLanguage.getNativeLanguage, { sub: user && user.sub ? user.sub : '' })

  const [palVoiceReplayIndex, setPalVoiceReplayIndex] = useState<number | null>(null)

  const [translationData, setTranslationData] = useState({
    index: -1,
    trans: '',
    isLoading: false
  })

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [palIsSpeaking, setPalIsSpeaking] = useState(false)

  const { conversation } = conversationContext;
  const { palVoiceData, setPalVoiceData } = palVoiceDataContext;


  useEffect(() => {
    if (palVoiceData?.element) {

      const handleAudioPlaying = () => setPalIsSpeaking(true);
      const handleAudioEnd = () => setPalIsSpeaking(false)
      
      palVoiceData.element.addEventListener('playing', handleAudioPlaying);
      palVoiceData.element.addEventListener('ended', handleAudioEnd);

      return () => {
        if (palVoiceData?.element) {
          palVoiceData.element.removeEventListener('ended', handleAudioEnd);
          palVoiceData.element.removeEventListener('playing', handleAudioPlaying);
        }
      };
    }
  }, [palVoiceData]);

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setTranslationData({
      index: -1,
      trans: '',
      isLoading: false
    })

  }, [conversation.messages]);

  useEffect(()=> {

    if(conversation.ttsEnabled) {
      setPalVoiceReplayIndex(null)
    }
    
  },[conversation.messages, conversation.ttsEnabled])

  const playPalVoiceReplay = async (palMessage: string, index: number) => {
    pausePalVoice()
    if(!conversation.selectedLanguageData) return
    setPalVoiceReplayIndex(index)

    setPalVoiceData((prev) => ({ ...prev, isLoading: true }));

    const selectedLanguageCode = combineLangAndCountryCode(conversation.selectedLanguageData?.languageCode, conversation.selectedLanguageData?.countryCode)

    const selectedVoice = conversation.selectedLanguageData.voiceName

    try {

      const ttsBase64 = await getTextToSpeech({
        input: {
          text: palMessage,
        },
        voice: {
          languageCode: selectedLanguageCode,
          name: selectedVoice,
        },
      });

      if(ttsBase64) {
        if (palVoiceData && palVoiceData?.element){

          const palVoiceAudio = new Audio(ttsBase64)
          
          setPalVoiceData({
            element: palVoiceAudio,
            messageIndex: index,
            isLoading: false
          })
          
          setPalVoiceReplayIndex(null)
        } 
      } else {

        setPalVoiceData((prev) => ({ ...prev, isLoading: false }));
        setPalVoiceReplayIndex(null)

      }

      
    } catch (error) {
      console.error('Error replaying pal voice', error)
      setPalVoiceData((prev) => ({ ...prev, isLoading: false }));

    }

    
  }

  const handleTranslation = async (text: string, index: number ) => {
    // const language = await getDetectedLanguage({ text: text})
    // if(!language) return 
    setTranslationData({
      ...translationData,
      index: index,
      isLoading: true
    })

    let targetLanguage = 'en'
    if(nativeLanguage && nativeLanguage[0] && nativeLanguage[0]._id) {
      targetLanguage = nativeLanguage[0].languageCode
    }
    const translation = await getTranslation({text, targetLanguage})
    if(!translation) return
    setTranslationData({
      index: index,
      trans: translation,
      isLoading: false
    })
  }

  return (
    <div className={`${className} relative flex flex-grow flex-col h-1 w-full gap-8 overflow-y-auto rounded-2xl
      p-2`} >
        {
        conversation.messages && conversation.messages.length < 1 &&
        <span className="absolute text-4xl font-bold text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-stone-300 font-display" > Select A Language To Get Started! </span>
        }
        
        {
        conversation.messages.map((msg, index) => {
          if(index !== 0){
            return ( 
            <Message
              key={index}
              msg={msg}
              index={index}
              playPalVoiceReplay={playPalVoiceReplay} 
              handleTranslation={handleTranslation}
              palVoiceReplayIndex={palVoiceReplayIndex}
              translationData={translationData}
              setTranslationData={setTranslationData}
              ttsEnabled={conversation.ttsEnabled}
              palIsSpeaking={palIsSpeaking}
              palVoiceData={palVoiceData}
            />
            
            )
          }
        })
        }
        {
        (palMessageIsLoading || userMessageIsLoading) &&
        <div className={`flex ${palMessageIsLoading ? 'justify-end' : 'justify-start'}  w-full p-2`}>
          <ThreeDots
          height="40" 
          width="40" 
          radius="9"
          color={ theme === 'dark' ? '#FFFFFF' : '#000000'}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
        </div>
        }

        {
        userVoiceError && 
        <div className="relative flex items-center justify-center p-2 border rounded-lg border-destructive text-destructive dark:text-red-300 dark:border-red-300">
          Error: if you are using speech to text please check that your microphone is working or that you are speaking loud enough.
          <button className="absolute w-5 h-5 rounded-full -top-2 -right-1 text-destructive dark:text-red-300" onClick={()=> setUserVoiceError(false)}>
            <Icon className="bg-background" path={mdiAlphaXCircleOutline} size={1} />
          </button>

        </div>
        }
        <div className="" ref={messagesEndRef}></div>
    </div>
  )
}