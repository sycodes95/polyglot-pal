import { useEffect, useRef, useState } from "react"
import { LanguageAndVoice, LanguageOption, LanguageOptions, Message, Voice, VoiceData } from "../features/talkWithPolyglot/types"
import Icon from '@mdi/react';
import { mdiSendOutline } from '@mdi/js';
import { Oval, ThreeDots } from "react-loader-spinner";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import CountryFlag from "../components/countryFlag/countryFlag";
import ISO6391 from 'iso-639-1';


export default function TalkWithPolyGlot () {

  const getGPTMsg = useAction(api.actions.getGPTMessageResponse.getGPTMessageResponseConvex)
  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech)
  const getTTSVoiceOptionList = useAction(api.actions.getTTSVoices.getTTSVoices)

  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[] | []>([])
  const [aiName, setAiName] = useState('Lexi')
  const [nativeLanguage, setNativeLanguage] = useState('')
  const [cefrLevel, setCefrLevel] = useState('C2')
  const [isLoading, setIsLoading] = useState(false)

  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([])
  const [selectedLanguageData, setSelectedLanguageData] = useState<LanguageOption | null>(null)


  
  const messageContainerRef = useRef(null)

  useEffect(()=>{
    if(messages.length < 1 && selectedLanguageData) {
      console.log('test');
      const selectedLanguage = selectedLanguageData.languageName
      const prompt = `You are my friend named ${aiName}. I'm learning ${selectedLanguage}. You're fluent in ${selectedLanguage}. Speak only in ${selectedLanguage} at CEFR level ${cefrLevel} to help my conversation skills. Begin by directly asking how I'm doing in ${selectedLanguage}. Stay in character, avoid using any other language besides ${selectedLanguage} and engage with me in real-time. 
      `
      const input = prompt;
      getGPTMsg({messages, input}).then(assistantMessage => {
      setMessages(messages => [...messages, { role: 'user', content: prompt }, { role: 'assistant', content: assistantMessage }]);
      setIsLoading(false)
    });
    
    }
  },[selectedLanguageData])

  const handleMessageSend = () => {
    setIsLoading(true)
    let userInput = input
    if(messages.length < 1) userInput = prompt + input; ``
    setMessages([...messages, { role: 'user', content: userInput }])
    setInput(''); 
    getGPTMsg({messages, input}).then(assistantMessage => {
      setMessages(messages => [...messages, { role: 'assistant', content: assistantMessage }]);
      setIsLoading(false)
    });
  }

  useEffect(()=> {
    
    if(messages.length > 0 && messages[messages.length - 1].role === 'assistant'){
      getTextToSpeech({ input: {text: messages[messages.length - 1].content}, voice: { languageCode: `${selectedLanguageData?.languageCode + '-' + selectedLanguageData?.countryCode}`, name: `${selectedLanguageData?.voiceName}`}})
      .then(aud => {
        console.log('check', aud);
        if(aud) {
          const audio = new Audio(aud);
          audio.play();
        }
        
      })
    }
  },[messages, selectedLanguageData])

  useEffect(()=> {
    getTTSVoiceOptionList().then(voiceDataList => {
      console.log(voiceDataList);
      const langOptions = voiceDataList.map((voiceData: VoiceData) => {
        const [ languageCode, countryCode ] = voiceData.languageCodes[0].split('-')
        return {
          languageCode,
          countryCode,
          voiceName: voiceData.name,
          languageName: ISO6391.getName(languageCode),
          ssmlGender: voiceData.ssmlGender
        }
      })
      .sort((a: LanguageOption, b: LanguageOption) => {
        if(a.languageName < b.languageName) {
          return -1
        } else if (a.languageName > b.languageName){
          return 1
        }
        return 0
      })
      
      setLanguageOptions(langOptions)
    })
  },[])



  useEffect(() => {
    console.log(selectedLanguageData);
  },[selectedLanguageData])
  
  return (
    <div className="relative flex flex-col flex-grow w-full h-full max-w-5xl gap-8 p-2"> 
      <div className="sticky h-24 p-2 top-20 rounded-2xl">
        <div className="flex gap-2">
          <label className="p-2 rounded-2xl bg-stone-300">Language & Voice</label>
          <select value={selectedLanguageData?.voiceName} onChange={(e)=> {
            const selectedVoiceName = e.target.value
            const selectedLanguageData = languageOptions.find(opt => opt.voiceName === selectedVoiceName)
            selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
            setMessages([])
          }}>
            {
            languageOptions.map((opt, index) => (
              <option value={opt.voiceName} key={index}>
                {opt.languageName} ({opt.countryCode}) {opt.voiceName} ({opt.ssmlGender})
              </option>
            ))
            }
          </select>
          {
          selectedLanguageData &&
          <CountryFlag className="object-contain w-10 h-10" countryCode={selectedLanguageData?.countryCode}/>
          }
        </div>

        <div className="flex gap-2">
          <label className="p-2"> CEFR Level</label>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 w-full gap-4 overflow-y-auto h-min" ref={messageContainerRef}>
        {
        messages.map((msg, index) => {
          if(index !== 0){
            return ( 
            <div className={`
            flex w-full
            ${msg.role === 'user' ? 'justify-start' : 'justify-end'}
            `}
            key={index}>
              <div className={`${msg.role === 'user' ? 'bg-stone-300' : 'bg-emerald-200'} p-4 rounded-2xl`}>
                {
                msg.role === 'user' 
                ?
                <span>You : </span>
                :
                <span>Pal : </span>
                }
                <span className="text-sm">{msg.content}</span>
              </div>
            </div>
            )
          }
        })
        }
        {
        isLoading &&
        <div className="flex justify-end w-full">
          <ThreeDots 
          height="40" 
          width="40" 
          radius="9"
          color="#000000" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
        </div>
        }
      </div>
      <div className="sticky bottom-0 w-full h-24 max-w-5xl backdrop-blur-lg" >
        <form className="flex items-center w-full gap-2" onSubmit={(e)=> {
          e.preventDefault()
          handleMessageSend()
          
        }}>
          <div className="flex items-center w-full border-2 border-stone-700 rounded-2xl">
            <input className="w-full h-12 outline-none rounded-2xl" type="text" value={input} onChange={(e)=> setInput(e.target.value)}/>
                  
            <button className="flex items-center justify-center w-12 h-12" type="submit" >
              {
              isLoading ? 
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
    </div>
  )
}
