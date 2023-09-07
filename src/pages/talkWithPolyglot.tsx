import { useEffect, useRef, useState } from "react"
import { Message } from "../features/talkWithPolyglot/types"
import { getGPTMessageResponse } from "../features/talkWithPolyglot/services/getGPTMessageResponse"
import Icon from '@mdi/react';
import { mdiSendOutline } from '@mdi/js';
import { Oval } from "react-loader-spinner";


export default function TalkWithPolyGlot () {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[] | []>([])
  const [aiName, setAiName] = useState('Brian')
  const [nativeLanguage, setNativeLanguage] = useState('Spanish')
  const [learningLanguage, setLearningLanguage] = useState('English')
  const [cefrLevel, setCefrLevel] = useState('C2')
  const [isLoading, setIsLoading] = useState(false)

  const messageContainerRef = useRef(null)

  useEffect(()=>{
    if(messages.length < 1) {
      console.log('test');
      const prompt = `Roleplay: You are my friend named ${aiName}. I speak ${nativeLanguage}, but I'm learning ${learningLanguage}. You're fluent in both. Speak only in ${learningLanguage} at CEFR level ${cefrLevel}. Begin by directly asking how I'm doing in ${learningLanguage}. Do not include your name in the response or use a colon. Stay in character, avoid using ${nativeLanguage} or any other language besides ${learningLanguage}, if I say I need help understanding something use ${nativeLanguage}, and engage with me in real-time.
      `
      getGPTMessageResponse(messages, prompt).then(assistantMessage => {
        setMessages(messages => [...messages, { role: 'user', content: prompt }, { role: 'assistant', content: assistantMessage }]);
      })
    }
  },[])

  const handleMessageSend = () => {
    let userInput = input
    if(messages.length < 1) userInput = prompt + input;
    setMessages([...messages, { role: 'user', content: userInput }])
    setInput(''); 
    getGPTMessageResponse(messages, input).then(assistantMessage => {
      setMessages(messages => [...messages, { role: 'assistant', content: assistantMessage }]);
      setIsLoading(false)
    })
  }

  useEffect(()=> {
    window.scrollTo(0, document.documentElement.scrollHeight);
  },[messages])

  
  return (
    <div className="relative flex flex-col flex-grow w-full h-full max-w-5xl gap-8"> 
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
              <div className="p-4 rounded-2xl bg-stone-300">
                {
                msg.role === 'user' 
                ?
                
                <span>You : </span>
                :
                <span>Pal : </span>
                }
                <span>{msg.content}</span>
              </div>
            </div>
            )
          }
        })
        }

      </div>
      <div className="sticky bottom-0 w-full h-24 max-w-5xl backdrop-blur-lg" >
        <form className="flex items-center w-full gap-2" onSubmit={(e)=> {
          e.preventDefault()
          handleMessageSend()
          setIsLoading(true)
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
