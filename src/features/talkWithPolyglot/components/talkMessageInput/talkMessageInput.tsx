import { mdiMicrophoneOff, mdiSendOutline } from "@mdi/js";
import {useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { blobToBase64 } from "../../../../utils/getBase64FromBlob";

import Icon from "@mdi/react";
import { mdiMicrophone } from "@mdi/js";
import { LanguageOption } from "../../types";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";

type TalkMessageInputProps = {
  className?: string,
  selectedLanguageData: LanguageOption | null;
  palMessageIsLoading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleMessageSend: () => void;
  setUserVoiceBase64: React.Dispatch<React.SetStateAction<string>>;
  ttsEnabled: boolean
};

export default function TalkMessageInput({
  className,
  selectedLanguageData,
  palMessageIsLoading,
  input,
  setInput,
  handleMessageSend,
  setUserVoiceBase64,
  ttsEnabled
}: TalkMessageInputProps) {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingStopped = useRef(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>()
  const visualizerRef = useRef<HTMLCanvasElement>(null)


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
      if (event.data) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }

      if (
        recordingStopped.current &&
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "recording"
      ) {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        blobToBase64(audioBlob, setAudioData);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      recordingStopped.current = true;
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopVoiceRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    recordingStopped.current = true;
    setRecording(false);
  };

  useEffect(() => {
  }, [audioData]);

  useEffect(() => {
    if (audioData) setUserVoiceBase64(audioData);
  }, [audioData]);

  return (
    <div className={`${className} flex w-full max-w-7xl p-2`}>
      <form
      aria-disabled
        className="flex w-full h-12 gap-2 "
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSend();
        }}
      > 
        <div className={`relative flex items-center w-full border border-border rounded-lg bg-accent`}>
          {
          !selectedLanguageData &&
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-opacity-70 bg-stone-300 group rounded-2xl">
            <span 
            className="absolute right-0 hidden p-2 mb-2 text-sm bg-white border rounded-lg text-primary border-accent bottom-full group-hover:flex"
            >Please select a language</span>
          </div>
          }
          <input
            className={` w-full h-full outline-none rounded-lg p-2 bg-accent text-primary`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="w-40 h-full">
            {
            mediaRecorderRef && mediaRecorderRef.current && recording &&
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorderRef.current}
              width={100}
              height={30}
              backgroundColor="rgba(0,0,0,0)"
            />
            }
            
          </div>
          <div className="flex w-8 gap-2">
            {
            recording ?
            <button type="button" onClick={stopVoiceRecord}>
              <Icon className="text-red-600" path={mdiMicrophone} size={1} />
            </button>
            :
            <button type="button" onClick={startVoiceRecord}>
              <Icon className="text-primary" path={mdiMicrophone} size={1} />
            </button>
            }

            {audioData && <input hidden readOnly value={audioData} />}
          </div>
          
          <button
            className="flex items-center justify-center w-12 h-12"
            type="submit"
          >
            <Icon className="text-primary" path={mdiSendOutline} size={1} />
          </button>
          
        </div>
      </form>
    </div>
  );
}
