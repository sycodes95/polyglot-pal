import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([])

  useEffect(()=>{
    const handleSend = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [...msgs, { role: 'user', content: input }],
            model: "gpt-3.5-turbo",
            temperature: 1,
            max_tokens: 256,
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

  return (
    <>
      
    </>
  )
}

export default App
