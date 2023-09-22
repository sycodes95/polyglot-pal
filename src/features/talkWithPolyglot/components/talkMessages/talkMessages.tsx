import { ThreeDots } from "react-loader-spinner"
import { LanguageOption, Message } from "../../types"
import { useEffect, useRef, useState } from "react";
import { mdiReplay, mdiTranslate, mdiCloseCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import OvalSpinnerBlackGray from "../../../../components/loadSpinners/ ovalSpinnerBlackGray";
import { combineLangAndCountryCode } from "../../../../utils/combineLangAndCountryCode";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { useAuth0 } from "@auth0/auth0-react";

type TalkMessagesProps = {
  className?: string,
  messages: Message[], 
  palMessageIsLoading: boolean,
  selectedLanguageData: LanguageOption | null,
  ttsEnabled: boolean,
  userMessageIsLoading: boolean,
  palVoiceElement: React.RefObject<HTMLAudioElement> | null,
  palAudioBlob: Blob | null,
  setPalAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>
}

export default function TalkMessages ({
  className, 
  messages, 
  palMessageIsLoading, 
  selectedLanguageData, 
  ttsEnabled,
  userMessageIsLoading,
  palVoiceElement,
  palAudioBlob,
  setPalAudioBlob
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
      if (palVoiceElement && palVoiceElement.current){
        palVoiceElement.current.src = '';
        // const palVoiceAudio = new Audio(ttsBase64);
        palVoiceElement.current.src = ttsBase64;
        palVoiceElement.current.play()
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
    <div className={`${className} flex flex-grow flex-col h-1 w-full gap-8 overflow-y-auto rounded-2xl
      p-2`} >
        {
        messages.map((msg, index) => {
          if(index !== 0){
            return ( 
            <div className={`
            relative flex flex-col w-full
            ${msg.role === 'user' ? 'items-start' : 'items-end'}
            `}
            key={index}>
              <div className={`${msg.role === 'user' ? 'bg-stone-300' : 'bg-orange-200'} p-4 rounded-2xl max-w-66pct`}>
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
                
                <div className="flex items-center justify-center w-6 h-6">
                  {
                  palVoiceReplayIndex === index ?
                  <OvalSpinnerBlackGray />
                  :
                  <button 
                  className={`${!ttsEnabled && 'text-stone-400 pointer-events-none'} flex items-center h-full transition-all cursor-pointer hover:text-stone-400`}
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
                  className="flex items-center h-full transition-all cursor-pointer hover:text-stone-400"
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
              <div className="relative flex flex-col p-4 text-sm bg-emerald-100 rounded-2xl max-w-66pct">
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
        <div className={`flex ${palMessageIsLoading ? 'justify-end' : 'justify-start'}  w-full`}>
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
        <div className="" ref={messagesEndRef}></div>
    </div>
  )
}