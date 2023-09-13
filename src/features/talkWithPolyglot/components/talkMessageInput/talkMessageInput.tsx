import { mdiSendOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { blobToBase64 } from '../../../../utils/getBase64FromBlob';
type TalkMessageInputProps = {
  messageIsLoading: boolean,
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  handleMessageSend: () => void,
  setUserVoiceBase64: React.Dispatch<React.SetStateAction<string>>,
}

export default function TalkMessageInput ({messageIsLoading, input, setInput, handleMessageSend, setUserVoiceBase64} : TalkMessageInputProps) {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingStopped = useRef(false);

  const startVoiceRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    let mimeType = 'audio/webm; codecs=opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.error('MIME type not supported');
        return;
      }
    }

    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: mimeType });
    
    const audioChunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = event => {
      if (event.data) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorderRef.current.ondataavailable = event => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }

      if (recordingStopped.current && mediaRecorderRef.current && mediaRecorderRef.current.state !== 'recording') {
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

  useEffect(()=> {
    console.log(audioData);
  },[audioData])

  useEffect(()=> {
    if(audioData) setUserVoiceBase64(audioData)

  },[audioData])



  return (
    <div className="sticky bottom-0 w-full h-24 max-w-5xl backdrop-blur-lg" >
      <form className="flex items-center w-full gap-2" onSubmit={(e)=> {
        e.preventDefault()
        handleMessageSend()
      }}>
        <div className="flex items-center w-full border-2 border-stone-700 rounded-2xl">
          <input className="w-full h-12 outline-none rounded-2xl" type="text" value={input} onChange={(e)=> setInput(e.target.value)}/>
          <div className='flex gap-2'>
              {
              recording ? 
              <button type="button" onClick={stopVoiceRecord}>Stop Recording</button>
              :
              <button type="button" onClick={startVoiceRecord}>Start Recording</button>
              }
              
            {audioData && <input hidden readOnly value={audioData} />}
          </div>
                
          <button className="flex items-center justify-center w-12 h-12" type="submit" >
            {
            messageIsLoading ? 
            <Oval
              height={25}
              width={25}
              color="#000000"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={4}
              strokeWidthSecondary={4}

            />
            :
            <Icon path={mdiSendOutline} size={1} />
            }
            
          </button>
        </div>
      </form>
    </div>
  )
}