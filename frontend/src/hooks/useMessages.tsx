import { useCallback, useEffect, useState } from "react";
import { LanguageData, Message } from "../features/chat/types/types";
import { useCreateMessage } from "../features/chat/api/message/createMessage";
import { useDeleteAllMsgs } from "../features/chat/api/message/deleteAllMessages";
import { useGPTResponse } from "../features/chat/api/openAI/createGPTResponse";

interface UseMessagesProps {
  conversationId: string | undefined;
  input: string;
  cIdRef: React.MutableRefObject<string | undefined>
}

export const useMessages = ( { conversationId, input, cIdRef }: UseMessagesProps ) => {

  const [messages, setMessages] = useState<Message[]>([]);

  const [lastMsg, setLastMsg] = useState<Message | undefined>(messages[messages.length - 1] ?? undefined);

  const deleteAllMsgs = useDeleteAllMsgs(Number(conversationId));

  const createMsg = useCreateMessage(lastMsg);

  const [gptResIsLoading, setGptResIsLoading] = useState(false);

  const createGptResponse = useGPTResponse(messages, input);

  const handleCreateGptResponse = async () => {
    setGptResIsLoading(true);
    const gptTranscript = await createGptResponse.mutateAsync();
    if(gptTranscript) {
      gptTranscript.conversationId = Number(conversationId);
      // check if user has quickly switched to different conversation while gptresponse was fetching or loading
      if(conversationId === cIdRef.current) {
        setMessages(prev => [...prev, gptTranscript]);
      };
    };
    setGptResIsLoading(false);
  };
  
  useEffect(() => {
    //set last msg
    if(messages.length > 0) {
      setLastMsg(messages[messages.length - 1]);
    }
  },[messages]);

  useEffect(()=> {
  },[gptResIsLoading])

  useEffect(()=> {

    // save messages if not saved already by checking for id.
    if(conversationId && lastMsg && lastMsg.conversationId && !lastMsg.id) {
      console.log(lastMsg.id)
      createMsg.mutateAsync();
    };

    console.log("last msg")

    if(conversationId && lastMsg && lastMsg.conversationId) {
      if(lastMsg.role === "user") {
        console.log("create gpt")
        handleCreateGptResponse();
      } else if(lastMsg.role === "assistant") {
        //do tts
      }
    } 
  },[lastMsg]);

  return {
    messages,
    setMessages,
    lastMsg,
    setLastMsg,
    deleteAllMsgs,
    gptResIsLoading
  };

};