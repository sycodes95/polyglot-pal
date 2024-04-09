import { useParams } from "react-router-dom";
import { useQueryMessages } from "../api/message/getAllMessages";
import { useEffect, useState } from "react";
import { Message } from "../types/types";
import { useMutateMessage } from "../api/message/createMessage";

interface MessagesProps {
  isNewConversation: boolean;
  messagesState: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  }
};

export const Messages = ( {isNewConversation, messagesState}: MessagesProps) => {

  const { messages, setMessages} = messagesState;

  const { conversationId } = useParams();

  const [lastMsg, setLastMsg] = useState<Message | undefined>(undefined);

  const queryMessages = useQueryMessages(Number(conversationId));

  

  useEffect(() => {
    if(queryMessages.isSuccess && queryMessages.data) {
      const msgs = queryMessages.data;
      setMessages(msgs);
    };
  },[queryMessages.isSuccess]);

  useEffect(()=> {
    if(messages[messages.length - 1]){
      setLastMsg(messages[messages.length - 1]);
    }
  },[messages])

  // useEffect(() => {
  //   if(lastMsg && !lastMsg.id && !lastMsg.conversationId) {
  //     createMessage.mutateAsync();
  //   }
  // },[lastMsg])

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {
        messages && messages.length > 1 &&
        messages.map((message, index) => (
          index !== 0 &&
          <div key={index} 
          className={`p-4 w-full flex ${message.role === "user" ? 'justify-start' : 'justify-end'}`}>
            <span className={`text-white max-w-[200px] ${message.role === "user" ? "bg-accent" : "bg-background"}`}>{message.content}</span>
          </div>
        ))
      }
    </div>
  )
}