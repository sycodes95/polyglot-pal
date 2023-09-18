import { useEffect, useState } from "react";
import {
  LanguageOption,
  Message,
  VoiceData,
} from "../features/talkWithPolyglot/types";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import ISO6391 from "iso-639-1";
import TalkMessageInput from "../features/talkWithPolyglot/components/talkMessageInput/talkMessageInput";
import TalkMessages from "../features/talkWithPolyglot/components/talkMessages/talkMessages";
import TalkSetupOptions from "../features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions";
import { getSampleRateFromBase64 } from "../utils/getSampleRateFromBase64";
import { getGPTPrompt } from "../features/talkWithPolyglot/services/getGPTPrompt";
import { combineLangAndCountryCode } from "../utils/combineLangAndCountryCode";
import { formatGCTTSVoiceOptions } from "../utils/formatGCTTSVoiceOptions";




export default function TalkWithPolyGlot() {
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

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [messageIsLoading, setMessageIsLoading] = useState(false);

  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([]);
  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null);
  const [cefrLevel, setCefrLevel] = useState("C2");
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const [palVoiceAudioElement, setPalVoiceAudioElement] = useState<HTMLAudioElement | null>(null);
  const [userVoiceBase64, setUserVoiceBase64] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userVoiceError, setUserVoiceError] = useState(false)

  useEffect(() => {
    //creates a list from GC for language & voice select options and sets state for language options.

    async function getLangAndVoiceOptions () {
      const gcVoiceList = await getTTSVoiceOptionList()
      const formattedVoiceList = formatGCTTSVoiceOptions(gcVoiceList)
      setLanguageOptions(formattedVoiceList);
    }
    getLangAndVoiceOptions()
    
  }, []);

  useEffect(() => {

    console.log(selectedLanguageData);
    async function getFirstMessageFromPal () {

      //pause pal's previous voice audio if playing atm.
      if (palVoiceAudioElement) palVoiceAudioElement.pause()  

      //check if no messages has been sent or received and user has selected a language
      //then get first message from gpt using prompt and add to messages state

      if (messages.length < 1 && selectedLanguageData) { 

        setMessageIsLoading(true);

        const selectedLanguageName = selectedLanguageData.languageName;

        const selectedVoiceGender = selectedLanguageData.ssmlGender

        const prompt = getGPTPrompt(selectedLanguageName, cefrLevel, selectedVoiceGender)

        const palMsg = await getGPTMsg({ messages, input: prompt })

        setMessages([
          { role: "user", content: prompt },
          { role: "assistant", content: palMsg },
        ]);
        
        setMessageIsLoading(false);
      }
        
    }
    getFirstMessageFromPal ()
  
  }, [selectedLanguageData, cefrLevel]);

  useEffect(() => {
    //sends last user input message to TTS api, receives audio in base64 string format then plays the audio
    async function getTTSFromPalMessage () {

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
          if (palVoiceAudioElement) palVoiceAudioElement.pause();
          const palVoiceAudio = new Audio(ttsBase64);
          setPalVoiceAudioElement(palVoiceAudio);
        }
      }

    }
    getTTSFromPalMessage()
    
  }, [messages]);

  useEffect(()=> {
    if(palVoiceAudioElement) {
      ttsEnabled ? !palVoiceAudioElement.ended && palVoiceAudioElement.play() : palVoiceAudioElement.pause()
      
    }
  },[ttsEnabled])

  useEffect(() => {
    if (palVoiceAudioElement) palVoiceAudioElement.play();
  }, [palVoiceAudioElement]);

  useEffect(() => {

    async function getUserSTTAndSend () {
      if (userVoiceBase64 && selectedLanguageData) {
        setUserVoiceError(false)
        setMessageIsLoading(true);

        const selectedLanguageCode = combineLangAndCountryCode(selectedLanguageData?.languageCode, selectedLanguageData?.countryCode)

        const userSTT = await getSpeechToText({
          base64: userVoiceBase64,
          languageCode: selectedLanguageCode,
          sampleRate: 48000,
        })
        
        const transcript = userSTT?.results?.[0]?.alternatives?.[0]?.transcript;

        if(!userSTT || !transcript) return setUserVoiceError(true)

        setMessages([...messages, { role: "user", content: transcript }]);
        
        const palResponse = await getGPTMsg({ messages, input : transcript })

        setMessages((messages) => [
          ...messages,
          { role: "assistant", content: palResponse },
        ]);

        setMessageIsLoading(false);
        
      }

    }
    getUserSTTAndSend()
    
  }, [userVoiceBase64]);
  

  const handleMessageSend = async () => {
    //sends user message to open ai to get response from ai assistant.
    setMessageIsLoading(true);
    let userInput = input;
    if (messages.length < 1) userInput = prompt + input;
    
    setMessages([...messages, { role: "user", content: userInput }]);
    setInput("");
    const msg = await getGPTMsg({ messages, input });
    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: msg },
    ]);
    setMessageIsLoading(false);
    
  };

  return (
    <div className="relative flex flex-col flex-grow w-full gap-4 p-2 max-w-7xl ">
      <TalkSetupOptions
        className="flex flex-col gap-2 p-4 bg-white border-b shadow-md h-fit top-20 shadow-stone-300"
        selectedLanguageData={selectedLanguageData}
        setSelectedLanguageData={setSelectedLanguageData}
        languageOptions={languageOptions}
        cefrLevel={cefrLevel}
        setCefrLevel={setCefrLevel}
        setMessages={setMessages}
        ttsEnabled={ttsEnabled}

        setTtsEnabled={setTtsEnabled}
      />

      <TalkMessages 
      
      selectedLanguageData={selectedLanguageData}
      messages={messages}
      messageIsLoading={messageIsLoading} 
      palVoiceAudioElement={palVoiceAudioElement}
      ttsEnabled={ttsEnabled}
      setPalVoiceAudioElement={setPalVoiceAudioElement}
      />

      <TalkMessageInput
        messageIsLoading={messageIsLoading}
        input={input}
        setInput={setInput}
        handleMessageSend={handleMessageSend}
        setUserVoiceBase64={setUserVoiceBase64}
        ttsEnabled={ttsEnabled}
        selectedLanguageData={selectedLanguageData}
      />
    </div>
  );
}
