import { useEffect, useRef, useState } from "react";
import {
  LanguageOption,
  Message,
  VoiceData,
} from "../features/talkWithPolyglot/types";
import { useAction, useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ISO6391 from "iso-639-1";
import TalkMessageInput from "../features/talkWithPolyglot/components/talkMessageInput/talkMessageInput";
import TalkMessages from "../features/talkWithPolyglot/components/talkMessages/talkMessages";
import TalkSetupOptions from "../features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions";
import { getSampleRateFromBase64 } from "../utils/getSampleRateFromBase64";
import { getGPTPrompt } from "../features/talkWithPolyglot/services/getGPTPrompt";
import { combineLangAndCountryCode } from "../utils/combineLangAndCountryCode";
import { formatGCTTSVoiceOptions } from "../utils/formatGCTTSVoiceOptions";
import { base64ToBlob } from "../utils/base64ToBlob";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { Id } from "convex/dist/cjs-types/values/value";

type Params = {
  c_id: Id<'conversation'>
}


export default function TalkWithPolyGlot() {
  const navigate = useNavigate()

  const { c_id } = useParams<Params>()

  const { user } = useAuth0();

  const { isLoading, isAuthenticated } = useConvexAuth()

  const getGPTMsg = useAction(
    api.actions.getGPTMessageResponse.getGPTMessageResponseConvex
  );
  const getTextToSpeech = useAction(
    api.actions.getTextToSpeech.getTextToSpeech
  );
  const getTTSVoiceOptionList = useAction(
    api.actions.getTTSVoices.getTTSVoices
  );
  const getSpeechToText = useAction(
    api.actions.getSpeechToText.getSpeechToText
  );

  const getConvoArgs : {
    id?: Id<'conversation'>,
    sub: string
  } = {
    sub: (user && user.sub) ? user.sub : ''
  }
  if(c_id) getConvoArgs.id = c_id
  
  const getConversation = useQuery(api.query.getConversation.getConversation, getConvoArgs)
 

  const mutateConversation = useMutation(api.mutation.mutateConversation.mutateConversation)

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [userMessageIsLoading, setUserMessageIsLoading] = useState(false)
  const [palMessageIsLoading, setPalMessageIsLoading] = useState(false);

  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([]);
  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null);
  const [cefrLevel, setCefrLevel] = useState("C2");
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const [userVoiceBase64, setUserVoiceBase64] = useState("");

  const [userVoiceError, setUserVoiceError] = useState(false)

  const [palVoiceBase64, setPalVoiceBase64] = useState("")

  const palVoiceElement = useRef<HTMLAudioElement | null>(null);

  useEffect(()=> {
    if(!c_id) {
      resetState()
      if(palVoiceElement && palVoiceElement.current) {
        palVoiceElement.current.pause()
        palVoiceElement.current = null
      }
    }
  },[c_id])
  
  useEffect(()=> {
    if(getConversation) {
      const convo = getConversation[0]
      setMessages(convo.messages)
      setSelectedLanguageData(convo.selectedLanguageData)
      setCefrLevel(convo.cefrLevel)
      setTtsEnabled(convo.ttsEnabled)
    }
  },[getConversation])
  
  useEffect(()=> {
    if(!isLoading && !isAuthenticated) navigate('/log-in')
  },[isAuthenticated, isLoading])


  useEffect(() => {
    //creates a list from GC for language & voice select options and sets state for language options.

    async function getLangAndVoiceOptions () {
      const gcVoiceList = await getTTSVoiceOptionList()
      console.log(gcVoiceList);

      const formattedVoiceList = formatGCTTSVoiceOptions(gcVoiceList)
      console.log(formattedVoiceList);
      setLanguageOptions(formattedVoiceList);
    }
    getLangAndVoiceOptions()
    
  }, []);

  useEffect(() => {
      if (palVoiceElement.current) {
        palVoiceElement.current.pause();
        // Release the resources held by the audio element
      }
    async function getFirstMessageFromPal () {

      //pause pal's previous voice audio if playing atm.

      //check if no messages has been sent or received and user has selected a language
      //then get first message from gpt using prompt and add to messages state

      if (messages.length < 1 && selectedLanguageData) { 

        setPalMessageIsLoading(true);

        const selectedLanguageName = selectedLanguageData.languageName;

        const selectedVoiceGender = selectedLanguageData.ssmlGender

        const prompt = getGPTPrompt(selectedLanguageName, cefrLevel, selectedVoiceGender)

        console.log(prompt);

        const palMsg = await getGPTMsg({ messages, input: prompt })

        setMessages([
          { role: "user", content: prompt },
          { role: "assistant", content: palMsg },
        ]);
        
        setPalMessageIsLoading(false);
      }
        
    }
    getFirstMessageFromPal ()
  
  }, [selectedLanguageData, cefrLevel]);

  useEffect(()=> {
    if(palVoiceBase64){
      if(palVoiceElement && palVoiceElement.current) palVoiceElement.current.pause()
      const palAudio = new Audio(palVoiceBase64)
      palVoiceElement.current = palAudio
      palVoiceElement.current.play()
    }
  },[palVoiceBase64])

  useEffect(() => {
    //sends last user input message to TTS api, receives audio in base64 string format then plays the audio

    async function getTTSFromPalMessage () {
      
      // if(palVoiceElement && palVoiceElement.current) {
      //   palVoiceElement.current.pause()
      //   palVoiceElement.current.remove()
      //   palVoiceElement.current.src = ''
      // }
      const lastMsg = messages[messages.length - 1]

      //check if messages exist, if last message was from pal (gpt), and user has TTS enabled
      //then get TTS from last msg from pal and play audio

      if (
        selectedLanguageData 
        && messages.length > 0 
        && lastMsg.role === "assistant"
        && ttsEnabled
      ) {

        setUserVoiceError(false)

        const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode)

        const selectedVoice = selectedLanguageData.voiceName

        const ttsBase64 = await getTextToSpeech({
          input: {
            text: lastMsg.content,
          },
          voice: {
            languageCode: selectedLanguageCode,
            name: selectedVoice,
          },
        });
        if(ttsBase64) {
          // const [_, base64WithoutContentType] = ttsBase64.split('data:audio/wav;base64,');
          // const blob = base64ToBlob(base64WithoutContentType);
          setPalVoiceBase64(ttsBase64)
          // const palVoiceAudio = new Audio(ttsBase64);
          // palVoiceElement.current = palVoiceAudio;
          // palVoiceElement.current.play()
        }
      }

    }
    getTTSFromPalMessage()

    // return () => {
    //   if (palVoiceElement) {
    //     palVoiceElement.pause();
    //     // Release the resources held by the audio element
    //     palVoiceElement.src = '';
    //     setPalVoiceAudioElement(null);
    //   }
    // };
    
  }, [messages]);

  useEffect(() => {

    async function getUserSTTAndSend () {
      if (userVoiceBase64 && selectedLanguageData) {
        setUserVoiceError(false)
        setUserMessageIsLoading(true);

        const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode)

        const userSTT = await getSpeechToText({
          base64: userVoiceBase64,
          languageCode: selectedLanguageCode,
          sampleRate: 48000,
        })
        
        const transcript = userSTT?.results?.[0]?.alternatives?.[0]?.transcript;

        if(!userSTT || !transcript) return setUserVoiceError(true)

        setMessages([...messages, { role: "user", content: transcript }]);

        setUserMessageIsLoading(false);

        setPalMessageIsLoading(true)
        
        const palResponse = await getGPTMsg({ messages, input : transcript })

        setMessages((messages) => [
          ...messages,
          { role: "assistant", content: palResponse },
        ]);

        setPalMessageIsLoading(false);
        
      }

    }
    getUserSTTAndSend()
    
  }, [userVoiceBase64]);
  

  const handleMessageSend = async () => {
    //sends user message to open ai to get response from ai assistant.
    setPalMessageIsLoading(true);
    let userInput = input;
    if (messages.length < 1) userInput = prompt + input;
    
    setMessages([...messages, { role: "user", content: userInput }]);
    setInput("");
    const msg = await getGPTMsg({ messages, input });
    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: msg },
    ]);
    setPalMessageIsLoading(false);
    
  };

  const resetState = () => {
    setInput("")
    setMessages([])
    setUserMessageIsLoading(false)
    setPalMessageIsLoading(false)
    setSelectedLanguageData(null)
    setCefrLevel("C2")
    setTtsEnabled(true)
    setUserVoiceBase64("")
    setUserVoiceError(false)
    setPalVoiceBase64("")
    if(palVoiceElement && palVoiceElement.current) {
      palVoiceElement.current.pause()
      palVoiceElement.current = null
    }
  }


  return (

    <div className="flex w-full max-w-7xl ">
      
      <Sidebar className="flex-col hidden md:flex" 
      resetState={resetState}/>
      
      <div className="relative flex flex-col flex-grow w-full gap-4 p-2 ">
        <TalkSetupOptions
          
          className="flex flex-col gap-2 pb-4 bg-white border-b shadow-md h-fit top-20 shadow-stone-300"
          c_id={c_id}
          selectedLanguageData={selectedLanguageData}
          setSelectedLanguageData={setSelectedLanguageData}
          languageOptions={languageOptions}
          cefrLevel={cefrLevel}
          setCefrLevel={setCefrLevel}
          setMessages={setMessages}
          ttsEnabled={ttsEnabled}
          setTtsEnabled={setTtsEnabled}
          messages={messages}
          palVoiceElement={palVoiceElement}
        />

        <TalkMessages 
          selectedLanguageData={selectedLanguageData}
          messages={messages}
          palMessageIsLoading={palMessageIsLoading} 
          ttsEnabled={ttsEnabled}
          userMessageIsLoading={userMessageIsLoading}
          palVoiceElement={palVoiceElement}
        />

        <TalkMessageInput
          palMessageIsLoading={palMessageIsLoading}
          input={input}
          setInput={setInput}
          handleMessageSend={handleMessageSend}
          setUserVoiceBase64={setUserVoiceBase64}
          ttsEnabled={ttsEnabled}
          selectedLanguageData={selectedLanguageData}
        />
      </div>
    </div>
  );
}
