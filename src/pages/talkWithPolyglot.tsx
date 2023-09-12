import { useEffect, useRef, useState } from "react"
import { Message, Voice } from "../features/talkWithPolyglot/types"
import Icon from '@mdi/react';
import { mdiSendOutline } from '@mdi/js';
import { Oval, ThreeDots } from "react-loader-spinner";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import CountryFlag from "../components/countryFlag/countryFlag";



export default function TalkWithPolyGlot () {

  const getGPTMsg = useAction(api.actions.getGPTMessageResponse.getGPTMessageResponseConvex)
  const getTextToSpeech = useAction(api.actions.getTextToSpeech.getTextToSpeech)
  const getVoicesList = useAction(api.actions.getTTSVoices.getTTSVoices)

  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[] | []>([])
  const [aiName, setAiName] = useState('Lexi')
  const [nativeLanguage, setNativeLanguage] = useState('Spanish')
  const [learningLanguage, setLearningLanguage] = useState('English')
  const [cefrLevel, setCefrLevel] = useState('C2')
  const [isLoading, setIsLoading] = useState(false)

  const [voicesList, setVoicesList] = useState<Voice | []>([])

  
  const messageContainerRef = useRef(null)

  useEffect(()=>{
    if(messages.length < 1) {
      console.log('test');
      const prompt = `You are my friend named ${aiName}. I'm learning ${learningLanguage}. You're fluent in ${learningLanguage}. Speak only in ${learningLanguage} at CEFR level ${cefrLevel} to help my conversation skills. Begin by directly asking how I'm doing in ${learningLanguage}. Stay in character, avoid using any other language besides ${learningLanguage} and engage with me in real-time. 
      `
      const input = prompt;
      getGPTMsg({messages, input}).then(assistantMessage => {
      setMessages(messages => [...messages, { role: 'user', content: prompt }, { role: 'assistant', content: assistantMessage }]);
      setIsLoading(false)
    });
    
    }
  },[])

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
      getTextToSpeech({ input: {text: messages[messages.length - 1].content}, voice: { languageCode: 'en-US', name: "en-US-Studio-O"}})
      .then(aud => {
        console.log('check', aud);
        if(aud) {
          const audio = new Audio(aud);
          audio.play();
        }
        
      })
    }
  },[messages])

  useEffect(()=> {
    getVoicesList().then(voices => {
      console.log(voices);
      setVoicesList(voices)
    })
  },[])

  useEffect(() => {
    console.log(voicesList);
  },[voicesList])
  
  return (
    <div className="relative flex flex-col flex-grow w-full h-full max-w-5xl gap-8 p-2"> 
      <div className="sticky h-24 p-2 border border-black top-20 rounded-2xl">
        <div>
          <label>Language</label>
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
                <CountryFlag className="object-contain w-12 h-12" countryCode={`US`} />
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
