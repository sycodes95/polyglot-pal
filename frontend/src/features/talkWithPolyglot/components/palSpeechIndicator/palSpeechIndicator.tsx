import { forwardRef, useEffect, useState } from "react"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

type PalSpeechIndicatorProps = {
  palVoiceElement: HTMLAudioElement | null
}

export default function PalSpeechIndicator ({ palVoiceElement } : PalSpeechIndicatorProps) {

  const [palIsSpeaking, setPalIsSpeaking] = useState(false)

  useEffect(() => {
    if (palVoiceElement) {
      setPalIsSpeaking(true)

      const handleAudioEnd = () => {
        setPalIsSpeaking(false)

      };

      palVoiceElement.addEventListener('ended', handleAudioEnd);

      return () => {
        if (palVoiceElement) {
          palVoiceElement.removeEventListener('ended', handleAudioEnd);
        }
      };
    }
  }, [palVoiceElement]);

  return (
    <div className="absolute bottom-0 right-0 w-full h-full">
      <VolumeUpIcon className={`${palIsSpeaking ? 'text-green-300' : 'text-stone-400'}`} fontSize="large"/>
    </div>
  )
}