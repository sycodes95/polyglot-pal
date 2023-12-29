import OvalSpinnerBlackGray from "@/components/loadSpinners/ ovalSpinnerBlackGray";
import { MessageData } from "../../../types"
import Icon from "@mdi/react";
import { mdiReplay, mdiTranslate, mdiCloseCircleOutline} from "@mdi/js";
import { TranslationData } from "../talkMessages";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { PalVoiceData } from "../../../../../pages/talkWithPolyglot";

type MessageProps = {
  msg: MessageData;
  index: number;
  playPalVoiceReplay: (msg : string, index : number)=> void;
  handleTranslation: (msg : string, index : number)=> void;
  palVoiceReplayIndex: number | null;
  translationData: TranslationData;
  setTranslationData: React.Dispatch<React.SetStateAction<TranslationData>>;
  ttsEnabled: boolean;
  palIsSpeaking: boolean;
  palVoiceData: PalVoiceData;
}

export default function Message ({ 
  msg, 
  index, 
  playPalVoiceReplay, 
  handleTranslation,
  palVoiceReplayIndex,
  translationData,
  setTranslationData,
  ttsEnabled,
  palIsSpeaking,
  palVoiceData
} : MessageProps ) {

  return (
    <div className={`
    relative flex flex-col w-full
    ${msg.role === 'user' ? 'items-start' : 'items-end'}
    `}
    key={index}>
      <div className={`${msg.role === 'user' ? 'bg-red-300 text-primary dark:text-black dark:bg-red-300 ' : 'text-white dark:text-black bg-primary border border-border'} p-4 rounded-2xl max-w-66pct`}>
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
        <div className={`${palIsSpeaking && index === palVoiceData.messageIndex ? 'text-emerald-500' : 'text-stone-400' }  transition-all duration-1000 flex items-center justify-center w-6 h-6`}>
          
          <VolumeUpIcon  fontSize="medium"/>

        </div>
        
        <div className="flex items-center justify-center w-6 h-6">
          {
          palVoiceReplayIndex === index ||  ((palVoiceData.messageIndex === index || palVoiceData.messageIndex === -1) && palVoiceData.isLoading) ?
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
          onClick={()=> handleTranslation(msg.content, index )}
          >
            <Icon path={mdiTranslate} size={1} />
          </button>
          }
        </div>
      </div>
      }
      {
      translationData.index === index && !translationData.isLoading && translationData.trans &&
      <div className="relative flex flex-col p-4 text-sm border bg-translation rounded-2xl max-w-66pct text-primary border-translation-border">
        <span>{translationData.trans}</span>
        <button className="absolute flex items-center justify-center text-black rounded-full -right-2 -bottom-3" onClick={()=> setTranslationData({
          index: -1,
          trans: '',
          isLoading: false
        })}>
          <Icon className="w-full h-full rounded-full text-primary" path={mdiCloseCircleOutline} size={1} />
        </button>
      </div>
      }
    </div>
  )
}