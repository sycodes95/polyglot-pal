import { Message } from "../types";

export const getGPTMessageResponse = async ( 
  messages: Message[] | [],
  input: string, 
  ) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: `${input}`  }],
        model: "gpt-3.5-turbo",
        temperature: 1,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
    });

    const data = await response.json();

    const assistantMessage = data.choices[0].message.content;
    return assistantMessage
    

  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
  }
};