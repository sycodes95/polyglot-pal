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

  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null);
  const [cefrLevel, setCefrLevel] = useState("C2");
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([]);
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const [aiVoiceAudio, setAiVoiceAudio] = useState<HTMLAudioElement | null>(null);
  const [userVoiceBase64, setUserVoiceBase64] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userVoiceError, setUserVoiceError] = useState(false)
  

  useEffect(() => {
    async function getFirstMessageFromPal () {

      //pause pal's previous voice audio if playing atm.
      if (aiVoiceAudio) aiVoiceAudio.pause()  

      //check if no messages has been sent or received and user has selected a language
      //then get first message from gpt using prompt and add to messages state

      if (messages.length < 1 && selectedLanguageData) { 

        setMessageIsLoading(true);

        const selectedLanguageName = selectedLanguageData.languageName;

        const prompt = getGPTPrompt(selectedLanguageName, cefrLevel)

        const palMessage = await getGPTMsg({ messages, input: prompt })

        setMessages([
          { role: "user", content: prompt },
          { role: "assistant", content: palMessage },
        ]);
        
        setMessageIsLoading(false);
      }
        
    }
    getFirstMessageFromPal ()
  
  }, [selectedLanguageData, cefrLevel]);

  useEffect(() => {
    //sends last user input message to TTS api, receives audio in base64 string format then plays the audio

    if (
      selectedLanguageData 
      && messages.length > 0 
      && messages[messages.length - 1].role === "assistant"
      && ttsEnabled
    ) {
      setUserVoiceError(false)
      getTextToSpeech({
        input: {
          text: messages[messages.length - 1].content,
        },
        voice: {
          languageCode: `${
            selectedLanguageData?.languageCode +
            "-" +
            selectedLanguageData?.countryCode
          }`,
          name: `${selectedLanguageData?.voiceName}`,
        },
      }).then((voiceBase64Audio) => {
        if (voiceBase64Audio) {
          const audio = new Audio(voiceBase64Audio);
          if (aiVoiceAudio) aiVoiceAudio.pause();
          setAiVoiceAudio(audio);
        }
      });
    }
  }, [messages, selectedLanguageData]);

  useEffect(()=> {
    if(aiVoiceAudio) {
      ttsEnabled ? !aiVoiceAudio.ended && aiVoiceAudio.play() : aiVoiceAudio.pause()
    }
  },[ttsEnabled])

  useEffect(() => {
    if (aiVoiceAudio) aiVoiceAudio.play();
  }, [aiVoiceAudio]);

  useEffect(() => {
    if (userVoiceBase64 && selectedLanguageData) {
      setUserVoiceError(false)
      setMessageIsLoading(true);
      getSampleRateFromBase64(userVoiceBase64);
      getSpeechToText({
        base64: userVoiceBase64,
        languageCode:
          selectedLanguageData?.languageCode +
          "-" +
          selectedLanguageData.countryCode,
        sampleRate: 48000,
      }).then((res) => {
        const transcript = res?.results?.[0]?.alternatives?.[0]?.transcript;
        
        if (transcript) {
          setMessages([...messages, { role: "user", content: transcript }]);
          const input = transcript;
          getGPTMsg({ messages, input }).then((assistantMessage) => {
            setMessages((messages) => [
              ...messages,
              { role: "assistant", content: assistantMessage },
            ]);
            setMessageIsLoading(false);
          });
        } else {
          setUserVoiceError(true)
        }
      });
    }
  }, [userVoiceBase64]);

  
  useEffect(() => {
    //creates a list for language & voice select options and sets state for language options.

    getTTSVoiceOptionList().then((voiceDataList) => {
      const langOptions = voiceDataList
        .map((voiceData: VoiceData) => {
          const [languageCode, countryCode] =
            voiceData.languageCodes[0].split("-");
          return {
            languageCode,
            countryCode,
            voiceName: voiceData.name,
            languageName: ISO6391.getName(languageCode),
            ssmlGender: voiceData.ssmlGender,
          };
        })
        .filter(
          (option: LanguageOption) =>
            option.languageCode.length < 3 &&
            !option.voiceName.includes("Standard")
        )
        .sort((a: LanguageOption, b: LanguageOption) => {
          if (a.languageName < b.languageName) {
            return -1;
          } else if (a.languageName > b.languageName) {
            return 1;
          }
          return 0;
        });
      setLanguageOptions(langOptions);
    });
  }, []);

  const handleMessageSend = () => {
    //sends user message to open ai to get response from ai assistant.
    setMessageIsLoading(true);
    let userInput = input;
    if (messages.length < 1) userInput = prompt + input;
    ``;
    setMessages([...messages, { role: "user", content: userInput }]);
    setInput("");
    getGPTMsg({ messages, input }).then((assistantMessage) => {
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: assistantMessage },
      ]);
      setMessageIsLoading(false);
    });
  };

  return (
    <div className="relative flex flex-col flex-grow w-full gap-4 p-2 max-w-7xl ">
      <TalkSetupOptions
        className="flex flex-col gap-2 bg-white h-fit top-20 rounded-b-2xl"
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
      messages={messages} messageIsLoading={messageIsLoading} />

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
