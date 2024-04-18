import { useEffect, useRef, useState } from "react";

interface UseTtsProps {
  ttsBase64: string;
}

const defaultIsError = false;
const defaultAudio = null;


export const useTts = ({ ttsBase64 } : UseTtsProps) => {
  const [ttsBase64IsEmpty, setTtsBase64IsEmpty] = useState(false);
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement | null>(null);

  // const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

  const resetUseTts = () => {
    setTtsBase64IsEmpty(defaultIsError);
    setTtsAudio(defaultAudio);
  };

  useEffect(() => {
    if(!ttsBase64) {
      setTtsBase64IsEmpty(true);
    } else {
      const audio = new Audio(ttsBase64);
      setTtsAudio(audio)
    }

  },[ttsBase64]);

  useEffect(() => {
    if(ttsAudio) {
      ttsAudio.play();
    }
  },[ttsAudio])

  return {
    ttsBase64IsEmpty,
    ttsAudio,
    resetUseTts
  };

};