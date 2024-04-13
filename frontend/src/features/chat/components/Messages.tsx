import { useParams } from "react-router-dom";
import { useQueryMessages } from "../api/message/getAllMessages";
import { useEffect, useState } from "react";
import { Message } from "../types/types";

interface MessagesProps {
  messagesState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  }
};

export const Messages = ( {messagesState}: MessagesProps) => {

  const { messages, setMessages} = messagesState;
  
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {
        messages && messages.length > 1 &&
        messages.map((message, index) => (
          index !== 0 &&
          <div key={index} 
          className={`p-4 w-full flex ${message.role === "user" ? 'justify-start' : 'justify-end'}`}>
            <span className={`text-white text-sm min-w-[200px] p-4 rounded-md ${message.role === "user" ? "bg-accent " : "bg-black/25"}`}>{message.content}</span>
          </div>
        ))
      }
    </div>
  )
}