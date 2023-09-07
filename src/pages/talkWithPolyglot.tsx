import { useEffect, useState } from "react"
import { Message } from "../features/talkWithPolyglot/types"
import { getGPTMessageResponse } from "../features/talkWithPolyglot/services/getGPTMessageResponse"

export default function TalkWithPolyGlot () {
  const [input, setInput] = useState('yes, how about u?')
  const [messages, setMessages] = useState<Message[] | []>([])
  const [aiName, setAiName] = useState('Ivy')
  const [nativeLanguage, setNativeLanguage] = useState('English')
  const [learningLanguage, setLearningLanguage] = useState('Korean')
  const [cefrLevel, setCefrLevel] = useState('C2')

  useEffect(()=>{
    const prompt = `roleplay: you are my friend named ${aiName}, my first language is ${nativeLanguage} but i want to improve my ${learningLanguage}, you are fluent in both ${nativeLanguage} and ${learningLanguage}, talk to me in ${learningLanguage} with CEFR level of "${cefrLevel}". Start off by asking me how I'm doing in ${learningLanguage}. Whatever you do, do not break roleplay and don't speak in ${nativeLanguage} `

    
    getGPTMessageResponse(messages, prompt).then(assistantMessage => {
      setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: assistantMessage }]);
      setInput(''); 
    })
    
  },[])

  const handleMessageSend = () => {
    getGPTMessageResponse(messages, input).then(assistantMessage => {
      setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: assistantMessage }]);
      setInput(''); 
    })
  }

  useEffect(()=> {
    console.log(messages);
  },[messages])
  return (
    <div className="flex flex-col gap-2 flex-grow h-full"> 

    </div>
  )
}
