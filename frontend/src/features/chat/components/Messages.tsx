import { useParams } from "react-router-dom";
import { useQueryMessages } from "../api/message/getAllMessages";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types/types";

interface MessagesProps {
  messagesState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  }
};

export const Messages = ( {messagesState}: MessagesProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages} = messagesState;

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth"})
    }
  },[messages])
  
  return (
    <div className="w-full max-w-5xl h-full flex flex-col gap-6 pb-12">
      {
        messages && messages.length > 1 &&
        messages.map((message, index) => (
          index !== 0 &&
          <div key={index} 
          className={`p-4 w-full flex ${message.role === "user" ? 'justify-start' : 'justify-end'}`}>
            <span className={`text-yellow-100 text-sm max-w-[300px] p-4 rounded-2xl ${message.role === "user" ? "bg-accent " : "bg-black/25"}`}>{message.content}</span>
          </div>
        ))
      }

      <div ref={scrollRef}/>

    </div>
  )
}