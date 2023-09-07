import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('Hi, how are you?')
  const [msgs, setMsgs] = useState([])
  const [aiName, setAiName] = useState('Ivy')
  const [nativeLanguage, setNativeLanguage] = useState('English')
  const [learningLanguage, setLearningLanguage] = useState('Korean')


  

  useEffect(()=>{
    let prompt = `roleplay: you are my friend named ${aiName}, my first language is ${nativeLanguage} but i want to improve my ${learningLanguage}, you are fluent in both ${nativeLanguage} and ${learningLanguage}, talk to me in ${learningLanguage} and only speak ${nativeLanguage} when I ask for help, don't translation otherwise. Start off by asking me how I'm doing in ${learningLanguage} `

    const handleSend = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [...msgs, { role: 'user', content: `${prompt} ${input}`  }],
            model: "gpt-3.5-turbo",
            temperature: 1,
            max_tokens: 512,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          })
        });

        const data = await response.json();

        console.log(data);
        const assistantMessage = data.choices[0].message.content;
        setMsgs([...msgs, { role: 'user', content: input }, { role: 'assistant', content: assistantMessage }]);
        setInput('');

      } catch (error) {
        console.error("Error communicating with OpenAI:", error);
      }
    };
    handleSend()
  },[])

  useEffect(()=> {
    console.log(msgs);
  },[msgs])

  return (
    <>
      
    </>
  )
}

export default App
