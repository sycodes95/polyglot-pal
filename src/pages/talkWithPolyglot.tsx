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
  const [messageIsLoading, setmessageIsLoading] = useState(false);

  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null);
  const [cefrLevel, setCefrLevel] = useState("C2");
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([]);
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const [aiVoiceAudio, setAiVoiceAudio] = useState<HTMLAudioElement | null>(null);
  const [userVoiceBase64, setUserVoiceBase64] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    // clears and restarts messages starting with prompt and ai starts conversation, when any of talk setup options changes.
    if (aiVoiceAudio) aiVoiceAudio.pause()
    if (messages.length < 1 && selectedLanguageData) {
      setmessageIsLoading(true);
      const selectedLanguage = selectedLanguageData.languageName;

      const prompt = `You are my friend named. I'm learning ${selectedLanguage}. You're fluent in ${selectedLanguage}. Speak only in ${selectedLanguage} at CEFR level ${cefrLevel} to help my conversation skills. Begin by directly asking how I'm doing in ${selectedLanguage}, it's important you act like my friend or acquaintance, not an assistant or tutor. Stay in character, avoid using any other language besides ${selectedLanguage} and engage with me in real-time. Make sure you have a personality and don't like an AI `;
      getGPTMsg({ messages, input: prompt }).then((assistantMessage) => {
        setMessages(() => [
          { role: "user", content: prompt },
          { role: "assistant", content: assistantMessage },
        ]);
        setmessageIsLoading(false);
      });
    }
  }, [selectedLanguageData, cefrLevel]);

  useEffect(() => {
    //sends last user input message to TTS api, receives audio in base64 string format then plays the audio

    if (
      messages.length > 0 
      && messages[messages.length - 1].role === "assistant"
      && ttsEnabled
    ) {
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
      ttsEnabled ? aiVoiceAudio.play() : aiVoiceAudio.pause()
    }
  },[ttsEnabled])

  useEffect(() => {
    if (aiVoiceAudio) aiVoiceAudio.play();
  }, [aiVoiceAudio]);

  useEffect(() => {
    if (userVoiceBase64 && selectedLanguageData) {
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
            setmessageIsLoading(false);
          });
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
    setmessageIsLoading(true);
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
      setmessageIsLoading(false);
    });
  };

  return (
    <div className="relative flex flex-col flex-grow w-full h-full max-w-5xl gap-8 p-2">
      <TalkSetupOptions
        className="sticky flex flex-col h-full gap-2 p-2 bg-white top-20 rounded-b-2xl"
        selectedLanguageData={selectedLanguageData}
        setSelectedLanguageData={setSelectedLanguageData}
        languageOptions={languageOptions}
        cefrLevel={cefrLevel}
        setCefrLevel={setCefrLevel}
        setMessages={setMessages}
        ttsEnabled={ttsEnabled}

        setTtsEnabled={setTtsEnabled}
      />

      <TalkMessages messages={messages} messageIsLoading={messageIsLoading} />

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
