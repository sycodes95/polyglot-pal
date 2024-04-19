import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Settings } from "../features/chat/types/types";
import { mdiTimerStarOutline } from "@mdi/js";
import { TtsData } from "./useConversation";


const defaultIsError = false;
const defaultAudio = null;

interface UseTtsProps {
  ttsData: TtsData;
  settings: Settings;
};

export const useTts = ({ 
  ttsData, 
  settings 
} : UseTtsProps) => {

  const { conversationId } = useParams();
  const [ttsDataIsEmpty, setTtsBase64IsEmpty] = useState(false);
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(settings.ttsEnabled);
  const [ttsMsgIndex, setTtsMsgIndex] = useState<number | null>(null);
  const [ttsIsPlaying, setTtsIsPlaying] = useState(false);

  const resetUseTts = () => {
    setTtsBase64IsEmpty(defaultIsError);
    setTtsAudio(defaultAudio);
    setTtsEnabled(true);
    setTtsMsgIndex(null);
  };

  useEffect(() => {
    if(!ttsData.base64) {
      setTtsBase64IsEmpty(true);
    } else if(ttsData.base64 && ttsData.messageIndex !== null){
      const audio = new Audio(ttsData.base64);
      setTtsAudio(audio)
      setTtsMsgIndex(ttsData.messageIndex);
    };

  },[ttsData]);

  useEffect(() => {
    if(settings) {
      setTtsEnabled(settings.ttsEnabled);
    };
  },[settings]);

  useEffect(() => {
    if(ttsAudio) {
      ttsAudio.play();
    }
  },[ttsAudio]);

  useEffect(()=> {
    const handlePlay = () => {
      setTtsIsPlaying(true);
    };

    const handlePause = () => {
      setTtsIsPlaying(false);
    };

    if (ttsAudio) {
      ttsAudio.addEventListener('play', handlePlay);
      ttsAudio.addEventListener('pause', handlePause);
    }

    return () => {
      if (ttsAudio) {
        ttsAudio.removeEventListener('play', handlePlay);
        ttsAudio.removeEventListener('pause', handlePause);
      }
    };
  },[ttsAudio])

 
  
  useEffect(() => {
    if(ttsAudio) {
      ttsAudio.pause();
      setTtsAudio(null);
    }
  },[conversationId]);

  return {
    ttsDataIsEmpty,
    ttsAudio,
    resetUseTts,
    ttsEnabled,
    ttsMsgIndex,
    ttsIsPlaying
  };

};