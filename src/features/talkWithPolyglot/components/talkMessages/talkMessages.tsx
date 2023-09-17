import { ThreeDots } from "react-loader-spinner"
import { LanguageOption, Message } from "../../types"
import { useEffect, useRef, useState } from "react";
import { mdiReplay, mdiTranslate, mdiCloseCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import OvalSpinnerBlackGray from "../../../../components/loadSpinners/ ovalSpinnerBlackGray";
import { combineLangAndCountryCode } from "../../../../utils/combineLangAndCountryCode";
import { useAction } from "convex/react";
import { api } from "../../../../../convex/_generated/api";


type TalkMessagesProps = {
  className?: string,
  messages: Message[], 
  messageIsLoading: boolean,
  selectedLanguageData: LanguageOption | null,
  palVoiceAudioElement: HTMLAudioElement | null

}

export default function TalkMessages ({
  className, 
  messages, 
  messageIsLoading, 
  selectedLanguageData, 
  palVoiceAudioElement
} : TalkMessagesProps) {

  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech);
  const getDetectedLanguage = useAction(api.actions.getDetectedLanguage.getDetectedLanguage)
  const getTranslation = useAction(api.actions.getTranslation.getTranslation)

  const [palVoiceReplayElement, setPalVoiceReplayElement] = useState<HTMLAudioElement | null> (null)
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
  }, [messages]);

  useEffect(()=> {
    if(palVoiceReplayElement) {
      setPalVoiceReplayIndex(null)
      palVoiceAudioElement?.pause()
      palVoiceReplayElement.play()
    }
  },[palVoiceReplayElement])

  useEffect(()=> {
     console.log(translationData);
  },[translationData])

  useEffect(()=> {
    if(palVoiceAudioElement && palVoiceReplayElement) palVoiceReplayElement.pause()
  },[palVoiceAudioElement])

  useEffect(()=> {
    console.log(selectedLanguageData);
  },[selectedLanguageData])



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
      if (palVoiceReplayElement) palVoiceReplayElement.pause();
      const palVoiceAudio = new Audio(ttsBase64);
      setPalVoiceReplayElement(palVoiceAudio);
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

    
    const translation = await getTranslation({text, targetLanguage: 'es'})
    console.log(translation);
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
                {
                palVoiceReplayIndex === index ?
                <OvalSpinnerBlackGray />
                :
                <button 
                className="flex items-center h-full transition-all cursor-pointer hover:text-stone-400"
                onClick={()=> playPalVoiceReplay(msg.content, index)}
                >
                  <Icon 
                  className="" 
                  path={mdiReplay} 
                  size={1} 
                  />
                </button>
                }

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
              }
              {
              translationData.index === index && !translationData.isLoading && translationData.trans &&
              <div className="relative flex flex-col p-4 text-sm bg-emerald-200 rounded-2xl max-w-66pct">
                <span>{translationData.trans}</span>
                <button className="absolute right-0 flex items-center justify-center text-red-600 rounded-full -bottom-4" onClick={()=> setTranslationData({
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
        messageIsLoading &&
        <div className="flex justify-end w-full">
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