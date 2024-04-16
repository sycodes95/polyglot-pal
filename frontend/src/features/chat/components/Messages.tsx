import { useParams } from "react-router-dom";
import { useQueryMessages } from "../api/message/getAllMessages";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types/types";

import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "@/components/themeProvider/theme-provider";

interface MessagesProps {
  gptResIsLoading: boolean;
  messagesState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  }
};

export const Messages = ({ gptResIsLoading, messagesState }: MessagesProps) => {

  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages} = messagesState;

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth"})
    }
  },[messages])

  useEffect(() => {
    console.log("wowowowo", gptResIsLoading)
  },[gptResIsLoading])
  
  return (
    <div className="h-full w-full grow flex flex-col rounded-md relative overflow-y-auto pb-4">
      <div className="h-full w-full flex justify-center absolute ">
        <div className="w-full max-w-5xl h-full flex flex-col gap-6">
          {
            messages && messages.length > 1 &&
            messages.map((message, index) => (
              index !== 0 &&
              <div key={index} 
              className={`p-4 w-full flex ${message.role === "user" ? 'justify-start'   : 'justify-end'}`}>
                <span className={`text-yellow-100 text-sm max-w-[300px] p-4   rounded-2xl ${message.role === "user" ? "bg-accent " : "bg-black/25"} `}>{message.content}</span>
              </div>
            ))
          }
          {
            gptResIsLoading &&
            <div 
            className={`p-4 w-full flex justify-end`}>
              <div className="w-fit p-2  bg-black/25 rounded-xl" >
              <ThreeDots
              height={20}
              width={30} 
              color={`${theme.theme === "dark" ? "white" : "black"}`} 
              />
              </div>
              
            </div>
          }
  
          <div ref={scrollRef}/>
        </div>
      </div>
    </div>
  )
}