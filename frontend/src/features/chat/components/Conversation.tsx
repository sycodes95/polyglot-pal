import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConversationDto } from "../types/types";
import { useQueryConversation } from "../api/conversation/getConversationById";
import { useCreateConversation } from "../api/conversation/createConversation";
import { v4 as uuidv4 } from 'uuid';

const defaultConversationData = {
  id: uuidv4(),
  messages: [],
  languageData: null,
  settings: null,
};

export const Conversation = () => {
  const param = useParams();

  const [conversationData, setConversationData] = useState<ConversationDto>(defaultConversationData);
    
  

  const queryConversation = useQueryConversation(Number(param["conversationId"]));
  
  const createMutateConversation = useCreateConversation();

  useEffect(() => {
    if(queryConversation.isSuccess && queryConversation.data) {
      setConversationData(queryConversation.data);
    }
  },[queryConversation.isSuccess]);

  useEffect(() => {
    if(
      createMutateConversation.isSuccess &&
      !createMutateConversation.isLoading
    ) {
      setConversationData(createMutateConversation.data);
    }
  },[createMutateConversation.isSuccess]);
  
  return (
    <div className="border w-full h-full grow flex">
      {
        !queryConversation.isError && !queryConversation.isLoading && queryConversation.data &&
        <span>{queryConversation.data.id}</span>
      }
    </div>
  );
};