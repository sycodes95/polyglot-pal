import { useParams } from "react-router-dom";
import { useQueryMessages } from "../api/message/getAllMessages";
import { useEffect, useRef, useState } from "react";
import { LanguageData, Message } from "../types/types";

import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "@/components/themeProvider/theme-provider";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { TtsData } from "../../../hooks/useConversation";
import TranslateIcon from '@mui/icons-material/Translate';
import ReplayIcon from '@mui/icons-material/Replay';
import { Separator } from "@/components/ui/separator";
import { getTranslation } from "../api/google/getTranslation";

interface MessagesProps {
  gptResIsLoading: boolean;
  messagesState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  };
  ttsData: TtsData;
  ttsIsPlaying: boolean;
  languageData: LanguageData;
};

export const Messages = ({ 
  gptResIsLoading, 
  messagesState, 
  ttsData, 
  ttsIsPlaying,
  languageData
}: MessagesProps) => {

  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages} = messagesState;

  const handleTextTranslation = async (message: Message) => {
    const requestData = {
      // targetLanguage : languageData.languageCode.split("-")[0], 
      targetLanguage: "en",
      text : message.content
    };

    const data = await getTranslation(requestData);

  };

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth"})
    }
  },[messages]);

  useEffect(() => {
    console.log(languageData);
  },[languageData]);
  
  return (
    <div className="h-full w-full grow flex flex-col rounded-md relative overflow-y-auto">
      <div className="h-full w-full flex justify-center absolute ">
        <div className="w-full max-w-5xl h-full flex flex-col gap-12 p-2 pt-8">
          {
            messages && messages.length > 1 &&
            messages.map((message, index) => (
              index !== 0 &&

              <div className={`${message.role === "user" ? 'justify-start'   : 'justify-end'} flex w-full`}>
                <div key={index} 
                className={` w-fit relative flex `}>
                  <span className={`text-yellow-100 text-sm max-w-[300px] p-4   rounded-2xl ${message.role === "user" ? "bg-accent " : "bg-black/25"} `}>{message.content}</span>
                  <div className={`${message.role === "assistant" ? "content" : "hidden"} absolute -bottom-8 left-0 rounded-xl h-8 text-xs flex items-center text-primary w-full justify-between `}>
                    <div className="h-full w-fit flex items-center">
                      <SupportAgentIcon className={`${ttsData.messageIndex === index && ttsIsPlaying ? "text-green-400" : "text-primary"}`} fontSize="small" />
                    </div>
                    <div className="h-full w-fit border border-border p-2 rounded-lg flex items-center gap-2">
                      <button onClick={()=> handleTextTranslation(message)}>
                        <TranslateIcon className="text-primary " fontSize="small"/>
                      </button>

                      <Separator orientation="vertical"/>

                      <ReplayIcon fontSize="small"/>
                    </div>
                  </div>

                </div>
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