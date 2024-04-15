import { mdiSendOutline } from "@mdi/js";
import {useEffect, useRef, useState } from "react";

import Icon from "@mdi/react";
import { mdiMicrophone } from "@mdi/js";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { useTheme } from "@/components/themeProvider/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { LanguageData } from "../types/types";
import { blobToBase64 } from "../../../utils/getBase64FromBlob";

interface VoiceAndTextInputProps {
  className?: string,
  languageData: LanguageData | null;
  inputState: {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
  }
  // setUserVoiceBase64: React.Dispatch<React.SetStateAction<string>>;
  submitUserInput: ()=> void
};

export const VoiceAndTextInput = ({
  className,
  languageData,
  inputState,
  // setUserVoiceBase64,
  submitUserInput
}: VoiceAndTextInputProps) => {
  
  const { theme } = useTheme()
  const [recording, setRecording] = useState<boolean>(false);
  const [voiceBase64, setVoiceBase64] = useState<string | null>(null);

  const { input, setInput } = inputState;
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const recordingStopped = useRef(false);
  const { toast } = useToast()

  const startVoiceRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    let mimeType = "audio/webm; codecs=opus";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "audio/webm";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.error("MIME type not supported");
        return;
      }
    }

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: mimeType,
    });

    const audioChunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      };
    };

    mediaRecorderRef.current.onstart = () => {
      setTimeout(() => {
        if(mediaRecorderRef.current) {
          stopVoiceRecord()      
          toast({
            title: "Voice Record Length Limit Exceeded",
            description: "Please keep each voice recording under 25 seconds as Polyglot Pal is still in beta.",
            
          });
        };
        
      }, 24000); // 60 seconds

      
    };
    mediaRecorderRef.current.onstop = () => {
      if (
        mediaRecorderRef.current
      ) {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        // set voiceBase64 to base64
        blobToBase64(audioBlob, setVoiceBase64);
        mediaRecorderRef.current = null;
      }
      
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopVoiceRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  // useEffect(() => {
  //   if (voiceBase64) setUserVoiceBase64(voiceBase64);
  // }, [voiceBase64]);

  return (
    <div className={`${className} flex w-full max-w-7xl p-2`}>
      <form
        aria-label="form"
        className="flex w-full h-full gap-2 "
        onSubmit={(e) => {
          e.preventDefault();
          submitUserInput();
        }}
      > 
        <div className={`relative flex items-center w-full border border-border rounded-lg bg-background gap-1 p-1`}>
          {
          !languageData &&
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-white rounded-lg dark:bg-zinc-500 bg-opacity-70 dark:bg-opacity-30 group">
            <span 
            className="absolute right-0 hidden p-4 mb-2 text-sm bg-white border rounded-lg dark:bg-foreground text-primary border-border bottom-full group-hover:flex"
            >Please select a language</span>
          </div>
          }
          <input
            className={` w-full h-full bg-foreground outline-none text-primary rounded-lg p-2`}
            type="text"
            value={input}
            placeholder="Say hi to your pal ..."
            minLength={2}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center justify-center w-40 h-full border rounded-lg border-border">
            {
            mediaRecorderRef && mediaRecorderRef.current && recording &&
            <LiveAudioVisualizer
              data-testid="live-audio-visualizer"
              mediaRecorder={mediaRecorderRef.current}
              width={80}
              height={30}
              backgroundColor="rgba(0,0,0,0)"
              barColor={`${theme === 'dark' ? '#FFFFFF' : '#000000'}`}
            />
            
            }
            
          </div>
          <div className="flex items-center justify-center w-10 gap-2 p-2 border rounded-lg border-border">
            {
            recording ?
            <button data-testid="stop-voice-record" type="button" onClick={stopVoiceRecord}>
              <Icon className="text-red-600" path={mdiMicrophone} size={1} />
            </button>
            :
            <button data-testid="start-voice-record" type="button" onClick={startVoiceRecord}>
              <Icon className="text-primary" path={mdiMicrophone} size={1} />
            </button>
            }

            {voiceBase64 && <input hidden readOnly value={voiceBase64} />}
          </div>
          
          <button
            className="flex items-center justify-center w-10 p-2 border rounded-lg border-border"
            type="submit"
          >
            <Icon className="text-primary" path={mdiSendOutline} size={1} />
          </button>
          
        </div>
      </form>
    </div>
  );
}
