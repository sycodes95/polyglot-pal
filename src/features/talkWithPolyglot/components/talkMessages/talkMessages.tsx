import { ThreeDots } from "react-loader-spinner"
import { LanguageOption, Message } from "../../types"
import { useEffect, useRef, useState } from "react";
import { mdiReplay, mdiTranslate, mdiCloseCircleOutline, mdiEarth, mdiAlphaXCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import OvalSpinnerBlackGray from "../../../../components/loadSpinners/ ovalSpinnerBlackGray";
import { combineLangAndCountryCode } from "../../../../utils/combineLangAndCountryCode";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuth0 } from "@auth0/auth0-react";
import { PalVoiceElementData } from "../../../../pages/talkWithPolyglot";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

type TalkMessagesProps = {
  className?: string,
  messages: Message[], 
  palMessageIsLoading: boolean,
  selectedLanguageData: LanguageOption | null,
  ttsEnabled: boolean,
  userMessageIsLoading: boolean,
  palVoiceElement: PalVoiceElementData,
  setPalVoiceElement: React.Dispatch<React.SetStateAction<PalVoiceElementData>>,
  userVoiceError: boolean
  setUserVoiceError: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TalkMessages ({
  className, 
  messages, 
  palMessageIsLoading, 
  selectedLanguageData, 
  ttsEnabled,
  userMessageIsLoading,
  palVoiceElement,
  setPalVoiceElement,
  userVoiceError,
  setUserVoiceError
} : TalkMessagesProps) {

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

  useEffect(()=> {
    console.log(palVoiceElement?.messageIndex);
  },[palIsSpeaking, palVoiceElement])

  useEffect(() => {
    if (palVoiceElement?.element) {

      const handleAudioPlaying = () => {
        console.log('playing');
        setPalIsSpeaking(true)

      };

      const handleAudioEnd = () => {
        console.log('ended');

        setPalIsSpeaking(false)

      };
      palVoiceElement.element.addEventListener('playing', handleAudioPlaying);
      
      palVoiceElement.element.addEventListener('ended', handleAudioEnd);

      return () => {
        if (palVoiceElement?.element) {
          palVoiceElement.element.removeEventListener('ended', handleAudioEnd);
          palVoiceElement.element.removeEventListener('playing', handleAudioPlaying);

        }
      };
    }
  }, [palVoiceElement]);

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setTranslationData({
      index: -1,
      trans: '',
      isLoading: false
    })

  }, [messages]);

  useEffect(()=> {

    if(palVoiceElement && ttsEnabled) {
      setPalVoiceReplayIndex(null)
    }
    
  },[palVoiceElement, ttsEnabled])

  const playPalVoiceReplay = async (palMessage: string, index: number) => {
    if(!selectedLanguageData) return
    setPalVoiceReplayIndex(index)

    const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode)

    const selectedVoice = selectedLanguageData.voiceName

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
      if (palVoiceElement && palVoiceElement?.element){
        const palVoiceAudio = new Audio(ttsBase64)

        setPalVoiceElement({
          element: palVoiceAudio,
          messageIndex: index
        })
        
        setPalVoiceReplayIndex(null)
      } 
    }
  }

  const handleTranslation = async (index: number, text: string) => {
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
        messages && messages.length < 1 &&
        <Icon className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-opacity-80 text-stone-300" path={mdiEarth} size={7} />
        }
        
        {
        messages.map((msg, index) => {
          if(index !== 0){
            return ( 
            <div className={`
            relative flex flex-col w-full
            ${msg.role === 'user' ? 'items-start' : 'items-end'}
            `}
            key={index}>
              <div className={`${msg.role === 'user' ? 'bg-emerald-100 dark:bg-black' : 'bg-orange-200 dark:bg-accent'} text-primary p-4 rounded-2xl max-w-66pct`}>
                {
                msg.role === 'user' 
                ?
                <span>You : </span>
                :
                <span>Pal : </span>
                }
                <span className="text-sm">{msg.content}</span>
              </div>
              {
              msg.role === 'assistant' &&
              <div className="right-0 flex items-center h-12 gap-2 p-2 text-black top-full rounded-2xl">
                <div className={`${palIsSpeaking && index === palVoiceElement?.messageIndex && 'text-emerald-500'} text-stone-400 transition-all duration-1000 flex items-center justify-center w-6 h-6`}>
                  <VolumeUpIcon  fontSize="medium"/>
                </div>
                
                <div className="flex items-center justify-center w-6 h-6">
                  {
                  palVoiceReplayIndex === index ?
                  <OvalSpinnerBlackGray />
                  :
                  <button 
                  className={`${!ttsEnabled && 'text-stone-400 pointer-events-none'} flex items-center h-full transition-all cursor-pointer hover:text-stone-400 text-primary`}
                  onClick={()=> playPalVoiceReplay(msg.content, index)}
                  >
                    <Icon 
                    className="" 
                    path={mdiReplay} 
                    size={1} 
                    />
                  </button>
                  }
                </div>
                <div className="flex items-center justify-center w-6 h-6">
                  {
                  translationData.index === index && translationData.isLoading ?
                  <OvalSpinnerBlackGray />
                  :
                  <button 
                  className="flex items-center h-full transition-all cursor-pointer hover:text-stone-400 text-primary"
                  onClick={()=> handleTranslation(index, msg.content)}
                  >
                    <Icon path={mdiTranslate} size={1} />
                  </button>
                  }
                </div>
              </div>
              }
              {
              translationData.index === index && !translationData.isLoading && translationData.trans &&
              <div className="relative flex flex-col p-4 text-sm bg-emerald-100 rounded-2xl max-w-66pct text-primary">
                <span>{translationData.trans}</span>
                <button className="absolute flex items-center justify-center text-black rounded-full -right-2 -bottom-3" onClick={()=> setTranslationData({
                  index: -1,
                  trans: '',
                  isLoading: false
                })}>
                  <Icon className="w-full h-full rounded-full" path={mdiCloseCircleOutline} size={1} />
                </button>
              </div>
              }
            </div>
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
          color="#000000" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
        </div>
        }

        {
        userVoiceError && 
        <div className="relative flex items-center justify-center p-2 border rounded-lg border-destructive text-destructive">
          Error: if you are using speech to text please check that your microphone is working or that you are speaking loud enough.
          <button className="absolute w-5 h-5 rounded-full -top-2 -right-1 text-destructive" onClick={()=> setUserVoiceError(false)}>
            <Icon className="bg-background" path={mdiAlphaXCircleOutline} size={1} />
          </button>

        </div>
        }
        <div className="" ref={messagesEndRef}></div>
    </div>
  )
}